import { LoginForm } from "../../components/loginForm";
import "./Login.css"; // Importing custom CSS

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="text-center">
          <h2 className="title">Welcome to SpaceX </h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
