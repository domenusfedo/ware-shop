import styles from './App.module.scss';

import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';

import Home from './components/pages/Home/Home';
import Shop from './components/pages/Shop/Shop';
import About from './components/pages/About/About';

import Signup from './components/Auth/Signup/Signup';
import Login from './components/Auth/Login/Login';
import Account from './components/Auth/Account/Account';

import Cart from './components/Cart/Cart';

//import asyncComponent from './hoc/asyncComponent';

import {Route, Switch} from 'react-router-dom';

// const asyncComp = asyncComponent(url => {
//   return import(url)
// });


function App() {
  return (
    <div className={styles.App}>
      <Navigation />
        <Switch>
        <Route path='/' exact>
          <Home />
          <Footer/>
        </Route>

        <Route path='/shop'>
          <Shop />
          <Footer/>
        </Route>

        <Route path='/about' exact>
          <About />
          <Footer/>
        </Route>

        <Route path='/signup' exact>
          <Signup />
        </Route>

        <Route path='/login' exact>
          <Login/>
        </Route>

        <Route path='/cart' exact>
          <Cart/>
          <Footer/>
        </Route>

        <Route path='/acc' exact>
          <Account/>
        </Route>

        </Switch>
    </div>
  );
}
export default App;
