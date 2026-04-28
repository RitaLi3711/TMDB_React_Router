import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { Outlet, useLocation } from 'react-router-dom';

export const MainLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#0d1821] text-[#f0f4ef]">
      {!isHomePage && <Header />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};