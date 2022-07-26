import axios, { Axios, AxiosResponse } from 'axios'
import { response } from 'express'
import config from '../config.json'
import api from '../http'
import { AuthResponse } from '../models/AuthResponse'


export default class UserService {
    static fetchUsers() {
        return api.get('/users')
    }

}