const clientId = '9359750994894d92b77cf1fc350e4953'
const redirectUri = 'http://localhost:5173/callback'
const scope = 'user-read-private user-read-email';

const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}


export   function loginWithSpotify() {
  const state = generateRandomString(16); 
  localStorage.setItem('state', state);  
  let url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(clientId);
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(redirectUri);
  url += '&state=' + encodeURIComponent(state);
  window.location = url;
  getAccessToken()
}

function getAccessToken() {
  const queryString = window.location.href().split("#")[1]
  const url = new URLSearchParams(queryString);
  localStorage.setItem('accessToken', url.get('access_token'))
}