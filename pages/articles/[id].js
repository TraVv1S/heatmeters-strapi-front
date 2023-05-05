import styles from '../../styles/article.module.scss'
import MainContainer from "../../components/MainContainer";
import { useEffect } from 'react';
import Island from '../../components/UI/Island';

export default function Article({article}) {

    let views = article.attributes.views;
    useEffect(async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "data": {
            "views": ++views
        }
        });

        const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`https://vdmer.ru/api/articles/${article.id}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }, [])
    return (
        <MainContainer keywords={article.name}>
            
            <Island>
                <h1 className={styles.title}>{article.attributes.Title} </h1>
                <p>Просмотров: {views}. ID:{article.id}</p>
                <div className={styles.main}>
                    <img className={styles.img} src={"https://vdmer.ru"+article.attributes.cover.data.attributes.url} ></img>
                    <div className={styles.specs}>
                        <table>
                            <tr>
                                <th>Номер в ГРСИ РФ:</th>
                                <td>{article.attributes.main_specs.grsi_number}</td>
                            </tr>
                            <tr>
                                <th>Производитель:</th>
                                <td>{article.attributes.producer.data.attributes.title}</td>
                            </tr>
                            <tr>
                                <th>Поставщик:</th>
                                <td>{article.attributes.main_specs.postavschik}</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <h2 >Сводка </h2>
                <p>{article.attributes.Body}</p>
            </Island>
            <Island>
                <h2 >Файлы </h2>
                <table>
                    {article.attributes.docs.data
                        ? article.attributes.docs.data.map(doc => (
                            <tr>
                                <th>{doc.attributes.name}</th>
                                <td>
                                    <button><a href={`https://vdmer.ru${doc.attributes.url}`} target="_blank">Скачать</a></button>
                                </td>
                            </tr>
                            ))
                        : null
                    }
                </table>
            </Island>
        </MainContainer>
    )
};

export async function getServerSideProps({params}) {
    const response = await fetch(`https://vdmer.ru/api/articles/${params.id}?populate=*`)
    const json = await response.json();
    const article = json.data
    return {
        props: {article},
    }
}

// export async function getStaticProps({params}) {
//     const response = await fetch(`http://142.132.182.231:1337/api/articles/${params.id}?populate=*`)
//     const json = await response.json();
//     const article = json.data
//     return {
//         props: {article},
//     }
// }

// export async function getStaticPaths() {
//     const response = await fetch(`http://142.132.182.231:1337/api/articles/`)
//     const json = await response.json();
//     const articles = json.data
//     const paths = articles.map(article => {
//             return {params: {
//                 id: `${article.id}` 
//             }}
//         })

//     return {
//         paths,
//         fallback:true
//     };
// }