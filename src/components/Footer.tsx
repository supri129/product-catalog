import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ShopSphere. All Rights Reserved.</p>
        <div className="mt-2">
          <Link to="/help" className="hover:text-primary">Help & Support</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;