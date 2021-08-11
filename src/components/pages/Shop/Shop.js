import React, {useState, useEffect, useRef} from 'react';

import styles from './Shop.module.scss';
import {gsap} from 'gsap';

import Pagination from '../../UI/Pagination/Pagination';
import usePagination from '../../../hooks/usePagination';

import Filters from '../../Filters/Filters';

const Shop = () => {
    const [actualData, setActualData] = useState([]);
    const [chunks, setChunks] = useState([]);
    const [actualPage, setActualPage] = useState(1);
    const [perPage, setPerPage] = useState(2);
    const [pages, setPages] = useState(2);
    const [toggleFilters, setToggleFilters] = useState(false);

    const [actualFilters, setActualFilters] = useState();

    const [lastId, setLastId] = useState(0);

    const { amount, fetch, setCurrentPage, updateActualPage, filter} = usePagination();

    const products = useRef();

    useEffect(() => {
        amount('products', perPage).then(data => {
            setPages(data)
        });
    }, [amount, perPage])

    useEffect(() => {
        const fetchFunc =  async() => {
            await gsap.to([products.current], {
                opacity: 0,
                duration: 0.5,
                ease: 'Power0.easeNone'
            })
            setActualData([]);

            if(chunks[actualPage - 1]) {
                setActualData(chunks[actualPage - 1]);
    
                gsap.to([products.current], {
                    opacity: 1,
                    duration: 1.2,
                    ease: 'Power1.easeInOut'
        
                })
                return;
            }
    
            await fetch('products', actualPage, perPage).then(data => {
                setActualData(data);
                setChunks(oldChunks => [...oldChunks, data])
            });
    
            gsap.to([products.current], {
                opacity: 1,
                duration: 1.2,
                ease: 'Power1.easeInOut'
    
            })
        } 
        fetchFunc();
    }, [actualPage, perPage, setActualData])

    const setPage = (action) => {
        const actual = setCurrentPage(action, actualPage, pages);
        setActualPage(actual);
    }


    const updatePage = (action) => {
        const actual = updateActualPage(action, actualPage, pages);
        setActualPage(actual);
    }

    const applyFilters = (data) => {
        setActualData([]);
        setChunks([]);


        filter('products', data, perPage, lastId).then(data => {
            console.log('Filtered data:', data)
            setActualData(data.data);
            setChunks(oldChunks => [...oldChunks, data.data])
            setLastId(data.lastId)
        })
    }

    return (
        <div className={styles.Shop}>
                <h1 className={styles.Filters}>
                    <Filters open={toggleFilters} toggleFilters={() => setToggleFilters(!toggleFilters)} applyFilters={(data) => applyFilters(data)}/> 
                    {/* provide function that will clear chunks  */}
                </h1>

                <div className={styles.Right}>
                    <div className={styles.ProductsHolder} ref={products}>
                        {actualData.length === 0 && <div className={styles.Loader}></div>}
                        {actualData.length !== 0 && actualData.map(product => (
                            <section className={styles.Product} key={product.id}>
                            <div className={styles.First} style={{backgroundImage: `url(${product.imageUrl})`}}>
                            </div>
                            <div className={styles.Second}>
                                <h1>{product.title}</h1>
                                <span>{product.desc}</span>
                                <h5>{product.collection  + ' collection'}</h5>
                                <div className={styles.Bottom}>
                                    <h3>${product.price}</h3>
                                    <button>add to cart</button>
                                </div>
                            </div>
                        </section>
                        ))}
                    </div>
                    <div style={{paddingBottom: '5rem'}}>
                    {<Pagination actualPage={actualPage} pages={pages} updatePage={(e) => updatePage(e)} setPage={(action) => setPage(action)}/>}
                    </div>
            </div>
        </div>
    );
};

export default Shop;