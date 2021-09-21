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
    const nav1 = useRef();
    const nav2 = useRef();
    const nav3 = useRef();
    const nav4 = useRef();
    const nav5 = useRef();
    
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
            case '#/cart': {
                color= '#243040';
            }
            break;
            case '#/about': {
                actual = about;
                color= '#65768C';
            }
            break;
            case '#/login': {
                color= '#243040';
            }
            break;
            case '#/acc': {
                color= '#243040';
            }
            break;
            case '#/signup': {
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

        gsap.to([nav1.current, nav2.current, nav3.current, nav4.current], {
            stopColor: color
        });
        gsap.to([nav5.current], {
            fill: color
        });

        actual ? gsap.to([elements[0].current, elements[1].current], {
            opacity: 0.75,
            color: color
        }) : gsap.to([elements[0].current, elements[1].current, elements[2].current], {
            opacity: 0.75,
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

            document.body.style.scroll = 'noscroll'
            document.body.style.overflow = 'hidden'
            menuAnimation.play();

        } else {
            document.body.style.scroll = 'scroll'
            document.body.style.overflow = 'scroll'
            menuAnimation.reverse()
        }
    }

    return (
        <div className={styles.MainToolbar} ref={nav}>
            <div className={styles.NavHolder}>
                <div className={styles.logo}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 261.16 256.15" width="40px"
                height="40px">
      <defs>
        <linearGradient
          id="A"
          x1="200.89"
          x2="3.14"
          y1="204.01"
          y2="182.15"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#65768C" ref={nav1}></stop>
          <stop offset="1" stopColor="#5a6a7e" ref={nav2}></stop>
        </linearGradient>
        <linearGradient
          id="B"
          x1="240.62"
          x2="136.88"
          y1="149.81"
          y2="73.98"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#65768C" ref={nav3}></stop>
          <stop offset="1" stopColor="#5a6a7e" ref={nav4}></stop>
        </linearGradient>
      </defs>
      <path
        fill="url(#A)"
        d="M225.54 215.19A130.57 130.57 0 010 125.57l.08-4.47a219 219 0 00164.49 74.16 221.27 221.27 0 0023.29-1.26 218.55 218.55 0 0037.68 21.19z"
      ></path>
      <path
      ref={nav5}
        fill="#5a6a7e"
        d="M187.86 194a221.27 221.27 0 01-23.29 1.23A219 219 0 01.08 121.1v-.75a218.5 218.5 0 00130.48 43q10.2 0 20.15-.92l1-.08.84.9A220.15 220.15 0 00187.86 194z"
      ></path>
      <path
        fill="url(#B)"
        d="M261.16 125.57a130 130 0 01-10.91 52.33l-2.11 4.55a129.82 129.82 0 01-22.6 32.74A218.55 218.55 0 01187.86 194a220.15 220.15 0 01-35.33-30.8l-.84-.9A218.67 218.67 0 0194 14q0-7 .44-14h.17a130.6 130.6 0 00120.17 79.36 130.37 130.37 0 0029-3.24q3.49-.8 6.93-1.77a129.87 129.87 0 0110.33 46l.12 5.22z"
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

                         <NavLink to='/cart' className={styles.Icon} onClick={() => menuHandler()}>
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
                         </NavLink>

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
                    <NavLink to="/about" className={styles.Links} onClick={() => menuHandler()}>ABOUT</NavLink>
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