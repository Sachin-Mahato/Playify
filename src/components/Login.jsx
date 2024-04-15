import { loginWithSpotify } from "../utils/auth"

const Login = () => {
  const handleLogin = () => {
    loginWithSpotify()
  }

  return (
    <div className=" bg-green-600 outline-none text-gray-100 text-xl py-2 px-4 rounded-md">
      <button onClick={handleLogin}>login with spotify</button>
    </div>
  );
};

export default Login;

