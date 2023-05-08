import React from 'react';
import classes from'../styles/Preview.module.scss';
import A from "./A";

const Preview = ({product}) => {
    return (
        <div className={classes.product}>
                            <img
                                className={classes.thumb}
                                src={process.env.UPLOADS_URL+product.attributes.cover?.data?.attributes?.formats?.thumbnail?.url}
                            />
                            <div className={classes.info}>
                                <h3 className={classes.title}>
                                    <A href={`/articles/${product.id}`} text={product.attributes.title} />
                                </h3>
                                <p>views: {product.attributes.views}</p>
                            </div>
                        </div>
    );
};

export default Preview;