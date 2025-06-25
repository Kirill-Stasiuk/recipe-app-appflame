import { Outlet } from '@tanstack/react-router';
import Header from './Header';

const RootLayout = () => {
  return (
    <div>
      <Header />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
