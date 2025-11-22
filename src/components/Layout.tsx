import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import VisitorSidebar from './VisitorSidebar';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
      <VisitorSidebar />
    </div>
  );
};

export default Layout;