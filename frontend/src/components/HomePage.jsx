import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const HomePage = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkTheme(true);
    } else if (storedTheme === 'light') {
      setIsDarkTheme(false);
    } else {
      const prefersDarkScheme = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setIsDarkTheme(prefersDarkScheme);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    localStorage.theme = isDarkTheme ? 'light' : 'dark';
  };

  const features = [
    {
      title: 'Smart Task Organization',
      description: 'Categorize and prioritize your tasks with ease.',
    },
    {
      title: 'Progress Tracking',
      description:
        'Visualize your productivity with intuitive charts and statistics.',
    },
    {
      title: 'Collaborative Workspaces',
      description: 'Share and delegate tasks within your team or family.',
    },
    {
      title: 'Cross-platform Sync',
      description: 'Access your tasks from any device, anytime, anywhere.',
    },
  ];

  const faqs = [
    {
      question: 'Is Nexus  free to use?',
      answer:
        'We offer a free tier with basic features. Premium features are available with our paid plans.',
    },
    {
      question: 'Can I access Nexus  on my mobile device?',
      answer:
        'Yes! We have mobile apps for both iOS and Android, syncing seamlessly with the web version.',
    },
    {
      question: 'How secure is my data?',
      answer:
        'We use industry-standard encryption to protect your data. Your privacy and security are our top priorities.',
    },
    {
      question: 'Can I integrate Nexus  with other tools?',
      answer:
        'Absolutely! We offer integrations with popular productivity tools and calendar apps.',
    },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-300 ${
        isDarkTheme
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-br from-teal-50 to-blue-50 text-gray-900'
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

      {/* Navigation */}
      <nav
        className={`w-full max-w-7xl p-4 flex justify-between items-center ${
          isDarkTheme ? 'bg-gray-800' : 'bg-white'
        } bg-opacity-80 backdrop-blur-lg rounded-full mb-8`}
      >
        <h2 className="text-2xl font-bold">Nexus </h2>
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
          </Button>
          <Button
            onClick={() => navigate('/login')}
            variant="outline"
            className={` text-gray-800 hover:bg-opacity-10 hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105 rounded-xl`}
          >
            Log In
          </Button>
          <Button
            onClick={() => navigate('/signup')}
            className={`${
              isDarkTheme
                ? 'bg-teal-600 hover:bg-teal-700'
                : 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600'
            } text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg rounded-xl`}
          >
            Sign Up
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <Card
        className={`w-full max-w-7xl p-8 ${
          isDarkTheme ? 'bg-gray-800 bg-opacity-80' : 'bg-white bg-opacity-80'
        } backdrop-blur-lg border-gray-200 shadow-2xl rounded-3xl relative overflow-hidden mb-16`}
      >
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1
                className={`text-5xl font-bold mb-6 ${
                  isDarkTheme ? 'text-white' : 'text-gray-800'
                }`}
              >
                Elevate Your Productivity with Nexus
              </h1>
              <p
                className={`text-xl mb-6 ${
                  isDarkTheme ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Streamline your tasks, boost your efficiency, and achieve your
                goals with the ultimate todo app designed for modern
                professionals and teams.
              </p>
              <div className="space-x-4">
                <Button
                  onClick={() => navigate('/signup')}
                  className={`${
                    isDarkTheme
                      ? 'bg-teal-600 hover:bg-teal-700'
                      : 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600'
                  } text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg rounded-xl text-lg px-8 py-3`}
                >
                  Get Started for Free
                </Button>
                <Button
                  onClick={() => {
                    /* Implement demo functionality */
                  }}
                  variant="outline"
                  className={` text-gray-800 hover:bg-opacity-10 hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105 rounded-xl text-lg px-8 py-3`}
                >
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <img
                src="/api/placeholder/600/400"
                alt="Nexus  Dashboard"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Features Section */}
      <section className="w-full max-w-7xl mb-16">
        <h2
          className={`text-3xl font-bold mb-8 text-center ${
            isDarkTheme ? 'text-white' : 'text-gray-800'
          }`}
        >
          Powerful Features to Supercharge Your Productivity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`p-6 ${
                isDarkTheme ? 'bg-gray-800' : 'bg-white'
              } rounded-xl shadow-lg`}
            >
              <h3
                className={`text-xl font-semibold mb-2 ${
                  isDarkTheme ? 'text-white' : 'text-gray-800'
                }`}
              >
                {feature.title}
              </h3>
              <p className={isDarkTheme ? 'text-gray-300' : 'text-gray-600'}>
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-7xl mb-16">
        <h2
          className={`text-3xl font-bold mb-8 text-center ${
            isDarkTheme ? 'text-white' : 'text-gray-800'
          }`}
        >
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger
                className={`text-lg ${
                  isDarkTheme ? 'text-white' : 'text-gray-800'
                }`}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent
                className={isDarkTheme ? 'text-gray-300' : 'text-gray-600'}
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA Section */}
      <section
        className={`w-full max-w-7xl p-8 ${
          isDarkTheme ? 'bg-gray-800' : 'bg-teal-50'
        } rounded-3xl mb-16`}
      >
        <h2
          className={`text-3xl font-bold mb-4 text-center ${
            isDarkTheme ? 'text-white' : 'text-gray-800'
          }`}
        >
          Ready to Boost Your Productivity?
        </h2>
        <p
          className={`text-xl mb-6 text-center ${
            isDarkTheme ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Join thousands of satisfied users and start organizing your life with
          Nexus today.
        </p>
        <div className="flex justify-center">
          <Button
            onClick={() => navigate('/signup')}
            className={`${
              isDarkTheme
                ? 'bg-teal-600 hover:bg-teal-700'
                : 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600'
            } text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg rounded-xl text-lg px-8 py-3`}
          >
            Get Started for Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`w-full max-w-7xl p-8 ${
          isDarkTheme ? 'bg-gray-800' : 'bg-white'
        } bg-opacity-80 backdrop-blur-lg rounded-t-3xl`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Nexus </h2>
            <p className={isDarkTheme ? 'text-gray-400' : 'text-gray-600'}>
              © 2024 Nexus . All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              className={`hover:underline ${
                isDarkTheme ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Terms of Service
            </a>
            <a
              href="#"
              className={`hover:underline ${
                isDarkTheme ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className={`hover:underline ${
                isDarkTheme ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
