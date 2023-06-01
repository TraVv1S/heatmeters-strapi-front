import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import { fetcher } from '../api/fetcher';
import MainContainer from "../components/MainContainer";
import Preview from '../components/Preview';
import Island from '../components/UI/Island';
import classes from'../styles/articles.module.scss';

const Articles = ({articles, meta}) => {
    const [search, setSearch] = useState('');
    const router = useRouter();
    const handleSearch = (event) => {
        event.preventDefault();
        console.log(encodeURI(search))
        router.replace({
            query: { ...router.query, search: encodeURI(search), page: 1 },
         });
    }
    const handlePagination = (destinaionPage) => {
        router.replace({
            query: { ...router.query, page: destinaionPage },
         });
    }

    return (
        <MainContainer keywords={"articles next js"}>
            <Island>
            <div >
                    <form id="search" className={classes.search} onSubmit={handleSearch}>
                        <input value={search} onChange={e => setSearch(e.target.value)} type="search" name="searchbar" placeholder="Поиск" />
                        <button type="submit">Найти</button>
                    </form>
                </div>
            </Island>
                <div className={classes.articles}>
                    <h1 className={classes.title}>Счетчики:  {meta.pagination.total}</h1>
                    {articles.map(article =>
                        <Preview key={article.id} product={article} />
                    )}
                    
                </div>
                <div className={classes.pagination}>
                    <div className={classes.buttons}>
                        <button
                            onClick={() => handlePagination(meta.pagination.page - 1)}
                            disabled={meta.pagination.page === 1}
                        >
                            Предыдущая
                        </button>
                        <button
                            onClick={() => handlePagination(meta.pagination.page + 1)}
                            disabled={meta.pagination.page >= meta.pagination.pageCount}
                        >
                            Следующая
                        </button>
                    </div>
                    <p>Страница: {meta.pagination.page} из {meta.pagination.pageCount}</p>
                </div>
            
        </MainContainer>
    );
};

export default Articles;

export const getServerSideProps = async (context) => {
    const page = context.query.page ? context.query.page : 1;
    const filter = context.query.search ? `&filters[title][$containsi]=${context.query.search}` : '';
    const response = await fetcher(`/articles?populate=*${filter}&sort=views%3Adesc&pagination[page]=${page}`)
    const articles = response.data.data;
    const meta = response.data.meta

    return {
        props: {articles, meta},
    }
}
