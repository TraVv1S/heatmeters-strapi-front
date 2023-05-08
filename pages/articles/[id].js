import styles from '../../styles/article.module.scss'
import MainContainer from "../../components/MainContainer";
import { useEffect } from 'react';
import { fetcher } from '../../api/fetcher';
import Island from '../../components/UI/Island';

export default function Article({article}) {

    let views = article.attributes.views;
    useEffect(async () => {
        const response = await fetcher.put(
            `/articles/${article.id}`,
            {
                "data": {
                    "views": ++views
                }
            });
        console.log(response);
    }, [])
    return (
        <MainContainer keywords={article.name}>
            
            <Island>
                <h1 className={styles.title}>{article.attributes.Title} </h1>
                <p>Просмотров: {views}. ID:{article.id}</p>
                <div className={styles.main}>
                    <img className={styles.img} src={process.env.UPLOADS_URL+article.attributes.cover.data.attributes.url} ></img>
                    <div className={styles.specs}>
                        <table>
                            <tbody>
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
                            </tbody>
                        </table>
                    </div>
                </div>

                <h2 >Сводка </h2>
                <p>{article.attributes.Body}</p>
            </Island>
            <Island>
                <h2 >Файлы </h2>
                <table>
                    <tbody>
                        {article.attributes.docs.data
                            ? article.attributes.docs.data.map(doc => (
                                <tr key={doc.id}>
                                    <th>{doc.attributes.name}</th>
                                    <td>
                                        <button><a href={process.env.UPLOADS_URL+doc.attributes.url} target="_blank">Скачать</a></button>
                                    </td>
                                </tr>
                                ))
                            : null
                        }
                    </tbody>
                </table>
            </Island>
        </MainContainer>
    )
};

export async function getServerSideProps({params}) {
    const response = await fetcher(`/articles/${params.id}?populate=*`)
    const article = response.data.data
    return {
        props: {article},
    }
}

// export async function getStaticProps({params}) {
//     const response = await fetcher(`/articles/${params.id}?populate=*`)
//     const article = response.data.data
//     return {
//         props: {article},
//     }
// }

// export async function getStaticPaths() {
//     const response = await fetcher(`/articles/`)
//     const article = response.data.data
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