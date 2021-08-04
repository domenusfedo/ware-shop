import React, {useState, useEffect} from 'react';

import styles from './Home.module.scss';

import {db} from '../../../firebase';

import {gsap} from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger'

import { useRef } from 'react';

const Home = () => {
    const [actualData, setActualData] = useState([]);
    const [actualPage, setActualPage] = useState(1);
    const [perPage, setPerPage] = useState(2);
    const [pages, setPages] = useState(0);
    const [chunks, setChunks] = useState([]);
    
    gsap.registerPlugin(ScrollTrigger);
    
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

    const sign1 = '>';
    const sign2 = '<';

    useEffect(() => {
        db.collection("posts").get().then(
            (snapshot) => {
                const pages = snapshot.docs.length / perPage;
                setPages(pages)
            }
          );
    }, [])

    useEffect(async () => {
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

        const lastPost = actualPage * perPage;
        await db.collection("posts")
        .orderBy("id", "asc")
        .startAt(lastPost - 1)
        .limit(perPage)
        .get()
        .then(data => {
            const posts = data.docs.map(doc => doc.data());
            setActualData(posts);
            setChunks(oldChunks => [...oldChunks, posts])
        })

        gsap.to([posts.current], {
            opacity: 1,
            duration: 1.2,
            ease: 'Power1.easeInOut'

        })
    }, [actualPage, perPage]); //fires only on page changes

    // ScrollTrigger.create({
    //     trigger: mainPhoto,
    //     start: 'top bottom',
    //     markers: true,
    // })


    const setPage = (element) => {
        const val = +element.target.value;
        if(val > pages) {
            setActualPage(pages);
            return;
        }
        if(val < 1) {
            setActualPage(1);
            return;
        }
        // setActualData([]);
        setActualPage(val)
        if(window.innerWidth <= 724) {
            window.scrollTo({
                top: 200,
                behavior: 'smooth'
            })
        }
    }

    const selectAll = (e) => {
        e.target.select();
    }

    const updatePage = (action) => {
        let actual = actualPage;
        
        switch(action) {
            case 'increment': actual += 1;
            break;
            case 'decrement': actual -= 1;
            break;
            default: return false
        }

        if(actual > pages || actual < 1) {
            return;
        }

        setActualPage(actual);
        // setActualData([]);
        if(window.innerWidth < 715) {
            window.scrollTo({
                top: 200,
                behavior: 'smooth'
            })
        }
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
                <div className={styles.Pagination}>
                    <span style={actualPage === 1 ? {opacity: '0.5'} : {opacity: '1'}} onClick={() => updatePage('decrement')}>{sign2}</span>
                    <span className={styles.pages}>
                        <input value={actualPage} onChange={(e) => setPage(e)} onFocus={(e) => selectAll(e)}></input> of {pages}
                    </span>
                    <span style={actualPage === pages ? {opacity: '0.5'} : {opacity: '1'}} onClick={() => updatePage('increment')}>{sign1}</span>
                </div>
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