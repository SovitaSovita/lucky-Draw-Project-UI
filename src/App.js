
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import DashboardPage from './pages/DashboardPage';
import ManageListPage from './pages/ManageListPage';
import Layout from './pages/Layout';
import FontEndPage from './pages/FontEndPage';
import Winner from './pages/Winner';
import AccountPage from './pages/AccountPage';
import Login from './component/login';
import Protected from './redux/service/Protected';
import { get_list } from './redux/service/TableListService';
import { useDispatch } from 'react-redux';
import { loginAuth } from './redux/slice/AuthSlice';
import DefaultWinner from './pages/DefaultWinner';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token');
    dispatch(loginAuth(!!token));

    get_list().then((res) => {
      if (res === 401) {
        dispatch(loginAuth(false));
      }
    });
  }, []);

  return (
    <Routes>
        <Route path='lucky-draw' element={<Protected><FontEndPage /></Protected>} />
        <Route path='' element={<Protected><Layout /> </Protected>}>
          <Route path='' element={<DashboardPage />} />
          <Route path='manage' element={<ManageListPage />} />
          <Route path='winner' element={<Winner />} />
          <Route path='default' element={<DefaultWinner />} />
          <Route path='account' element={<AccountPage />} />
        </Route>


      <Route path='/login' element={<Login />} />


      {/* <Route path="random-pick" element={<RandomPicker items={namesList} />} /> */}
    </Routes>
    // <div className="">
    //   <Routes>

    //   </Routes>
    // </div>
  );
}

export default App;
