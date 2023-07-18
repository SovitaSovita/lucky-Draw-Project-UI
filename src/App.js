import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import RandomPicker from './component/RandomPicker';
import DashboardPage from './pages/DashboardPage';
import Test from './component/Test';

function App() {

  const namesList = [
    'Sak',
    'Hito',
    'Chenghav',
    'Sokreach',
    'Leyley',
    'Miko',
    'Anjing',
    'Sreytoch',
    'Rady',
    'RadySava',
    'BekNgang'
  ];


  return (
    <div className="">
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="random-pick" element={<RandomPicker items={namesList} />} />
      </Routes>
    </div>
  );
}

export default App;
