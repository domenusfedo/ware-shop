import React from 'react';

import styles from './Footer.module.scss';

import fbIcon from '../../assets/svg/facebook.svg'
import instagramIcon from '../../assets/svg/instagram.svg'

const Footer = () => {
    return (
        <div className={styles.Footer}>
            <div className={styles.First}>
                <span>want to be informed about new ideas, dont't you?</span>
                <span className={styles.CAT}>sign up for newsletter</span>
                <div className={styles.Newsletter}>
                    <input placeholder='example@example.com'></input>
                    <button>submit</button>
                </div>
            </div>
            <div className={styles.Second}>
                <span>Terms & conditions Privacy Policy</span>
                <span>Copyright &copy 2021 All right reserved</span>
                <span>@domenusfedo</span>
                <div>
                <div className={styles.Line}></div>
                <img src={fbIcon}></img>
                <img src={instagramIcon}></img>
                </div>
            </div>
        </div>
    );
};

export default Footer;