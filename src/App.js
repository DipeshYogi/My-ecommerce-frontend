import React from 'react';
import './App.css';
import Web from './components/web';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import AlertTemplate from 'react-alert-template-basic';
import { positions, Provider as AlertProvider } from 'react-alert';

/** Redux Provider */
import { Provider } from 'react-redux';

/** Store, Persistor */
import {store, persistor} from './store';

const theme = createMuiTheme({
  typography: {
    fontFamily: [ "'Roboto', sans-serif", "'Sora', sans-serif" ],
    textTransform: "none" ,
    button: {
      textTransform: "none",
    }, 
  }
});

const alertOptions = {
  position: positions.BOTTOM_CENTER,
  timeout: 2000
}


function App() {

  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <div className="App">
            <BrowserRouter>
              <Switch>
                <Route path='/' component={Web} />
              </Switch>
            </BrowserRouter>
            </div>
          </ThemeProvider>
        </PersistGate>
      </AlertProvider>
    </Provider>
  );
}

export default App;
