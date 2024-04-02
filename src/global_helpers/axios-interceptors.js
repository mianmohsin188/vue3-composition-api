import axios from "axios";
import router from '../routes.js';
import {useAuthStore} from '../store/auth.js';

// Add a request interceptor
axios.interceptors.request.use(
    (config) => {
        // Modify request config before sending
        // For example, add headers, authentication token, etc.
        if (config.url==='/login')
        {
            return config
        }
        if(config.url==='/register')
        {
            return config
        }


        if( useAuthStore().token  && localStorage.getItem('token')) {
            config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

        }
         else{
            router.push({ name: 'login' });
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    (response) => {
        // Handle successful response
        return response;
    },
    (error) => {
        // Handle response error
        return Promise.reject(error);
    }
);

export default axios;