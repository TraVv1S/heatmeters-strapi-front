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
                <div className={classes.main}>
                    <img
                        className={classes.img}
                        src={article.attributes.cover.data !== null ? process.env.UPLOADS_URL+article.attributes.cover.data.attributes.url : "/meter_placeholder.svg"}
                    ></img>
                    <div className={classes.specs}>
                        <div className={classes.field}>
                            <p className={classes.label}>Регистрационный номер типа СИ</p>
                            <p className={classes.value}>{article.attributes.ngr}</p>
                        </div>
                        <div className={classes.field}>
                            <p className={classes.label}>Наименование</p>
                            <h1 className={classes.value}>
                                {article.attributes.title +" "+ article.attributes.types.data.map(type => type.attributes.title).join(' ')}
                            </h1>
                        </div>
                        <div className={classes.field}>
                            <p className={classes.label}>Тип</p>
                            <p className={classes.value}>
                                {article.attributes.types.data.map(type => type.attributes.title).join(', ')}
                            </p>
                        </div>
                        <div className={classes.field}>
                            <p className={classes.label}>Изготовитель</p>
                            <p className={classes.value}>
                                {article.attributes.producer.data.attributes.title}
                            </p>
                        </div>
                        <div className={classes.field}>
                            <p className={classes.label}>Период действия</p>
                            <p className={classes.value}>
                                {article.attributes.validity_period}
                            </p>
                        </div>
                        <div className={classes.field}>
                            <p className={classes.label}>Методика поверки</p>
                            <p className={classes.value}>
                                {article.attributes.mp}
                            </p>
                        </div>

                        <p className={classes.label}>Межповерочный интервал</p>
                        <div className={classes.poverka}>
                            <p className={classes.hot}>Горячая - {article.attributes.mpi_h}</p>
                            <p className={classes.cold}>Холодная - {article.attributes.mpi_c}</p>
                        </div>
                    </div>
                </div>
            </Island>
            <Island>
                <h2>Файлы</h2>
                <table className={classes.files}>
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