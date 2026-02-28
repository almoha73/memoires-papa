import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "text-color-1 font-bold underline decoration-2 underline-offset-4"
      : "text-color-2 hover:text-color-1 transition-colors";

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-bold text-color-1">L&apos;histoire d&apos;une vie</h1>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-color-1 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><NavLink to="/" className={navLinkClasses}>Accueil</NavLink></li>
              <li><NavLink to="/timeline" className={navLinkClasses}>Chronologie</NavLink></li>
              <li><NavLink to="/memoire" className={navLinkClasses}>Mémoires</NavLink></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-white/95 backdrop-blur shadow-inner absolute top-16 left-0 w-full z-40 border-t border-color-5">
          <ul className="flex flex-col space-y-4 px-4 py-6">
            <li>
              <NavLink to="/" onClick={() => setIsOpen(false)} className={navLinkClasses}>
                <span className="block w-full text-lg">Accueil</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/timeline" onClick={() => setIsOpen(false)} className={navLinkClasses}>
                <span className="block w-full text-lg">Chronologie</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/memoire" onClick={() => setIsOpen(false)} className={navLinkClasses}>
                <span className="block w-full text-lg">Mémoires</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
