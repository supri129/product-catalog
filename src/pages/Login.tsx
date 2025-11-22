import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const { session, supabase } = useAuth();

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex justify-center items-center py-12">
      <div className="w-full max-w-md">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          theme="light"
        />
      </div>
    </div>
  );
};

export default Login;