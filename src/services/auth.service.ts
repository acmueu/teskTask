import axios, { Axios, AxiosResponse } from 'axios'
import { response } from 'express'
import config from '../config.json'
import api from '../http'
import { AuthResponse } from '../models/AuthResponse'


export default class AuthService {
    static async signIn(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>('/signin', { login, password })

    }
    static async signUp(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>('/signup', { login, password })

    }
    static async logout(): Promise<void> {
        return api.post('/logout')

    }

}