import axios, { Axios, AxiosError } from "axios";
import { makeObservable, makeAutoObservable } from "mobx";
import { AuthResponse } from "../models/AuthResponse";
import { UserResponse } from "../models/UserResponse";
import AuthService from "../services/auth.service";
import api, { API_URL } from "../http";
import WalletService from "../services/wallet.service";
export default class UserStore {
  userId = -1;
  _isAuth = false;
  login = "";
  password = "";
  isLoading = false;
  wallets = [];
  constructor() {
    makeAutoObservable(this);
  }
  setAuth(bool: boolean) {
    this._isAuth = bool;
  }
  setUser(userId: number) {
    this.userId = userId;
  }
  setWallets(wallets: any) {
    this.wallets = wallets;
  }
  async signIn(login: string, password: string) {
    try {
      const response = await AuthService.signIn(login, password);

      console.log(response.status);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.userId);
    } catch (error) {
      return error as AxiosError
    }
  }
  async signUp(login: string, password: string) {
    try {
      const response = await AuthService.signUp(login, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.userId);

    } catch (error) {
      return error as AxiosError
    }
  }
  async logout() {
    try {
      const response = await AuthService.logout();
      console.log(response);
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser(-1);
    } catch (error) {}
  }
  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await api.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      console.log("check auth", response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.userId);
    } catch (error) {
    } finally {
      this.setLoading(false);
    }
  }
  get isAuth() {
    return this._isAuth;
  }
  setLoading(bool: boolean) {
    this.isLoading = bool;
  }
  async getWallets() {
    const response = await WalletService.getWallets();
    this.setWallets(response.data)
  }
}
