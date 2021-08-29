import React, {useState, useRef, useEffect} from 'react';

import styles from './Filters.module.scss';

import {gsap} from 'gsap';


const Filters = props => {
    const collections = ['coloren', 'golden', 'classen', 'wooden'];

    const [filtersTerm, setFiltersTerm] = useState({
        collections: ['coloren', 'golden', 'classen', 'wooden'],
        price: {
            from: null,
            to: null
        },
        sorting: 'asc'
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
            height: '0',
        }, {
            opacity: 1,
            height: '50rem',
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
        console.log(e.target.value)
        filtersTerm.price[e.target.id] = e.target.value;
    }

    const sorting = (e) => {
        if(e.target.innerText === 'A-Z') {
            e.target.id = 'desc';
            e.target.innerText = 'Z-A';
            filtersTerm.sorting = e.target.id;
        } else {
            e.target.innerText = 'A-Z';
            e.target.id = 'asc';
            filtersTerm.sorting = e.target.id;
        }
    }

    useEffect(() => {
        setFiltersTerm(props.actualFilters)
    }, [props.open, props.actualFilters])

    return (
        <div className={styles.Filters} ref={filters}>
            <h3 onClick={() => {!filtersAnimation.isActive() && props.toggleFilters()}}>{props.open ? '-filters' : '+filters'}</h3>
            <div className={styles.Options} ref={options}>
                    {props.open && <div>
                        <div className={styles.Elements}>
                                <h5>Collections</h5>
                                <div className={styles.Holder}>
                                    {collections.map(e => (
                                        <button key={e} id={e} onClick={(e) => toggleCollection(e)} style={filtersTerm.collections.includes(e) ? {color: '#C1CBD9', backgroundColor: '#243040'} : {color: '#243040', backgroundColor: 'transparent'}}>{e}</button>
                                    ))}
                                </div>
                        </div>
                        <div className={styles.Elements}>
                                <h5>Price</h5>
                                <div className={styles.Holder2}>
                                <div>
                                    <input type='number' placeholder='from'  id='from' onChange={(e) => addPrice(e)}></input>
                                </div>
                                <span>-</span>
                                <div>
                                    <input type='number' placeholder='to'  id='to' onChange={(e) => addPrice(e)}></input>
                                </div>
                            </div>
                        </div>
                        <div className={styles.Elements}>
                            <h5>Sorting</h5>
                            <span id='asc' onClick={(e) => sorting(e)}>A-Z</span>
                        </div>
                        <div className={styles.ButtonHolder}>
                            <button className={styles.Button} onClick={() => {props.applyFilters(filtersTerm); props.toggleFilters()}}>apply</button>
                            <button className={styles.Button} onClick={() => {
                                props.applyFilters({
                                    collections: ['coloren', 'golden', 'classen', 'wooden'],
                                    price: {
                                        from: null,
                                        to: null
                                    },
                                    sorting: 'asc'
                                }); props.toggleFilters()}}>clear all</button>
                        </div>
                    </div>}
            </div>
        </div>
    );
};

export default Filters;