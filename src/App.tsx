import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { Header } from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
