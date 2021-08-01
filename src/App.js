import styles from './App.module.scss';

import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';

import Home from './components/pages/Home/Home';
import Shop from './components/pages/Shop/Shop';
import Contact from './components/pages/Contact/Contact';

import {Route, Switch} from 'react-router-dom';

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

          <Route path='/contact' exact>
            <Contact />
          </Route>
        </Switch>
      <Footer/>

    </div>
  );
}

export default App;
