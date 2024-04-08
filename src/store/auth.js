import {defineStore} from "pinia";
import axios from "axios";
import { useRouter } from 'vue-router';
import {ref} from "vue";
import Swal from "sweetalert2";
import {createUserWithEmailAndPassword,getAuth,updateProfile,signInWithEmailAndPassword} from "firebase/auth";


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
          /*  try{
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


            }*/
       try {
           const userCredential = await signInWithEmailAndPassword(getAuth(),form.email, form.password);
           console.log(userCredential)
           if(userCredential.user){
               this.setUser(JSON.stringify(userCredential.user))
               this.setToken(userCredential.user.accessToken)
               localStorage.setItem('user',JSON.stringify(userCredential.user))
               localStorage.setItem('token',this.token)
               this.error = null;
           }

       }
       catch (error) {
           // Handle registration errors
           throw error

       }

        },
   async register(form){
            try {
                const userCredential = await createUserWithEmailAndPassword(getAuth(),form.email, form.password);
                // User registration successful
                await updateProfile(userCredential.user, {
                    displayName: form.displayName, // Set displayName from form data
                  //  photoURL: form.photoURL // Set photoURL from form data
                });
                console.log(userCredential)
                if(userCredential.user){
                    this.setUser(JSON.stringify(userCredential.user))
                    this.setToken(userCredential.user.accessToken)
                    localStorage.setItem('user',JSON.stringify(userCredential.user))
                    localStorage.setItem('token',this.token)
                    this.error = null;
                }

            }
            catch (error) {
                // Handle registration errors
                throw error

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
            localStorage.removeItem('lastVisitedRoute')
            this.router.push({ name: 'login' });
        },


    }
})