import React from 'react';
import styles from './Pagination.module.scss'

const Pagination = ({actualPage, pages, updatePage, setPage}) => {
    const sign1 = '>';
    const sign2 = '<';

    return (
        <div className={styles.Pagination}>
            <span style={actualPage === 1 ? {opacity: '0.5'} : {opacity: '1'}} onClick={() => updatePage('decrement')}>{sign2}</span>
            <span className={styles.pages}>
                <input value={actualPage} onChange={(e) => setPage(e)} onFocus={(e) => e.target.select()}></input> of {pages}
            </span>
            <span style={actualPage === pages ? {opacity: '0.5'} : {opacity: '1'}} onClick={() => updatePage('increment')}>{sign1}</span>
        </div>
    );
};

export default Pagination;