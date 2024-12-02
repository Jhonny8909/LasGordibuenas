console.log("Buenasass");
import {GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"
import {auth} from "./appconfig.js"

    const googleButton = document.querySelector('#googleLogIn')

    googleButton.addEventListener('click', async () =>{
        console.log("holaaasa")
        
        const google = new GoogleAuthProvider()
        console.log("Hola");

        try {
            const credentials = await signInWithPopup(auth, google)
            console.log(credentials)

            const modal = bootstrap.Modal.getInstance(document.querySelector('#signinModal'));
            modal.hide();

            alert("Bienvenido " + credentials.user.displayName)

        } catch (error) {
            console.log(error)
        }
    })
