import { LoginForm } from "../components/loginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-space p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-xl animate-fade-in">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Please sign in to continue</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
