import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"
import { auth } from "./appconfig.js"

console.log("Hello World");

const signUpForm = document.querySelector("#signup-form");
console.log(signUpForm)

signUpForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = signUpForm['Nombre'].value;
  const password = signUpForm['Contraseña'].value;

  console.log(email,password)

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    console.log(userCredential)

    const signupModal = document.querySelector('#signupModal')
    const modal = bootstrap.Modal.getInstance(signupModal)
    modal.hide()

    Mensajes("Bienvenido" + userCredential.user.email)

    cambio();
 
  } catch (error) {
    console.log(error.code)
    console.log(error.message)

    if (error.code === 'auth/email-already-in-use'){
      alert("Email ya en uso")
    }
    else if (error.code === 'auth/invalid-email'){
      alert("Correo Invalido")
    } 
    else if (error.code === 'auth/weak-password'){
      alert("Contraseña muy debil")
      }
      else if (error.code){
      alert("Algo salio mal")
      }
    }
});
