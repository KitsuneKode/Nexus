import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { User, Mail, Lock, Loader2, Sun, Moon } from 'lucide-react';
import { Alert } from './ui/alert';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useToast } from '@/hooks/use-toast';

export default function SignupForm({ initialPage }) {
  const [isLoading, setIsLoading] = useState(false);
  const [signUpPage, setSignUpPage] = useState(initialPage === 'signup');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');
  const [error, setError] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.theme === 'dark' // Retrieve the theme preference from local storage
  );
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Sync the page state based on the URL path
    if (location.pathname === '/signup') {
      setSignUpPage(true);
    } else if (location.pathname === '/login') {
      setSignUpPage(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Check if we were redirected from a private route
    if (location.state?.fromPrivateRoute) {
      toast({
        title: 'Access Denied',
        description: 'Please log in to access that page.',
        variant: 'destructive',
      });
    }
  }, [location.state, toast]);

  useEffect(() => {
    setPassword('');
  }, [signUpPage]);

  useEffect(() => {
    // Save the theme preference to local storage
    localStorage.theme = isDarkTheme ? 'dark' : 'light';
  }, [isDarkTheme]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (signUpPage) {
      try {
        console.log('Creating account...');

        const response = await fetch(
          'https://api-nexus-kitsunekode.vercel.app/auth/signup',
          {
            method: 'POST',
            body: JSON.stringify({
              username,
              email,
              password,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('API response:', response);
        if (response.ok) {
          const data = await response.json();
          setAlert('Account created successfully');
          console.log(data);
        } else {
          const data = await response.json();
          setError(
            'Registration failed. Please try again later.' + data.message
          );
          setIsLoading(false);
          return;
        }
      } catch (error) {
        setError('An error occurred. Please try again later.' + error);
        console.error('Error:', error);
        return;
      }
    } else {
      try {
        const response = await fetch(
          'https://api-nexus-kitsunekode.vercel.app/auth/signin',
          {
            method: 'POST',
            body: JSON.stringify({
              email,
              password,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          console.log(data);
        } else {
          const data = await response.json();
          setError('Login Failed. ' + data.message);
        }
      } catch (error) {
        setError('An error occurred. Please try again later.' + error);
        console.error('Error:', error);
      }
    }
    setTimeout(() => {
      setIsLoading(false);
      setAlert('');
      setError('');
      if (signUpPage) {
        setSignUpPage(false);
      } else {
        // Redirect to dashboard
        console.log('Redirect to dashboard');
        navigate('/dashboard');
      }
    }, 1000);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    localStorage.theme = isDarkTheme ? 'light' : 'dark';
  };

  const handlePageToggle = () => {
    setSignUpPage(!signUpPage);
    if (signUpPage) {
      navigate('/login');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden ${
        isDarkTheme ? 'bg-gray-900 text-white' : 'bg-teal-50 text-gray-900'
      }`}
    >
      {/* Geometric background pattern */}

      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute transform rotate-45 bg-teal-500"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
          />
        ))}
      </div>
      <Card
        className={`w-full max-w-md p-8 border-gray-200 shadow-xl rounded-xl relative overflow-hidden ${
          isDarkTheme ? 'bg-gray-800 border-gray-600' : 'bg-white'
        }`}
      >
        {/* Animated geometric shapes */}
        <div className="absolute top-0 left-0 w-16 h-16 bg-teal-100 rounded-br-full animate-pulse" />
        <div
          className="absolute bottom-0 right-0 w-24 h-24 bg-teal-100 rounded-tl-full animate-pulse"
          style={{ animationDelay: "1s'" }}
        />

        <div className="relative z-10">
          <Button
            onClick={toggleTheme}
            variant="outline"
            size="icon"
            className={`rounded-full ${
              isDarkTheme
                ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            {isDarkTheme ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">
              {isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
            </span>
          </Button>
          <div className="text-center mb-8">
            <h1
              className={`text-3xl font-bold mb-2 ${
                !isDarkTheme ? 'text-gray-900' : 'text-gray-50'
              }`}
            >
              {signUpPage ? 'Create an Account' : 'Log In'}
            </h1>

            <p
              className={`${!isDarkTheme ? 'text-gray-600' : 'text-gray-200'} `}
            >
              {signUpPage
                ? 'Join us and start your journey'
                : 'Log in to your account'}
            </p>
          </div>
          {alert && (
            <Alert
              variant="success"
              className={`mb-4 ${
                isDarkTheme
                  ? 'bg-gray-700 text-white'
                  : 'bg-teal-500 text-zinc-900'
              }`}
            >
              {alert}
            </Alert>
          )}
          {error && (
            <Alert
              variant="destructive"
              className={`mb-4 ${
                isDarkTheme
                  ? 'bg-gray-700 text-white'
                  : 'bg-red-500 text-zinc-900'
              }`}
            >
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {signUpPage && (
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className={`flex items-center ${
                    isDarkTheme ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  <User className="w-4 h-4 mr-2 text-teal-600" />
                  UserName
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="johndoe"
                  required
                  className={`bg-white border-2 border-teal-200 placeholder-gray-500 focus:ring-2 focus:ring-teal-500 ${
                    isDarkTheme
                      ? 'text-gray-200 bg-gray-800 border-gray-600 placeholder-gray-500 focus:ring-teal-400'
                      : 'text-gray-900'
                  }`}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className={`flex items-center ${
                  isDarkTheme ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <Mail className="w-4 h-4 mr-2 text-teal-600" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                className={`bg-white border-2 border-teal-200 placeholder-gray-500 focus:ring-2 focus:ring-teal-500 ${
                  isDarkTheme
                    ? 'text-gray-200 bg-gray-800 border-gray-600 placeholder-gray-500 focus:ring-teal-400'
                    : 'text-gray-900'
                }`}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className={`flex items-center ${
                  isDarkTheme ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <Lock className="w-4 h-4 mr-2 text-teal-600" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                placeholder="••••••••"
                required
                minLength={6} // Minimum 6 characters
                maxLength={20} // Maximum 20 characters (optional)
                className={`bg-white border-2 border-teal-200 placeholder-gray-500 focus:ring-2 focus:ring-teal-500 ${
                  isDarkTheme
                    ? 'text-gray-200 bg-gray-800 border-gray-600 placeholder-gray-500 focus:ring-teal-400'
                    : 'text-gray-900'
                }`}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {signUpPage ? (
              <Button
                type="submit"
                className={`w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 ${
                  isDarkTheme ? 'text-white' : 'text-white'
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Sign Up'
                )}
              </Button>
            ) : (
              <Button
                type="submit"
                className={`w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 ${
                  isDarkTheme ? 'text-white' : 'text-white'
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Log In'
                )}
              </Button>
            )}
          </form>
          {
            <p
              className={`mt-6 text-center text-sm ${
                !isDarkTheme ? 'text-gray-900' : 'text-gray-50'
              }`}
            >
              {signUpPage
                ? 'Already have an account?'
                : "Don't have an account?"}
              <a
                className="font-medium px-1 text-teal-600 hover:text-teal-500 transition-colors hover:cursor-pointer hover:text-lg"
                onClick={() => handlePageToggle()}
              >
                {signUpPage ? 'Log in' : 'Sign up'}
              </a>
            </p>
          }
        </div>
      </Card>
    </div>
  );
}

SignupForm.propTypes = {
  initialPage: PropTypes.string.isRequired,
};
