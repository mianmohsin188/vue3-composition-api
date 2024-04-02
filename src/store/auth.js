import {defineStore} from "pinia";
import axios from "axios";
import { useRouter } from 'vue-router';
import {ref} from "vue";
import Swal from "sweetalert2";

const router = useRouter();
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
        error: null,
    }),
    actions: {
        setUser(user) {
            this.user= user
        },
        setToken(token){
            this.token= token
        },
        setError(error){
            this.error= error
        },

   async login(form){
            try{
                let loginUrl = import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_AUTH_URL;
                const response = await axios.post(loginUrl, form);

                const {  token } = response.data;
                const { user } = response.data;


            this.token = token;
            this.user=response.data;
                localStorage.setItem('token',this.token)
                localStorage.setItem('user',JSON.stringify(this.user))
                this.error = null;
                return { user, token };
            }
            catch (error) {
                if(error?.code=="ERR_NETWORK"){
                    Swal.fire("Network Error", "Please Check your Internet Connection", "error");
                }
                else {
                    this.error = error.response.data.message;
                    throw error;
                }


            }






        },

        redirectToDashboard(){
            this.router.push('/');
        },
        logout(){
            this.user = null;
            this.token = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            this.router.push({ name: 'login' });
        },


    }
})