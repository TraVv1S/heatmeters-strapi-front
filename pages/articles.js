import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import MainContainer from "../components/MainContainer";
import Preview from '../components/Preview';
import Island from '../components/UI/Island';
import styles from'../styles/articles.module.scss';

const Articles = ({articles}) => {
    const [search, setSearch] = useState('');
    const router = useRouter();
    const handleSearch = () => {
        console.log(encodeURI(search))
        router.replace({
            query: { ...router.query, search: encodeURI(search) },
         });
    }

    return (
        <MainContainer keywords={"articles next js"}>
            <Island>
                <div className={styles.search}>
                    <input value={search} onChange={e => setSearch(e.target.value)} type="search" name="searchbar" placeholder="Поиск" />
                    <button onClick={handleSearch}>Найти</button>
                </div>
            </Island>
            <Island>
                <h1 className={styles.title}>Счетчики</h1>
                <div className={styles.articles}>
                    {articles.map(article =>
                        
                            <Preview key={article.id} product={article} />
                        
                            // <span>{article.id}</span>
                    )}
                </div>
            </Island>
        </MainContainer>
    );
};

export default Articles;

export const getServerSideProps = async (context) => {
    const filter = context.query.search ? `&filters[Title][$contains]=${context.query.search}` : '';
    console.log(filter);
    const response = await fetch(`http://142.132.182.231:1337/api/articles?populate=*${filter}&sort=views%3Adesc`)
    const json = await response.json();
    const articles = json.data;

    return {
        props: {articles}, // will be passed to the page component as props
    }
}
