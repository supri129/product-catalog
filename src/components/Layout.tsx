import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import WishlistSidebar from './WishlistSidebar';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
      <WishlistSidebar />
    </div>
  );
};

export default Layout;