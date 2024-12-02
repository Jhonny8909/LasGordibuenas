import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"
import { auth } from "./appconfig.js";

    const emailxd = document.querySelector("#recuperarContra");
    const email = document.getElementById('Email');

      emailxd.addEventListener('submit', async (e)=> {
      (e).preventDefault();

    try {
      
        const credentials = await sendPasswordResetEmail(auth, email.value)
        console.log(credentials)
        alert("Email enviado")

        const modal = bootstrap.Modal.getInstance(document.querySelector('#Recuperacion'));
        modal.hide();

      
    } catch (error) {
      console.log(error.code)
      console.log(error.message)

      if (error.code === 'auth/invalid-email'){
      alert("El correo no existe", "error")
    }
    }
});
