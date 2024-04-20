import { useState } from "react";
import { Login, Dashboard } from "./components/index";
import { useEffect } from "react";
import { getToken } from "./utils/auth";
// On page load, try to fetch auth code from current browser search URL
const args = new URLSearchParams(window.location.search);
const code = args.get("code");

export default function App() {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    async function token() {
      if (code) {
        setAccessToken(await getToken(code));
        window.history.replaceState({}, "", "http://localhost:5173");
      }
    }
    token()
  }, [code]);

  async function search(query = "shakira") {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=artist`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.log(
          "Error in fetching data",
          response.status,
          response.statusText
        );
      }
    } catch (err) {
      console.error("error in fetching data", err);
    }
  }

  return (
    <main className="grid place-content-center h-[100vh]">
      {code ? <Dashboard search={search} /> : <Login />}
    </main>
  );
}
