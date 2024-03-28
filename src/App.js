import './App.css';
import { Route, Routes } from "react-router-dom";
import Leaderboard from "./components/leaderboard/Leaderboard.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Login from './components/login/Login';
import Game1 from './components/game1/Game1.jsx';
import Game2 from './components/game2/Game2.jsx';
import RequireAuth from './components/RequireAuth.js';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar.jsx';


function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path='/login' element={<Login/>}/>
        {/* private routes */}
        <Route element={<RequireAuth />}>
          <Route path='/' element={<Dashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
