import A from "./A";
import Head from "next/head";
import Navigation from "./Navigation";

const MainContainer = ({children, keywords}) => {
    return (
        <>
            <Head>
                <meta keywords={"ulbi tv, nextjs" + keywords}></meta>
                <title>Главная страница</title>
            </Head>
            <Navigation />
            <div style={{marginBottom:"2rem"}}>
                {children}
            </div>
           
        </>
    );
};

export default MainContainer;
