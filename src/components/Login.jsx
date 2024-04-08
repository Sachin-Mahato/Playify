import {loginWithSpotify} from "../utils/Spotify"
const Login = () => {
  const handleLogin = async () => {
    await loginWithSpotify()
  };
  return (
    <div>
      <button
        onClick={handleLogin}
        className="bg-green-600 outline-none text-gray-100 text-xl outline py-2 px-4 rounded-md"
      >
        Login with Spotify
      </button>
    </div>
  );
};

export default Login;
