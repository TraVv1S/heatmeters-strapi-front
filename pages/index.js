import Link from "next/link";
import A from "../components/A";
import Head from "next/head";
import MainContainer from "../components/MainContainer";
import Island from "../components/UI/Island";

const Index = () => {
    return (
            <MainContainer keywords={"main page"}>
                <Island>
                    <h1>Главная страница</h1>
                </Island>
            </MainContainer>
    );
};

export default Index;
