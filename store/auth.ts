import { defineStore } from 'pinia'
import { getExpiry } from '@/utils'

interface FormInterface {
    username: string;
    password: string;
    longSession?: boolean;
}

interface UserPayLoadInterface {
    username: string;
    password: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        loading: false,
        user: null,
    }),
    actions: {
        async loginUser({ username, password, longSession }: FormInterface) {
            this.loading = true;

            const body: UserPayLoadInterface = {
                username,
                password,
            };

            // if (longSession)
            //     body['expiresInMins'] = 525960; // TODO: 1 Year

            const { data, error }: any = await useFetch('/api/user/login', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body
            })

            this.loading = false;

            if (error?.value?.data?.message){
                return error.value.data.message
            }
            else if (data?.value?.token) {
                

                const token = useCookie('token', longSession ? {
                    expires: getExpiry(1, 'year')
                } : undefined);
                token.value = data.value.token;
                this.authenticated = true;
            }
        },
        async addUser({ username, password }: FormInterface) {
            this.loading = true;
        },
        async logoutUser () {
            const token = useCookie('token');

            await useFetch('/api/user/logout', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': <string>token.value
                }
            })

            this.authenticated = false;
            token.value = null;
        }
    }
})