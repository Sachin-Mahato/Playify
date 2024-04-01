import express from 'express';
import session from 'express-session'; 
import crypto from 'crypto';
import axios from 'axios';
import querystring from "querystring"
import cors from 'cors'; // Import the cors middleware
import dotenv from "dotenv";
dotenv.config();

const client_id = process.env.client_id;
const redirect_uri = "http://localhost:8888/callback";
const client_secret = process.env.client_secret;

const app = express();
const port = 8888;

app.use(cors());


const generateSessionSecret = () => {
  const buffer = crypto.randomBytes(32);
  const secret = buffer.toString('hex');
  return secret;
};

const sessionSecret = generateSessionSecret();

const generateRandomString = (length) => {
  return crypto.randomBytes(60).toString("hex").slice(0, length);
};

const storeStateInSession = (req, state) => {
  req.session.state = state;
};

const retrieveStateFromSession = (req) => {
  const state = req.session.state;
  delete req.session.state;
  return state;
};

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
}));

app.get("/login", (req, res) => {
  const scope = ['user-read-private', 'user-read-email'];
  const state = generateRandomString(16);
  storeStateInSession(req, state);

  const authOptions = {
    client_id: client_id,
    redirect_uri: redirect_uri,
    response_type: 'code',
    scope: scope.join(' '),
    state: state,
    show_dialog: true,
  };

  const authorizeURL = `https://accounts.spotify.com/authorize?${querystring.stringify(authOptions)}`;
  res.json({ authorizeUrl: authorizeURL });
});


const encodeBase64 = (str) => {
  return Buffer.from(str, 'binary').toString('base64');
};

const credentials = `${client_id}:${client_secret}`;
const encodedCredentials = encodeBase64(credentials);
const headers = {
  "content-type": "application/x-www-form-urlencoded",
  Authorization: `Basic ${encodedCredentials}`
};

app.get("/callback", async (req, res) => {
  const { code, state } = req.query;

  if (!state || state !== retrieveStateFromSession(req)) {
    return res.status(400).send("Invalid state parameter");
  }

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    },
    headers: headers,
    json: true,
  };

  try {
     await axios.post(authOptions.url, authOptions.form, {
      headers: authOptions.headers,
    });
    res.end()
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting access token");
  }
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});



