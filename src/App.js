import styles from './App.module.scss';

import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';

import Home from './components/pages/Home/Home';
import Shop from './components/pages/Shop/Shop';
import About from './components/pages/About/About';

import asyncComponent from './hoc/asyncComponent';

import {Route, Switch} from 'react-router-dom';

const asyncComp = asyncComponent(url => {
  return import(url)
});

function App() {
  return (
    <div className={styles.App}>
      <Navigation />
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>

          <Route path='/shop' exact>
            <Shop />
          </Route>

          <Route path='/about' exact>
            <About />
          </Route>
        </Switch>
      <Footer/>

    </div>
  );
}

export default App;
