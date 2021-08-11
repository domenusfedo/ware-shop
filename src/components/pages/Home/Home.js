import React, {useState, useEffect, useRef} from 'react';

import styles from './Home.module.scss';
import {gsap} from 'gsap';

import usePagination from '../../../hooks/usePagination';

import Pagination from '../../UI/Pagination/Pagination';

const Home = () => {
    const [actualData, setActualData] = useState([]);
    const [actualPage, setActualPage] = useState(1);
    const [perPage] = useState(2);
    const [pages, setPages] = useState(0);
    const [chunks, setChunks] = useState([]);

    const { amount, fetch, setCurrentPage, updateActualPage} = usePagination();
    
    const [paginationAnimation] = useState(gsap.timeline({
        paused: true,
        onComplete: () => {
        },
        onReverseComplete: () => {
            paginationAnimation.clear();
        }
    }))

    const posts = useRef();
    const mainPhoto = useRef();

    useEffect(() => {
        amount('posts', perPage).then(data => {
            setPages(data)
        });
    }, [amount, perPage])

    useEffect(() => {
        const fetchFunc =  async() => {
            await gsap.to([posts.current], {
                opacity: 0,
                duration: 0.5,
                ease: 'Power0.easeNone'
            })
            setActualData([]);
    
            
            if(chunks[actualPage - 1]) {
                setActualData(chunks[actualPage - 1]);
    
                gsap.to([posts.current], {
                    opacity: 1,
                    duration: 1.2,
                    ease: 'Power1.easeInOut'
        
                })
                return;
            }
    
            await fetch('posts', actualPage, perPage).then(data => {
                setActualData(data);
                setChunks(oldChunks => [...oldChunks, data])
            });
    
            gsap.to([posts.current], {
                opacity: 1,
                duration: 1.2,
                ease: 'Power1.easeInOut'
    
            })
        }
        fetchFunc();
    }, [actualPage, perPage, setActualData]); //fires only on page changes

    const setPage = (action) => {
        const actual = setCurrentPage(action, actualPage, pages);
        setActualPage(actual);
    }


    const updatePage = (action) => {
        const actual = updateActualPage(action, actualPage, pages);
        setActualPage(actual);
    }

    const hidePopped = (post) => {
        if(post.target.innerText === 'less') {
            gsap.to([post.target.parentNode.parentNode], {
                height: '65%',
            });
            post.target.innerText = 'learn more...';
            post.target.parentNode.parentNode.children[1].style.overflowY = 'hidden';
            return
        }
    }

    const togglePostDetails = (post) => {
        if(post.target.innerText === 'less') {
            gsap.to([post.target.parentNode.parentNode], {
                height: '65%',
            });
            post.target.innerText = 'learn more...';
            post.target.parentNode.parentNode.children[1].style.overflowY = 'hidden';
            return
        }
        post.target.parentNode.parentNode.children[1].style.overflowY = 'scroll';
        post.target.innerText = 'less';
        gsap.to([post.target.parentNode.parentNode], {
            height: '94%',
        })
    }

    return (
        <div className={styles.Home}>
            <div className={styles.mainPhoto} ref={mainPhoto}>
                <div className={styles.Add}>
                    <h3>new collection</h3>
                    <h4>darkness</h4>
                </div>
            </div>

            <div className={styles.PostHolder}>
                <div className={styles.updatesTitle}>
                    <div></div>
                    <h1>
                    latest updates
                    </h1>
                    <div></div>
                </div>
                {actualData.length === 0 && <div className={styles.Loader}></div> }
                <div className={styles.Posts} ref={posts}>
                    {actualData.length !== 0
                    && actualData.map(post => (
                        <section className={styles.Post} key={post.id}>
                            <div className={styles.photo} style={{backgroundImage: `url(${post.photoUrl})`}} alt='loading...'>
                            <div className={styles.info} onBlur={(e) => hidePopped(e)}>
                                <h1>{post.title}</h1>
                                <span>{post.longDescription}</span>
                                <span style={{display: 'none'}}>{post.longDescription}</span>
                                <div className={styles.actions}>
                                    <button className={styles.CTA} onClick={(e) => togglePostDetails(e)}>learn more...</button>
                                    <button>visit shop</button>
                                </div>
                            </div>
                            </div>
                        </section>
                    ))
                    }
                </div>
                
                {<Pagination actualPage={actualPage} pages={pages} updatePage={(e) => updatePage(e)} setPage={(action) => setPage(action)}/>}
                
            </div>

            <div className={styles.PartnersHolder}>
                <ul>
                    <li>NOVA</li>
                    <li>MEPAL</li>
                    <li>BATUKARU</li>
                </ul>
            </div>
        </div>
    );
};

export default Home;