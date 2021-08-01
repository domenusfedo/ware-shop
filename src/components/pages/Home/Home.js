import React, {useState, useEffect} from 'react';

import styles from './Home.module.scss';

import {db} from '../../../firebase';

const Home = () => {
    const [actualData, setActualData] = useState([]);
    const [actualPage, setActualPage] = useState(1);
    const [perPage, setPerPage] = useState(2);
    const [pages, setPages] = useState(0);

    useEffect(() => {
        db.collection("posts").get().then(
            (snapshot) => {
                const pages = snapshot.docs.length / perPage;
                setPages(pages)
            }
          );
    }, []) //only on the forst visit

    useEffect(() => {
        //optimize this
        const lastPost = actualPage * perPage;
        db.collection("posts")
        .orderBy("id", "asc")
        .startAt(lastPost - 1)
        .limit(perPage)
        .get()
        .then(data => {
            const posts = data.docs.map(doc => doc.data());
            setActualData(posts);
        })
    }, [actualPage]); //fires only on page changes

    const setPage = (value) => {
        setActualPage(+value)
        if(window.innerWidth < 715) {
            window.scrollTo({
                top: 200,
                behavior: 'smooth'
            })
        }
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
        if(window.innerWidth < 715) {
            window.scrollTo({
                top: 200,
                behavior: 'smooth'
            })
        }
    }

    const togglePostDetails = (post) => {
        console.log(post);
    }

    return (
        <div className={styles.Home}>
            <div className={styles.mainPhoto}>
                <div className={styles.Add}>
                    <h3>new collection</h3>
                    <h4>darkness</h4>
                </div>
            </div>

            <div className={styles.PostHolder}>
                <h1 className={styles.updatesTitle}>latest updates</h1>
                <div className={styles.Posts}>
                    {actualData.length === 0
                    ? <div className={styles.Loader}></div> 
                    : actualData.map(post => (
                        <section className={styles.Post} key={post.id}>
                            <div className={styles.photo} style={{backgroundImage: `url(${post.photoUrl})`}}>
                            <div className={styles.info}>
                                <h1>{post.title}</h1>
                                <span>{post.shortDescription}</span>
                                <div className={styles.actions}>
                                    <button className={styles.CTA} onClick={() => togglePostDetails(post.id)}>learn more...</button>
                                    <button>visit shop</button>
                                </div>
                            </div>
                            </div>
                        </section>
                    ))
                    }
                </div>
                <div className={styles.Pagination}>
                    <span style={actualPage === 1 ? {opacity: '0.5'} : {opacity: '1'}} onClick={() => updatePage('decrement')}>prev</span>
                    <span>
                        <input value={actualPage} onChange={(e) => setPage(+e.target.value)}></input> of {pages}
                    </span>
                    <span style={actualPage === pages ? {opacity: '0.5'} : {opacity: '1'}} onClick={() => updatePage('increment')}>next</span>
                </div>
            </div>

        </div>
    );
};

export default Home;