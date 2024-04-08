import axios from "axios";
const clientId = "b35f629f4e854f3f992a46074f7a4714";
const redirectUri = "http://localhost:5173/callback";

const scope = "user-read-private user-read-email";

const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

async function loginWithSpotify() {
  const codeVerifier = generateRandomString(64);

  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  // generated in the previous step
  window.localStorage.setItem("code_verifier", codeVerifier);

  const params = {
    response_type: "code",
    client_id: clientId,
    scope: scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
}

const getToken = async (code) => {
  // stored in the previous step
  let codeVerifier = localStorage.getItem("code_verifier");

  const payload = {
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  }


  try {
    const body = await axios.post(
      "https://accounts.spotify.com/api/token",
      payload,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const response = await body.data;
    console.log(response);

    localStorage.setItem("access_token", response.access_token);
  } catch (e) {
    console.log(e.response.data)
    console.error(e);
  }
};

async function refreshToken() {

}

export { loginWithSpotify, getToken };
