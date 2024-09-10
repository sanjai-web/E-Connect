import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './pages/Layout';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Donation from './pages/Donation';
import Home from './pages/Home';
import Discussion from './pages/Discussion';
import Message from './pages/Message';
import './index.css'; 
import './App.css';
import Feedback from './pages/Feedback';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/donation' element={<Donation />} />
        <Route path='/discussion' element={<Discussion />} />
        <Route path='/message' element={<Message />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  const location = useLocation();
  const hideLayoutRoutes = ['/signup', '/'];

  return (
    <div>
      {/* Only show Layout for routes not in hideLayoutRoutes */}
      {!hideLayoutRoutes.includes(location.pathname) && <Layout />}
      <App />
    </div>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}
