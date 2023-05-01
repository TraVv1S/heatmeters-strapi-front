import classes from "./Island.module.scss"

const Island = ({children}) => {
    return (
        <div className={classes.island}>
            {children}
        </div>
    );
};

export default Island;
