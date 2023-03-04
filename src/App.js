import './App.css';
import React from 'react';

import './scss/app.scss';

import { Header } from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import { Routes, Route } from 'react-router-dom';

import { store } from './redux/store';
import FullPizza from './pages/FullPizza';

export const searchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="App">
      <div className="wrapper">
        <searchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home searchValue={searchValue} />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/pizza/:id" element={<FullPizza />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </searchContext.Provider>
      </div>
    </div>
  );
}

export default App;
