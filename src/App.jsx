import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Timeline from './pages/Timeline';
import Memoire from './pages/Memoire';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="memoire" element={<Memoire />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
