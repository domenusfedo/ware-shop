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

    useEffect(() => {
        setFiltersTerm(props.actualFilters)
    }, [props.open])

    return (
        <div className={styles.Filters} ref={filters}>
            <h3 onClick={() => {!filtersAnimation.isActive() && props.toggleFilters()}}>{props.open ? '-filters' : '+filters'}</h3>
            <div className={styles.Options} ref={options}>
                    {props.open && <div>
                        <div className={styles.Elements}>
                                <h4>Collections</h4>
                                <div className={styles.Holder}>
                                    {collections.map(e => (
                                        <button key={e} id={e} onClick={(e) => toggleCollection(e)} style={filtersTerm.collections.includes(e) ? {color: '#C1CBD9', backgroundColor: '#243040'} : {color: '#243040', backgroundColor: 'transparent'}}>{e}</button>
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
                            <button className={styles.Button} onClick={() => {props.applyFilters(filtersTerm); props.toggleFilters()}}>apply</button>
                        </div>
                    </div>}
            </div>
        </div>
    );
};

export default Filters;