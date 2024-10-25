//Imports
import {auth,create_user_with_email_and_password} from "./init_firebase.js";
import {set} from "./database.js";

//Create account button
const create = document.getElementById('btn_valider');
create.addEventListener('click', create_account);

//Function
function create_account(){
    //Get user values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmerPassword = document.getElementById("confirmer_password").value;
    const nom  = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const rue = document.getElementById("rue").value;
    const ville = document.getElementById("ville").value;
    const codePostal = document.getElementById("code_postal").value;
    const tel = document.getElementById("numero_de_tel").value;
    
    //Check if passwords match
    if(password !== confirmerPassword) {
        alert("The passwords do not match !");
        return;
    }

    //Create account
    create_user_with_email_and_password(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        console.log("Account created ");
        alert("Account created  !");
        //Create user data
        var localId = userCredential.user.reloadUserInfo.localId;
        var data = {
            "nom":nom,
            "prenom":prenom,
            "username":nom+" "+prenom,
            "rue":rue,
            "ville":ville,
            "codePostal":codePostal,
            "tel":tel,
            "created_bids":{"null":"null"},
            "bidding":{"null":"null"}
        };
        
        //Set user data
        set('users/'+localId, data);

        //Redirect to login page
        document.location.href = "./login.html";
        
    })
    .catch((error) => {
        console.log(error);
    });
};


