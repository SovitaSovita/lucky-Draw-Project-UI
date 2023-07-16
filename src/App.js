
import { Route, Routes } from 'react-router-dom';
import './App.css';
import DashboardPage from './pages/DashboardPage';
import ManageListPage from './pages/ManageListPage';
import Layout from './pages/Layout';
import FontEndPage from './pages/FontEndPage';
import Winner from './pages/Winner';
import AccountPage from './pages/AccountPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<FontEndPage />} />

      <Route path='/dashboard' element={<Layout />}>
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/dashboard/manage' element={<ManageListPage />} />
        <Route path='/dashboard/winner' element={<Winner />} />
        <Route path='/dashboard/account' element={<AccountPage />} />
      </Route>
    </Routes>
  );
}

export default App;
