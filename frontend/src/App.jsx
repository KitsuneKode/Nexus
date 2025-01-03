import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from 'react-router-dom';
import SignupForm from './components/LoginPage';
import TodoDashboard from './components/TodoDashboard';
import PrivateRoute from './components/PrivateRoute';
import MyAccount from './components/AccountPage';
import HomePage from './components/HomePage';
function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect / to /signup */}
        <Route path="/" element={<HomePage />} />

        <Route
          path="/"
          element={
            <PrivateRoute Component={TodoDashboard} redirectPath="/signup" />
          }
        />
        {/* Define the /signup route */}
        <Route path="/signup" element={<SignupForm initialPage="signup" />} />
        <Route path="/login" element={<SignupForm initialPage="login" />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute Component={TodoDashboard} />}
        />

        <Route path="/me" element={<PrivateRoute Component={MyAccount} />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
