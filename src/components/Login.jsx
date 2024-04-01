import axios from "axios"
import { useState } from "react"

const Login = () => {
  const [access, setAccess] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)

async function getData() {
  try {
    const response = await axios.get("/login");
    const authorizeUrl = response.data.authorizeUrl;
    window.location.href = authorizeUrl;
    setAccess(response.data)
    console.log(access)
  } catch (error) {
    console.error(error);
  }
}

const toggle = () => {
  setIsLoggedIn((prevLogin) => !prevLogin)
  setAccess({})
}



  return (
    <div >{isLoggedIn ?  (<button onClick={toggle}>logout</button>) :  ( <button onClick={getData} className="bg-green-600 outline-none text-gray-100 text-xl outline py-2 px-4">Login with spotify</button> ) }</div>
  )
}

export default Login
