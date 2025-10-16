import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Trophy } from 'lucide-react';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the hash fragment from the URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const type = hashParams.get('type');

        if (accessToken && refreshToken) {
          // Set the session
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            throw error;
          }

          if (type === 'signup') {
            toast({
              title: "Email confirmed!",
              description: "Your account has been verified. Welcome to Sports Buddy!",
            });
          } else {
            toast({
              title: "Success",
              description: "You have been authenticated successfully.",
            });
          }

          // Redirect to home page
          navigate('/', { replace: true });
        } else {
          throw new Error('No authentication tokens found in URL');
        }
      } catch (error: any) {
        console.error('Auth callback error:', error);
        toast({
          title: "Authentication Error",
          description: error.message || "Failed to complete authentication. Please try signing in.",
          variant: "destructive"
        });
        navigate('/auth', { replace: true });
      }
    };

    handleCallback();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
      <div className="text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
            <Trophy className="w-7 h-7 text-white" />
          </div>
        </div>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sports-blue mx-auto"></div>
        <p className="mt-4 text-gray-600 font-medium">Completing authentication...</p>
        <p className="mt-2 text-sm text-gray-500">Please wait while we verify your account</p>
      </div>
    </div>
  );
};

export default AuthCallback;