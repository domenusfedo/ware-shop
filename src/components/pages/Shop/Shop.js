import React, {useState, useEffect, useRef} from 'react';
import { useParams } from "react-router";

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

    const [actualFilters, setActualFilters] = useState({
        collections: ['coloren', 'golden', 'classen', 'wooden'],
        price: {
            from: null,
            to: null
        },
        sorting: 'asc'
    });

    const [shouldUpdate, setShouldUpdate] = useState(false);

    const [lastId, setLastId] = useState(0);

    const { setCurrentPage, updateActualPage, filter} = usePagination();

    const products = useRef();
    const filters = useRef();

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

        await filter('products', actualFilters, perPage, lastId, actualPage).then(data => {
            setActualData(data.data);
            setChunks(oldChunks => [...oldChunks, data.data])
            setLastId(data.lastId)
            setPages(data.pages)
        })

        gsap.to([products.current], {
            opacity: 1,
            duration: 1.2,
            ease: 'Power1.easeInOut'
        })
    } 

    useEffect(() => {
        fetchFunc();
    }, [shouldUpdate, actualPage])

    const {coll} = useParams();

    useEffect(() => {
        console.log(coll)
        if(coll) {
            setActualFilters({
                collections: [coll],
                price: {
                    from: null,
                    to: null
                },
                sorting: 'asc'
            })
        }
        setShouldUpdate(!shouldUpdate)
    }, [])

    const setPage = async (e) => {
        const old = actualPage;
        const actual = await setCurrentPage(e, pages);
        if(old !== actual) {
            setActualPage(actual);
            setShouldUpdate(!shouldUpdate)
        }
    }

    const updatePage = async (action) => {
        const old = actualPage;
        const actual = await updateActualPage(action, actualPage, pages);
        if(old !== actual) {
            setActualPage(actual);
            setShouldUpdate(!shouldUpdate)
        }
    }

    const clearFunc = (data) => {
        setActualFilters(data)
        setActualData([]);
        setChunks([]);
        setLastId(0)
        setActualPage(1)
    }

    const applyFilters = (data) => {
        clearFunc(data);
        setShouldUpdate(!shouldUpdate);
    }

    return (
        <div className={styles.Shop}>
                <h1 className={styles.Filters} ref={filters}>
                    <Filters open={toggleFilters} actualFilters={actualFilters} toggleFilters={() => setToggleFilters(!toggleFilters)} applyFilters={(data) => applyFilters(data)}/> 
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
                    {<Pagination actualPage={actualPage} pages={pages} updatePage={(e) => updatePage(e)} setPage={(e) => setPage(e)}/>}
                    </div>
            </div>
        </div>
    );
};

export default Shop;