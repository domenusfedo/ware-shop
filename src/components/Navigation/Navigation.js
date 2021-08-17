import React, {useState, useRef, useEffect} from 'react';
import {connect} from 'react-redux';

import { NavLink, useLocation } from 'react-router-dom';

import styles from './Navigation.module.scss';
import {gsap} from 'gsap';

const Navigation = props => {
    const [toggleMenu, setToggleMenu] = useState(false);
    // const [location, setLocation] = useState(useLocation());

    const [menuAnimation] = useState(gsap.timeline({
        paused: true,
        onReverseComplete: () => {
            menuAnimation.clear();
        }
    }))

    const nav = useRef();
    
    const logoSVG = useRef();
    const menuSVG = useRef();
    
    const accSVG = useRef();
    const cartSVG = useRef();
    const cart2SVG = useRef();
    const searchSVG = useRef();
    
    const home = useRef();
    const shop = useRef();
    const about = useRef();

    const usersOpt = useRef();

    const rest = [home, shop, about];
    useLocation()

    useEffect(() => {
        let actual = null;
        let color = null;

        const x = window.location.hash.split("/", 2).join("/");

        switch (x) {
            case '#/': {
                actual = home;
                color= '#65768C';
            }
            break;
            case '#/shop': {
                actual = shop;
                color= '#243040';
            }
            break;
            case '#/about': {
                actual = about;
                color= '#65768C';
            }
            break;
            case '#/login': {
                actual = about;
                color= '#243040';
            }
            break;
            case '#/acc': {
                color= '#243040';
            }
            break;
            default: return
        }

        if(toggleMenu) {
            color= '#65768C';
        }

        const elements = []
        rest.map(el => {
            if(el.current.hash !== x) {
                elements.push(el)
            }
            return 1;
        });

        gsap.to([nav.current.children[0].children[0].children[1], logoSVG.current, menuSVG.current, searchSVG.current, cartSVG.current, cart2SVG.current, accSVG.current], {
            color: color,
            fill: color
        }) 

        actual ? gsap.to([elements[0].current, elements[1].current], {
            opacity: 0.5,
            color: color
        }) : gsap.to([elements[0].current, elements[1].current, elements[2].current], {
            opacity: 0.5,
            color: color
        })

        actual && gsap.fromTo([actual.current], {
            opacity: 0.2
        }, {
            opacity: 1,
            color: color
        })
    })

    const menuHandler = async () => {
        if(window.innerWidth > 720) {
            return
        }
        await setToggleMenu(!toggleMenu);

        if(!toggleMenu) {
            menuAnimation.fromTo([nav.current],{
                height: '5rem',
            },{
                height: '100%',
                duration: 0.1
            })
            
            menuAnimation.fromTo([nav.current],{
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                duration: 1
            },{
                backgroundColor: 'rgba(36,48,64, 0.99)'
            }, '<')

            menuAnimation.fromTo([nav.current.children[1]],{
                display: 'none',
                opacity: 0,
            },{
                opacity: 1,
                display: 'flex',
            }, '<0.1')

            menuAnimation.fromTo([usersOpt.current], {
                opacity: 0,
                display: 'none'
            },{
                opacity: 1,
                display: 'flex'
            }, '<')

            menuAnimation.play()
        } else {
            menuAnimation.reverse()
        }
    }

    return (
        <div className={styles.MainToolbar} ref={nav}>
            <div className={styles.NavHolder}>
                <div className={styles.logo}>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ isolation: "isolate" }}
                width="25px"
                height="25px"
                viewBox="90.021 142.483 319.957 215.034"
                >
                <path
                    fill="#9BABBF"
                    ref={logoSVG}
                    fillRule="evenodd"
                    d="M112.188 279a159.11 159.11 0 0014.838 21H182c4.415 0 8 3.585 8 8v4c0 4.415-3.585 8-8 8h-35.053c50.104 42.216 119.821 48.69 175.91 20H268c-4.415 0-8-3.585-8-8v-4c0-4.415 3.585-8 8-8h84.938a161.622 161.622 0 0017.336-17H246.319c-5.143 0-9.319-4.176-9.319-9.319v-1.362c0-5.143 4.176-9.319 9.319-9.319h138.919c16.559-26.179 24.754-56.081 24.638-85.934.08-.768.113-1.538.1-2.312-.53-30.35-72.643-53.74-160.936-52.199-88.293 1.541-159.545 27.434-159.016 57.784l.001.008c.335 19.994 4.397 39.922 12.164 58.653h50.102a7.712 7.712 0 017.709 7.709v4.582a7.712 7.712 0 01-7.709 7.709h-40.103zm-2.211-81.525c-.337-19.314 62.112-36.09 139.368-37.438 77.257-1.349 140.253 13.237 140.59 32.551.337 19.314-62.112 36.09-139.368 37.438-77.256 1.349-140.252-13.237-140.59-32.551z"
                ></path>
                </svg>
                    <h1>wareshop.</h1>
                </div>

                <div className={styles.ShopOptions}>
                    <NavLink to="/" className={styles.Links} ref={home}>HOME</NavLink>
                    <NavLink to="/shop" className={styles.Links} ref={shop} >SHOP</NavLink>
                    <NavLink to="/about" className={styles.Links} ref={about} >ABOUT</NavLink>
                </div>

                <div className={styles.UserOptions} ref={usersOpt}>
                         <div className={styles.Icon}>
                             <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 style={{ isolation: "isolate" }}
                                 viewBox="13.929 13.929 72.142 72.142"
                             >
                             <path
                                 fill="#C1CBD9"
                                 ref={searchSVG}
                                 fillRule="evenodd"
                                 d="M69.544 59.544a29.838 29.838 0 004.385-15.615c0-16.557-13.443-30-30-30-16.557 0-30 13.443-30 30 0 16.557 13.443 30 30 30a29.838 29.838 0 0015.615-4.385l14.508 14.508a6.899 6.899 0 009.753 0l.247-.247a6.899 6.899 0 000-9.753L69.544 59.544zM28.929 43.929c0-8.279 6.721-15 15-15s15 6.721 15 15-6.721 15-15 15-15-6.721-15-15z"
                             ></path>
                             </svg>
                         </div>

                         <div className={styles.Icon}>
                            <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 style={{ isolation: "isolate" }}
                                 viewBox="14.761 13.627 70.477 72.746"
                             >
                             
                             <path
                                 fill="#C1CBD9"
                                 ref={cartSVG}
                                 fillRule="evenodd"
                                 d="M49.146 56.373h1.708a2.648 2.648 0 012.646 2.646v14.708a2.647 2.647 0 01-2.646 2.646h-1.708a2.647 2.647 0 01-2.646-2.646V59.019a2.648 2.648 0 012.646-2.646zm10 0h1.708a2.648 2.648 0 012.646 2.646v14.708a2.647 2.647 0 01-2.646 2.646h-1.708a2.647 2.647 0 01-2.646-2.646V59.019a2.648 2.648 0 012.646-2.646zm-39.217-10h60.142c3.312 0 5.597 2.658 5.1 5.932L80.9 80.441c-.497 3.274-3.589 5.932-6.9 5.932H26c-3.311 0-6.403-2.658-6.9-5.932l-4.271-28.136c-.497-3.274 1.788-5.932 5.1-5.932zm19.217 10h1.708a2.648 2.648 0 012.646 2.646v14.708a2.647 2.647 0 01-2.646 2.646h-1.708a2.647 2.647 0 01-2.646-2.646V59.019a2.648 2.648 0 012.646-2.646z"
                             ></path>
                             <g fill="#C1CBD9" ref={cart2SVG}>
                                 <path d="M45.827 13.966c1.673.965 1.892 3.724.488 6.155L27.138 53.329c-1.404 2.431-3.902 3.621-5.575 2.655-1.673-.965-1.892-3.724-.488-6.155l19.177-33.208c1.404-2.431 3.902-3.621 5.575-2.655zM54.323 13.966c-1.673.965-1.892 3.724-.488 6.155l19.177 33.208c1.404 2.431 3.902 3.621 5.575 2.655 1.673-.965 1.892-3.724.488-6.155L59.898 16.621c-1.404-2.431-3.902-3.621-5.575-2.655z"></path>
                            </g>
                             </svg>
                         </div>

                         <NavLink to={props.userId ? '/acc' : '/login'} className={styles.Icon} onClick={() => menuHandler()}>
                             <svg
                             xmlns="http://www.w3.org/2000/svg"
                             style={{ isolation: "isolate" }}
                             viewBox="25 13.929 50 72.142"
                             >
                             <path
                                 fill="#C1CBD9"
                                 ref={accSVG}
                                 d="M65.383 58.632C71.235 54.054 75 46.928 75 38.929c0-13.798-11.202-25-25-25s-25 11.202-25 25c0 7.999 3.765 15.125 9.617 19.703l-.229.397-6.613 11.454c-4.967 8.603-.934 15.588 9 15.588h26.45c9.934 0 13.967-6.985 9-15.588l-6.613-11.454-.229-.397z"
                             ></path>
                             </svg>
                         </NavLink>
                     </div>

                <div className={styles.Menu} onClick={() => menuHandler()}>
                     <svg
                         xmlns="http://www.w3.org/2000/svg"
                         style={{ isolation: "isolate" }}
                         viewBox="0 0 100 100"
                     >
                     <path
                         fill="#C1CBD9"
                         fillRule="evenodd"
                         ref={menuSVG}
                        d={toggleMenu ? "M50 35.858L28.787 14.645c-3.903-3.903-10.24-3.903-14.142 0-3.903 3.902-3.903 10.239 0 14.142L35.858 50 14.645 71.213c-3.903 3.903-3.903 10.24 0 14.142 3.902 3.903 10.239 3.903 14.142 0L50 64.142l21.213 21.213c3.903 3.903 10.24 3.903 14.142 0 3.903-3.902 3.903-10.239 0-14.142L64.142 50l21.213-21.213c3.903-3.903 3.903-10.24 0-14.142-3.902-3.903-10.239-3.903-14.142 0L50 35.858z" : "M10 0h80c5.519 0 10 4.481 10 10s-4.481 10-10 10H10C4.481 20 0 15.519 0 10S4.481 0 10 0zm0 80h80c5.519 0 10 4.481 10 10s-4.481 10-10 10H10c-5.519 0-10-4.481-10-10s4.481-10 10-10zm0-40h80c5.519 0 10 4.481 10 10s-4.481 10-10 10H10C4.481 60 0 55.519 0 50s4.481-10 10-10z"}
                     ></path>
                     </svg>
                </div>
                </div>


                {toggleMenu && <>
                <div className={styles.MobileOptions}>
                    <NavLink to="/" className={styles.Links} onClick={() => menuHandler()}>HOME</NavLink>
                    <NavLink to="/shop" className={styles.Links} onClick={() => menuHandler()}>SHOP</NavLink>
                    <NavLink to="/about" className={styles.Links} onClick={() => menuHandler()}>CONTACT</NavLink>
                </div>
                </>}
        </div>
    );
};

const mapStateToProps = state => {
    const userId = state.auth.userId
    return {
        userId
    }
        
}

export default connect(mapStateToProps)(Navigation);