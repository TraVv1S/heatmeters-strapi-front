import React from 'react';
import classes from'../styles/Preview.module.scss';
import Link from 'next/link';
import Island from './UI/Island';


const Preview = ({product}) => {
    return (
        <Island>
            <Link href={`/articles/${product.id}`}>
                <div className={classes.product}>
                    <img
                        className={classes.thumb}
                        // src={process.env.UPLOADS_URL+product.attributes.cover?.data?.attributes?.formats?.thumbnail?.url}
                        src={product.attributes.cover.data !== null ? process.env.UPLOADS_URL+product.attributes.cover.data[0].attributes.formats.thumbnail.url : "/meter_placeholder.svg"}
                    />
                    <div className={classes.info}>
                        <p className={classes.type}>
                            {product.attributes.title}
                        </p>
                        <h3 className={classes.title}>
                            {product.attributes.types?.data?.map(type => type.attributes.title).join(' ')}
                            
                        </h3>
                        <p className={classes.producer}>{product.attributes.producer?.data?.attributes?.title}</p>
                        {/* <p>{product.attributes.types.data.attributes.title}</p> */}
                        <div className={classes.footer}>
                            <p>{product.attributes.ngr}</p>
                            <p>{product.attributes.validity_period}</p>
                        </div>
                        
                    </div>
                </div>
            </Link>
        </Island>
    );
};

export default Preview;