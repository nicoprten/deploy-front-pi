import './App.css';
import './App.scss';
import ButtonHome from './components/ButtonHome/ButtonHome';
import Home from './components/Home/Home';
import GameDetail from './components/GameDetail/GameDetail';
import CreateGame from './components/CreateGame/CreateGame';
// import axios from 'axios';
// import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <h1>PrtenGames</h1>
      <Routes>
        <Route path='/' element={<ButtonHome />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/home/:id/:createdInDb' element={<GameDetail />}></Route>
        <Route path='/createGame' element={<CreateGame />}></Route>
      </Routes>
    </div>
  );
}

export default App;
