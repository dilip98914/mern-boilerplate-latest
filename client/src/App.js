import {BrowserRouter,Route} from 'react-router-dom'
import Register from './pages/register';
import Login from './pages/login';
import ProductListing from './pages/productListing';
import Success from './pages/success';
import Cancel from './pages/cancel';

import { useState } from 'react';
import { useContext, createContext } from 'react';
export const GlobalContext = createContext({});

function App() {
  const [global,setGlobal]=useState({})


  return (
   <div className="app">
      <GlobalContext.Provider value={{global,setGlobal}}>
    <BrowserRouter>
      <Route
        path="/register" exact
        component={Register}
      />
        <Route
          path="/login" exact
          component={Login}
        />
        <Route
          path="/" exact
          component={ProductListing}
        />
          <Route
            path="/success" exact
            component={Success}
          />   <Route
            path="/cancel" exact
            component={Cancel}
          />
    </BrowserRouter>
      </GlobalContext.Provider>
    <div style={{
      background:'green',
      position:'absolute',
      textAlign:'center',
      color:'white',
      bottom:'0px',
      padding:'5px',
      width:'100%'
    }}>
      @copyright Dilip Gupta
    </div>
   </div>
  );
}

export default App;
