import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import RandomPicker from './component/RandomPicker';
import DashboardPage from './pages/DashboardPage';

function App() {
  
  const namesList = [
    'Marcelo',
    'Lizzette',
    'Pauline',
    'Fumiko',
    'Tomasa',
    'Bertha',
    'Antoinette',
    'Tianna',
    'Ammie',
    'Victorina',
    'Marlon',
    'Jules',
    'Arletha',
    'Ellyn',
    'Karol',
    'Corrin',
    'Josephine'
  ];


  return (
    <div className="">
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="random-pick" element={<RandomPicker items={namesList} />} />
      </Routes>
    </div>
  );
}

export default App;
