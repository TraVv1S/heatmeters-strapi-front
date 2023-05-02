import {useState, useEffect} from 'react'
import MainContainer from "../components/MainContainer";
import Preview from '../components/Preview';
import Island from '../components/UI/Island';
import styles from'../styles/articles.module.scss';

const Articles = ({articles}) => {
    const [filter, setFilter] = useState('1');

    return (
        <MainContainer keywords={"articles next js"}>
            <Island>
                <div className={styles.search}>
                    <input type="text" placeholder="Поиск" />
                    <button>Найти</button>
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

export const getStaticProps = async (context) => {
    const response = await fetch(`http://142.132.182.231:1337/api/articles?populate=*&sort=views%3Adesc`)
    const json = await response.json();
    const articles = json.data;

    return {
        props: {articles}, // will be passed to the page component as props
    }
}
