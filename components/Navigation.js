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
        
        <div className={classes.navbar}>
            <Link className={classes.logo} href="/">VDMER.RU</Link>
            {/* <div className={classes.wrapper}>
                {navlinks.map(({href, text}, i) => {
                    return (<Link key={i} href={href} className={pathname === href ? classes.navlink_active : classes.navlink}>
                                {text}
                            </Link>
                )})}
            </div> */}
        </div>
    );
};

export default Navigation;