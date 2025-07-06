import Header from './components/Header';
import Footer from './components/Footer';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RoomDetails from './pages/rooms/RoomDetails';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AddRoom from './pages/rooms/AddRoom';
import Home from './pages/rooms/Home';
import MyRooms from './pages/rooms/MyRooms';
import BookingsPage from './pages/bookings/BookingsPage';
import { useAuthContext } from '@/hooks/auth/useAuthContext';
import { ToastContainer } from 'react-toastify';

function App() {
  const { user, isUserLoading } = useAuthContext();

  const BASE_URL = import.meta.env.VITE_API_URL;

  if (isUserLoading || !BASE_URL)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-lg font-semibold">Loading...</span>
      </div>
    );

  const noUser = user === null;

  return (
    <Router>
      <div className="h-auto  ">
        <Header />
        <div className="flex justify-between flex-col ">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="login" element={noUser ? <Login /> : <Navigate to="/" />} />
              <Route path="register" element={noUser ? <Register /> : <Navigate to="/" />} />
              <Route path="/" element={!noUser ? <Home /> : <Navigate to="/login" />} />
              <Route
                path="/rooms/:id"
                element={!noUser ? <RoomDetails /> : <Navigate to="/login" />}
              />
              <Route path="/rooms/add" element={!noUser ? <AddRoom /> : <Navigate to="/login" />} />
              <Route
                path="/rooms/my-rooms"
                element={!noUser ? <MyRooms /> : <Navigate to="/login" />}
              />
              <Route
                path="/bookings"
                element={!noUser ? <BookingsPage /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
          <Footer />
          <ToastContainer />
        </div>
      </div>
    </Router>
  );
}

export default App;
