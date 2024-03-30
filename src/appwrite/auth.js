import { Client, Account } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async login() {
    try {
      this.account.createOAuth2Session(
        "spotify",
        "http://localhost:5173",
        "https://localhost:5173/fail",
        [
          "user-library-read",
          "user-read-playback-state",
          "streaming",
          "playlist-modify-public",
        ]
      );
      console.log("successful")
    } catch (e) {
      console.error(e);
    }
  }

  async logout() {
    this.account.deleteSession("current");
  }
}

const authService = new AuthService();
export default authService;
