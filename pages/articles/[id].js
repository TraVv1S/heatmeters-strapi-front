import classes from '../../styles/article.module.scss'
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
                <h1 className={classes.title}>{article.attributes.title} </h1>
                <div className={classes.main}>
                    <img className={classes.img} src={process.env.UPLOADS_URL+article.attributes.cover?.data?.attributes?.url} ></img>
                    <div className={classes.specs}>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Номер в ГРСИ РФ:</th>
                                    <td>{article.attributes.ngr}</td>
                                </tr>
                                <tr>
                                    <th>Производитель:</th>
                                    <td>{article.attributes.producer.data.attributes.title}</td>
                                </tr>
                                <tr>
                                    <th>mp:</th>
                                    <td>{article.attributes.mp}</td>
                                </tr>
                                <tr>
                                    <th>Межповерочный интервал:</th>
                                    <td>{article.attributes.validity_period}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <h2 >Сводка </h2>
                <p>{article.attributes.description}</p>
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
            <div className={classes.footer}>
                    <p>Просмотров: {views}. ID:{article.id}</p>
                </div>
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