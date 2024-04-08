<template>
  <div>
    <body class="app app-login p-0">
    <div class="row g-0 app-auth-wrapper">
      <div class="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5">
        <div class="d-flex flex-column align-content-end">
          <div class="app-auth-body mx-auto">
            <div class="app-auth-branding mb-4"><a class="app-logo" href="index.html"><img class="logo-icon me-2" :src="logo" alt="logo"></a></div>
            <h2 class="auth-heading text-center mb-5">Register to Portal</h2>
            <div class="auth-form-container text-start">
              <div class="auth-form login-form">
                <div class="email mb-3">
                  <label class="sr-only" for="signin-email">Display Name</label>
                  <input id="signin-email" name="signin-email" v-model.trim="form.displayName" type="text"  class="form-control signin-email" placeholder="Enter Display name" required="required">
                  <span v-if="validations?.displayName" class="text-danger">{{validations?.displayName}}</span>
                </div>
                <div class="email mb-3">
                  <label class="sr-only" for="signin-email">Email</label>
                  <input id="signin-email" name="signin-email" v-model.trim="form.email" type="email" @input="validateEmail" class="form-control signin-email" placeholder="Enter Email" required="required">
                  <span v-if="validations?.email" class="text-danger">{{validations?.email}}</span>
                </div><!--//form-group-->
                <div class="password mb-3">
                  <label class="sr-only" for="signin-password">Password</label>
                  <input id="signin-password" name="signin-password" type="password" v-model.trim="form.password" class="form-control signin-password" placeholder="Password" required="required">
                  <span v-if="validations?.password" class="text-danger">{{validations?.password}}</span>
                  <div class="extra mt-3 row justify-content-between">

                  </div><!--//extra-->
                </div>
                <div class="password mb-3">
                  <label class="sr-only" for="signin-password">Password</label>
                  <input id="signin-password" name="signin-password" type="password" v-model.trim="confirm_password" class="form-control signin-password" placeholder="Enter Confirm Password" required="required">
                  <span v-if="validations?.confirm_password" class="text-danger">{{validations?.confirm_password}}</span>
                  <div class="extra mt-3 row justify-content-between">

                  </div><!--//extra-->
                </div>
                <div class="text-center">
                  <button type="button" @click="register()" class="btn app-btn-primary w-100 theme-btn mx-auto">Sign Up</button>
                </div>
                <div class="text-center mt-2">
                  <RouterLink to="/login">Login</RouterLink>
                </div>
              </div>



              <!--            <div class="auth-option text-center pt-5">No Account? Sign up <a class="text-link" href="signup.html" >here</a>.</div>-->
            </div><!--//auth-form-container-->

          </div><!--//auth-body-->

          <footer class="app-auth-footer">
            <div class="container text-center py-3">
              <small class="copyright">Designed with <span class="sr-only">love</span><i class="fas fa-heart" style="color: #fb866a;"></i> by <a class="app-link" href="https://www.linkedin.com/in/mohsin-javaid-42b675111/" target="_blank">Mohsin Javaid</a></small>

            </div>
          </footer><!--//app-auth-footer-->
        </div><!--//flex-column-->
      </div><!--//auth-main-col-->
      <div class="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
        <div class="auth-background-holder">
        </div>
        <div class="auth-background-mask"></div>
        <div class="auth-background-overlay p-3 p-lg-5">
          <div class="d-flex flex-column align-content-end h-100">
            <!--          <div class="h-100"></div>
                      <div class="overlay-content p-3 p-lg-4 rounded">
                        <h5 class="mb-3 overlay-title">Explore Portal Admin Template</h5>
                        <div>Portal is a free Bootstrap 5 admin dashboard template. You can download and view the template license <a href="https://themes.3rdwavemedia.com/bootstrap-templates/admin-dashboard/portal-free-bootstrap-admin-dashboard-template-for-developers/">here</a>.</div>
                      </div>-->
          </div>
        </div><!--//auth-background-overlay-->
      </div><!--//auth-background-col-->

    </div><!--//row-->


    </body>
  </div>
</template>
<script setup>
import { ref,reactive,watch } from 'vue'
import logo from "../../assets/theme_assets/images/app-logo.svg";
import axios from "axios";
import {useRouter} from "vue-router";
import {useAuthStore} from "../../store/auth.js"
import Swal from "sweetalert2";
import {createUserWithEmailAndPassword,getAuth} from "firebase/auth";
const router = useRouter();
const form = reactive({
  email: ref(''),
  password: ref(''),
  displayName:ref('')
})
const confirm_password = ref('')
const validations = ref({})
const title = ref('Register');
const authStore = useAuthStore();
const auth = getAuth();
document.title = title.value

const register = async () => {
  validations.value = {}
  if(form.displayName==''){
    validations.value.displayName = 'Display Name is required'
  }
  if(form.email==''){
    validations.value.email = 'Email is required'
  }

  if(form.password==''){
    validations.value.password = 'Password is required'
  }
  if(confirm_password.value==''){
    validations.value.confirm_password = 'Confirm Password is required'
  }

  if(form.password!=confirm_password.value){
    validations.value.confirm_password = 'Password and Confirm Password must be same'
  }
 if(form.email!=''){
   validateEmail();
 }

  if(!Object.keys(validations.value).length){

    try {
      await authStore.register(form);
      router.push('/');
    }
    catch(error) {
      if (error.code === 'auth/email-already-in-use') {
        //  Swal.fire('Error', 'The email address is already in use by another account.', 'error');
        validations.value.email = 'The email address is not available.'
      } else if (error.code === 'auth/invalid-email') {
        //   Swal.fire('Error', 'The email address is not valid.', 'error');
        validations.value.email ='No Record found against these credentials'
      }else if(error.code =='auth/invalid-credential'){
        validations.value.email='No Record found against these credentials'
      }
      else {
        //  Swal.fire('Error', 'An error occurred during registration.', 'error');
        validations.value.email = error.message
      }

    }

    /*try {
      const userCredential = await createUserWithEmailAndPassword(auth,form.email, form.password);
      // User registration successful
      console.log(userCredential)
      if(userCredential.user){
        authStore.setUser(userCredential.user)
        router.push('/');
      }

    }
    catch (error) {
      // Handle registration errors
      console.log(error)

      Swal.fire("Error",error?.message,'error')
      return false;
    }*/
  }
  else {
    return false;
  }

}
const validateEmail=()=> {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 let isValidEmail = regex.test(form.email);
 if (!isValidEmail){
   validations.value.email = 'Enter valid email'
   return false
 }
 else{
   delete validations.value.email

 }
}




</script>