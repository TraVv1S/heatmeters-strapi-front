import React from 'react';
import classes from'../styles/Preview.module.scss';
import A from "./A";

const Preview = ({product}) => {
    return (
        <div className={classes.product}>
                            <img
                                className={classes.thumb}
                                src={"http://142.132.182.231:1337"+product.attributes.cover.data.attributes.formats.thumbnail.url}
                            />
                            <A href={`/articles/${product.id}`} text={product.attributes.Title} />
                            <p>views: {product.attributes.views}</p>
                        </div>
    );
};

export default Preview;