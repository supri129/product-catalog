import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import Spinner from './Spinner';

const ProtectedRoute = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!session) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;