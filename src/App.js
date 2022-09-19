import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SWRConfig } from 'swr';
import { ConfirmProvider } from 'material-ui-confirm';

import './App.css';
import theme from './components/layout/Theme';
import Admin from './components/layout/Admin/Admin';
import Login from './Views/Login/Login';
import PrivateRoute from './utils/PrivateRoute';
import Alert from './components/Alert/Alert';
import Modal from './components/Modal/Modal';
import GLOBAL_AXIOS from './utils/GLOBAL_AXIOS';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

import { loadUser } from './redux/actions/userActions';

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ConfirmProvider>
          <SWRConfig
            value={{
              revalidateOnFocus: false,
              refreshWhenOffline: false,
              refreshWhenHidden: false,
              refreshInterval: 0,
              fetcher: (url) => GLOBAL_AXIOS(url).then((r) => r.data),
            }}
          >
            <Router>
              <Alert />
              <Modal />

              <Switch>
                <Route exact path='/' component={Login} />
                <PrivateRoute path='/admin' component={Admin} />
              </Switch>
            </Router>
          </SWRConfig>
        </ConfirmProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
