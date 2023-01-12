import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import Login from './Pages/Login/Login'
import Profile from './Pages/Profile/Profile'
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import { AuthContext } from './store/AuthContextProvider';
import { useContext } from 'react';

function App() {
  const { isLoggedIn } = useContext(AuthContext)
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />

        {!isLoggedIn && <Route path='login' element={<Login />} />}

        {isLoggedIn &&
          <Route path='profile' element={<Profile />} />
        }
        <Route path='*' element={<Navigate to='login' replace />} />
      </Routes>
    </div>
  );
}

export default App;
