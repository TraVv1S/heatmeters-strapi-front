import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import { fetcher } from '../api/fetcher';
import MainContainer from "../components/MainContainer";
import Preview from '../components/Preview';
import Island from '../components/UI/Island';
import classes from'../styles/articles.module.scss';

const Articles = ({articles}) => {
    const [search, setSearch] = useState('');
    const router = useRouter();
    const handleSearch = () => {
        router.replace({
            query: { ...router.query, search: encodeURI(search) },
         });
    }

    return (
        <MainContainer keywords={"articles next js"}>
            <Island>
                <div className={classes.search}>
                    <input value={search} onChange={e => setSearch(e.target.value)} type="search" name="searchbar" placeholder="Поиск" />
                    <button onClick={handleSearch}>Найти</button>
                </div>
            </Island>
            <Island>
                <h1 className={classes.title}>Счетчики</h1>
                <div className={classes.articles}>
                    {articles.map(article =>
                        <Preview key={article.id} product={article} />
                    )}
                </div>
            </Island>
        </MainContainer>
    );
};

export default Articles;

export const getServerSideProps = async (context) => {
    const filter = context.query.search ? `&filters[Title][$contains]=${context.query.search}` : '';
    const response = await fetcher(`/articles?populate=*${filter}&sort=views%3Adesc`)
    const articles = response.data.data;

    return {
        props: {articles},
    }
}
