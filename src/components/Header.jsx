import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-bold text-color-1">L&apos;histoire d&apos;une vie</h1>
          <nav>
            <ul className="flex space-x-8">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-color-1 font-bold" : "text-color-2 hover:text-color-1"
                  }
                >
                  Accueil
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/timeline"
                  className={({ isActive }) =>
                    isActive ? "text-color-1 font-bold" : "text-color-2 hover:text-color-1"
                  }
                >
                  Chronologie
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/memoire"
                  className={({ isActive }) =>
                    isActive ? "text-color-1 font-bold" : "text-color-2 hover:text-color-1"
                  }
                >
                  Mémoires
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
