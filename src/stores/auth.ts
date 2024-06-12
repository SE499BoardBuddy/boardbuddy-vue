import { defineStore } from 'pinia'
import axios from 'axios'
import type { User } from "@/type";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_FLASK_URL,

    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null as string | null,
        user: null as User | null,
        login_state: null as boolean | null,
        mock: [
            {
                id: 0,
                email: 'admin@admin',
                username: 'admin',
                password: 'admin',
                roles: 'ROLE_ADMIN',
                public_id: '123',
                collections: []
            },
            {
                id: 1,
                email: 'user_user@cmu.ac.th',
                username: 'InsertUsernameHere',
                password: '1234',
                roles: 'ROLE_USER',
                public_id: '123',
                collections: []
            },
            {
                id: 2,
                email: 'hello@cmu.ac.th',
                username: 'helloName',
                password: '1234',
                roles: 'ROLE_USER',
                public_id: '123',
                collections: []
            },
        ]
    }),
    getters: {
        currentUserName(): string {
            return this.user?.roles == 'ROLE_ADMIN' ? 'ADMIN' : this.user?.username || ''
        },
        isLoggedIn(): boolean {
            return this.token !== null && this.user !== null
        },
        isAdmin(): boolean {
            let boolToReturn = false
            if (this.user != null) {
                boolToReturn = this.user.roles == 'ROLE_ADMIN'
            }
            return boolToReturn
        }
    },
    actions: {
        fake_login(email: string, password: string) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    let isFound = false;
                    for (let index = 0; index < this.mock.length; index++) {
                        const user = this.mock[index];
                        if (email.match(user.email) && password.match(user.password)) {
                            this.token = Math.floor(Math.random() * 100) + ''
                            this.user = user
                            this.login_state = true
                            localStorage.setItem('access_token', this.token as string)
                            localStorage.setItem('user', JSON.stringify(this.user))
                            isFound = true
                        }
                    }
                    if (isFound) {
                        resolve('success')
                    } else {
                        reject('fail')
                    }
                }, 300);
            })

        },
        fake_register(email: string, username: string, password: string) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    let newEmail = true;
                    for (let index = 0; index < this.mock.length; index++) {
                        const user = this.mock[index];
                        if (email.match(user.email)) {
                            newEmail = false
                        }
                    }
                    if (newEmail) {
                        const accountToAdd = {
                            id: 99,
                            email: email,
                            username: username,
                            password: password,
                            roles: 'ROLE_USER',
                            public_id: '123',
                            collections: []
                        }
                        this.mock.push(accountToAdd)
                        this.token = Math.floor(Math.random() * 100) + ''
                        this.user = accountToAdd
                        this.login_state = true
                        localStorage.setItem('access_token', this.token as string)
                        localStorage.setItem('user', JSON.stringify(this.user))
                        resolve('success')
                    } else {
                        reject('fail')
                    }
                }, 300);
            })

        },
        login(email: string, password: string) {
            console.log("login")
            return apiClient
                .post('/login', {
                    email: email,
                    password: password
                })
                .then((response) => {
                    this.token = response.data.access_token
                    this.user = response.data.user
                    this.login_state = true
                    localStorage.setItem('access_token', this.token as string)
                    localStorage.setItem('user', JSON.stringify(this.user))
                    axios.defaults.headers.common['x-access-token'] = `${this.token}`
                    console.log(response)
                    return response
                })
        },
        register(email: string, password: string, username: string) {
            return apiClient
                .post('/signup', {
                    email: email,
                    password: password,
                    username: username
                })
                .then((response) => {
                    this.token = response.data.access_token
                    this.user = response.data.user
                    this.login_state = true
                    localStorage.setItem('access_token', this.token as string)
                    localStorage.setItem('user', JSON.stringify(this.user))
                    axios.defaults.headers.common['x-access-token'] = `${this.token}`
                    console.log(response)
                    return response

                })
        },
        logout() {
            console.log('logout')
            this.token = null
            this.user = null
            this.login_state = false
            localStorage.removeItem('access_token')
            localStorage.removeItem('user')
        },
        reload(token: string, user: User) {
            console.log("reload")
            this.token = token
            this.user = user
        }
    }
})

