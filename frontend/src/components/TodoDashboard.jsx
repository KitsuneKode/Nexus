import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import {
  PlusCircle,
  X,
  Edit2,
  Save,
  Loader2,
  Sun,
  Moon,
  LogOut,
  User,
  CheckCircle,
  ChartNoAxesColumnDecreasingIcon,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function TodoDashboard() {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const message = location.state?.message || ''; //

  // useEffect(() => {

  // }, [todos]);

  useEffect(() => {
    // Check localStorage for theme preference
    const storedTheme = localStorage.getItem('theme');

    // If theme is set in localStorage, use it
    if (storedTheme === 'dark') {
      setIsDarkTheme(true);
    } else if (storedTheme === 'light') {
      setIsDarkTheme(false);
    } else {
      // If not set in localStorage, use system preference
      const prefersDarkScheme = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setIsDarkTheme(prefersDarkScheme);
    }
    const token = localStorage.getItem('token');

    const fetchTodos = async () => {
      const response = await fetch(
        'https://api-nexus-kitsunekode.vercel.app/todos',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Assuming you're passing the token
          },
        }
      );

      const responseData = await response.json();
      setTodos(responseData.todos);
    };
    fetchTodos();
  }, []);

  useEffect(() => {
    toast({
      title: 'Welcome back! ',
      description: 'Your todos are ready to be managed.',
      variant: 'default',
    });
  }, []);

  useEffect(() => {
    const completed = todos.filter((todo) => todo.completed).length;
    const total = todos.length;
    setCompletionPercentage((completed / total) * 100);
  }, [todos]);

  const addTodo = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(
        'https://api-nexus-kitsunekode.vercel.app/todos',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Assuming you're passing the token
          },
          body: JSON.stringify({
            title: newTodoTitle,
            description: newTodoDescription,
            done: false,
          }),
        }
      );
      const addedTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, addedTodo]);
      setNewTodoTitle('');
      setNewTodoDescription('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEditing = (id, title) => {
    setEditingId(id);
    setEditText(title);
  };

  const saveEdit = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === editingId ? { ...todo, title: editText } : todo
      )
    );
    setEditingId(null);
    setEditText('');
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    localStorage.theme = isDarkTheme ? 'light' : 'dark';
  };

  const logout = () => {
    setIsLoggingOut(true);
    // Simulate logout process
    setTimeout(() => {
      // Redirect or perform actual logout logic here
      console.log('Logged out');
      setIsLoggingOut(false);
      navigate('/login');
    }, 2000);
  };

  return (
    <>
      {isLoggingOut ? (
        <div
          className={`min-h-screen flex items-center justify-center ${
            isDarkTheme
              ? 'bg-gray-900'
              : 'bg-gradient-to-br from-teal-50 to-blue-50'
          }`}
        >
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-teal-500"></div>
            <h2
              className={`mt-4 text-2xl font-semibold ${
                isDarkTheme ? 'text-white' : 'text-gray-800'
              }`}
            >
              Logging out...
            </h2>
          </div>
        </div>
      ) : (
        <div
          className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300 ${
            isDarkTheme
              ? 'bg-gray-900'
              : 'bg-gradient-to-br from-teal-50 to-blue-50'
          }`}
        >
          {/* Geometric background pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className={`absolute transform rotate-45 ${
                  isDarkTheme ? 'bg-teal-400' : 'bg-teal-500'
                }`}
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
            className={`w-full max-w-4xl p-8 ${
              isDarkTheme
                ? 'bg-gray-800 bg-opacity-80'
                : 'bg-white bg-opacity-80'
            } backdrop-blur-lg border-gray-200 shadow-2xl rounded-3xl relative overflow-hidden`}
          >
            {/* Animated geometric shapes */}
            <div
              className={`absolute top-0 left-0 w-32 h-32 ${
                isDarkTheme
                  ? 'bg-gradient-to-br from-teal-700 to-blue-700'
                  : 'bg-gradient-to-br from-teal-200 to-blue-200'
              } rounded-br-full opacity-50 animate-pulse`}
            />
            <div
              className={`absolute bottom-0 right-0 w-48 h-48 ${
                isDarkTheme
                  ? 'bg-gradient-to-tl from-teal-700 to-blue-700'
                  : 'bg-gradient-to-tl from-teal-200 to-blue-200'
              } rounded-tl-full opacity-50 animate-pulse`}
              style={{ animationDelay: '1s' }}
            />

            <div className="relative z-10">
              ``
              <div className="flex justify-between items-center mb-8">
                <h1
                  className={`text-4xl font-bold ${
                    isDarkTheme ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  Nexus Todo Dashboard
                </h1>
                <div className="flex items-center space-x-4">
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
                      {isDarkTheme
                        ? 'Switch to light mode'
                        : 'Switch to dark mode'}
                    </span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          src="/placeholder.svg?height=32&width=32"
                          alt="User"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate('/me')}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Account</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              {/* Todo Status and Progress Bar */}
              <div
                className={`mb-6 p-4 rounded-xl ${
                  isDarkTheme ? 'bg-gray-700' : 'bg-white'
                } shadow-md`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-lg font-semibold ${
                      isDarkTheme ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    Todo Status
                  </span>
                  <span
                    className={`text-sm ${
                      isDarkTheme ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {todos.filter((todo) => todo.completed).length} /{' '}
                    {todos.length} completed
                  </span>
                </div>
                <Progress
                  value={completionPercentage}
                  className="h-2 bg-gray-300"
                  indicatorClassName="bg-teal-500"
                />
                <div className="flex justify-between items-center mt-2">
                  <span
                    className={`text-sm ${
                      isDarkTheme ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {completionPercentage.toFixed(1)}% Complete
                  </span>
                  <span
                    className={`text-sm flex items-center ${
                      isDarkTheme ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    <CheckCircle className="mr-1 h-4 w-4 text-teal-500" />
                    {todos.filter((todo) => todo.completed).length} tasks done
                  </span>
                </div>
              </div>
              <div className="flex mb-6">
                <Input
                  value={newTodoTitle}
                  onChange={(e) => setNewTodoTitle(e.target.value)}
                  placeholder="Add a new todo title..."
                  className={`flex-grow mr-2 ${
                    isDarkTheme
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-teal-200 text-gray-900 placeholder-gray-500'
                  } border-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 rounded-xl`}
                />
                <Input
                  value={newTodoDescription}
                  onChange={(e) => setNewTodoDescription(e.target.value)}
                  placeholder="Add a new todo description..."
                  className={`flex-grow mr-2 ${
                    isDarkTheme
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-teal-200 text-gray-900 placeholder-gray-500'
                  } border-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 rounded-xl`}
                />
                <Button
                  onClick={addTodo}
                  disabled={isLoading}
                  className={`${
                    isDarkTheme
                      ? 'bg-teal-600 hover:bg-teal-700'
                      : 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600'
                  } text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg rounded-xl`}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <PlusCircle className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <div className="space-y-4">
                {todos.map((todo, id) => (
                  <div
                    key={id}
                    className={`flex items-center ${
                      isDarkTheme ? 'bg-gray-700' : 'bg-white'
                    } p-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg`}
                  >
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(id)}
                      className={`mr-4 h-5 w-5 border-2 ${
                        isDarkTheme
                          ? 'border-teal-400 text-teal-400'
                          : 'border-teal-500 text-teal-500'
                      } rounded-full`}
                    />
                    {editingId === id ? (
                      <Input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className={`flex-grow mr-2 ${
                          isDarkTheme
                            ? 'bg-gray-600 border-gray-500 text-white'
                            : 'bg-white border-teal-200 text-gray-900'
                        } border-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 rounded-xl`}
                      />
                    ) : (
                      <span
                        className={`flex-grow ${
                          todo.completed
                            ? 'line-through text-gray-500'
                            : isDarkTheme
                            ? 'text-white'
                            : 'text-gray-800'
                        }`}
                      >
                        <span className="font-bold text-xl">{todo.title}</span>{' '}
                        <br />
                        <span>{todo.description}</span>
                      </span>
                    )}
                    {editingId === id ? (
                      <Button
                        onClick={saveEdit}
                        className="mr-2 bg-green-500 hover:bg-green-600 text-white rounded-full p-2"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => startEditing(id, todo.title)}
                        className="mr-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      onClick={() => deleteTodo(id)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
