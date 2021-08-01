import React from 'react';

import styles from './Menu.module.scss';

const Menu = () => {
    return (
        <div className={styles.Menu}>
            <h3>shop section</h3>
            <h1>HOME</h1>
            <h1>SHOP</h1>
            <h1>ABOUT</h1>
            <h3>user section</h3>
            <h1>ACCOUNT</h1>
            <h1>CART</h1>
        </div>
    );
};

export default Menu;