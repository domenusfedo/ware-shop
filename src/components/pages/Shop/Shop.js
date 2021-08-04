import React from 'react';
import styles from './Shop.module.scss';

const Shop = () => {
    return (
        <div className={styles.Shop}>
            <h1 className={styles.Filters}>+filters</h1>

            <div className={styles.ProductsHolder}>
                <section className={styles.Product}>
                    <div className={styles.First}>
                        //photo
                    </div>
                    <div className={styles.Second}>
                        a
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Shop;