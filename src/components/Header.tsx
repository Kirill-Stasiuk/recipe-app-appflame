import { Link } from '@tanstack/react-router';
import { useAuth } from '../hooks/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        RecipeApp
      </Link>
      <nav className="space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to="/add-recipe" className="text-blue-500 hover:underline">
              Add Recipe
            </Link>
            <button onClick={logout} className="text-red-500 hover:underline">
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
