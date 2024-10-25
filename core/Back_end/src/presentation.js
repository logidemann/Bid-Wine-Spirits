import {auth, sign_in_with_email_and_password} from "./init_firebase.js";
import {read} from "./database.js";

function connect_user(){
    if(localStorage.getItem("stay_logged") != null && localStorage.getItem("stay_logged")){
        login();
    }
}

function login(){
    //Get user values
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    
    sign_in_with_email_and_password(auth, email, password)
    .then((userCredential) => {
        
        // Login success
        localStorage.setItem("uid", userCredential.user.reloadUserInfo.localId);
        read('users/'+userCredential.user.reloadUserInfo.localId)
        .then((data) => {

            //Get username success
            //Set username in local storage
            localStorage.setItem('username', data.username);
            //Redirect to acceuil page
            document.location.href = "./home.html";
        }) .catch((error) => {
            //Get username error
            console.log(error);
        });
    })
    .catch((error) => {
        // Login error
        console.log(error);
    }); 
}

connect_user()