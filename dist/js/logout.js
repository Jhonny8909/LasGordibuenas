import { signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"
import { auth } from "./appconfig.js"

const salir = document.querySelector('#Logout')

salir.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
        await signOut(auth)
    console.log("Hizo logout")
    } catch (error) {
        console.log(error)
    }    
});

