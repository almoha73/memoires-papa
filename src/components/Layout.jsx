import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <div className="min-h-screen bg-color-5 text-color-2">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
