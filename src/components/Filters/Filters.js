import React, {useState, useRef} from 'react';

import styles from './Filters.module.scss';

import {gsap} from 'gsap';


const Filters = props => {
    const collections = ['coloren', 'classen', 'golden', 'wooden'];

    const [filtersTerm, setFiltersTerm] = useState({
        collections: ['coloren', 'classen', 'golden', 'wooden'],
        price: {
            from: null,
            to: null
        }
    });

    const [filtersAnimation] = useState(gsap.timeline({
        paused: true,
        onReverseComplete: () => {
            filtersAnimation.clear();
        }
    }))

    const options = useRef();
    const filters = useRef();

    if(props.open) {
        filtersAnimation.fromTo([options.current], {
            height: '0rem',
        }, {
            opacity: 1,
            height: '40rem',
        })
        filtersAnimation.play();
    } else {
        filtersAnimation.reverse();
    }

    const toggleCollection = (element) => {
        if(filtersTerm.collections.includes(element.target.id)) {
            const index = filtersTerm.collections.findIndex((p) => p === element.target.id);
            filtersTerm.collections.splice(index, 1);
            gsap.to([element.target], {
                color: '#243040',
                backgroundColor: 'transparent'
            })
        } else {
            filtersTerm.collections.push(element.target.id)
            gsap.to([element.target], {
                color: '#C1CBD9',
                backgroundColor: '#243040'
            })
        }
    }

    const addPrice = (e) => {
        filtersTerm.price[e.target.id] = e.target.value;
    }

    return (
        <div className={styles.Filters} ref={filters}>
            <h3 onClick={() => {!filtersAnimation.isActive() && props.toggleFilters()}}>{props.open ? '-filters' : '+filters'}</h3>
            <div className={styles.Options} ref={options}>
                    {props.open && <div>
                        <div className={styles.Elements}>
                                <h4>Collections</h4>
                                <div className={styles.Holder}>
                                    {collections.map(e => (
                                        <button key={e} id={e} onClick={(e) => toggleCollection(e)}>{e}</button>
                                    ))}
                                </div>
                        </div>
                        <div className={styles.Elements}>
                                <h4>Price</h4>
                                <div className={styles.Holder2}>
                                <div>
                                    <input type='number' placeholder='from' id='from' onChange={(e) => addPrice(e)}></input>
                                </div>
                                <span>-</span>
                                <div>
                                    <input type='number' placeholder='to' id='to' onChange={(e) => addPrice(e)}></input>
                                </div>
                            </div>
                        </div>
                        <div className={styles.ButtonHolder}>
                            <button className={styles.Button} onClick={() =>  props.applyFilters(filtersTerm)}>apply</button>
                        </div>
                    </div>}
            </div>
        </div>
    );
};

export default Filters;

{/* <div className={styles.Options} ref={filters}>
                    <div>
                        <div className={styles.Elements}>
                            <h4 onClick={() => setShowCollections(!showCollections)}>Collections</h4>
                            <div className={styles.Collections}>
                                {showCollections && <div className={styles.Holder}>
                                    <button>coloren</button>
                                    <button>classen</button>
                                    <button>golden</button>
                                    <button active>wooden</button>
                                </div>}
                            </div>
                        </div>
                        <div className={styles.Elements}>
                            <h4 onClick={() => setShowPrice(!showPrice)}>Price</h4>
                            {showPrice && <div className={styles.Holder2}>
                                <div>
                                    <input placeholder='from'></input>
                                </div>
                                <span>-</span>
                                <div>
                                    <input placeholder='to'></input>
                                </div>
                            </div>}
                        </div>    
                    </div>
                    <div className={styles.ButtonHolder}>
                        <button className={styles.Button} onClick={() =>  props.toggleFilters()}>apply</button>
                        <button className={styles.Button}>clear all</button>
                    </div>
                </div> */}