import React from 'react';
import './App.css';
import Login from './pages/signin/signin';
import Signup from './pages/signup/signup'
import HomePage from './component/home'
import { SearchProvider } from './searchContext';
import Bookmarks from './component/bookmark';
import AllRoutes from './AllRouter';
import Loader from './component/loader';


function App(){
  return(
    <div>
    <AllRoutes />
    {/* <Loader /> */}
    </div>
  );
}

export default App;