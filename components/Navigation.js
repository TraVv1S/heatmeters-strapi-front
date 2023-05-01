import { useRouter } from "next/router";
import classes from "../styles/Navigation.module.scss"
import Link from "next/link";

const Navigation = () => {

    const { pathname } = useRouter();
    const navlinks = [
        {href: '/', text: 'Главная'},
        {href: '/articles', text: 'Счетчики'}
    ];

    return (
        
        <div className="navbar">
            <div className={classes.wrapper}>
                {navlinks.map(({href, text}, i) => {
                    return (<Link key={i} href={href}>
                                <a className={pathname === href ? classes.navlink_active : classes.navlink}>{text}</a>
                            </Link>
                )})}
            </div>
        </div>
    );
};

export default Navigation;