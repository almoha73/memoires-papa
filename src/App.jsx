import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';

const Home = lazy(() => import('@/pages/Home'));
const Timeline = lazy(() => import('@/pages/Timeline'));
const Memoire = lazy(() => import('@/pages/Memoire'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="container mx-auto px-4 py-12 text-center">Chargement...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="timeline" element={<Timeline />} />
            <Route path="memoire" element={<Memoire />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
