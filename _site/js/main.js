import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"
import { getDatabase, ref, get, child} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { auth } from "./appconfig.js"
import {CheckUsuario} from "./CheckUsuario.js"

import "./registrarse.js"
import "./logout.js"
import "./auth-email.js"
import "./auth-google.js"
import "./recuperacion.js"

const $btn_carrito = document.querySelectorAll(".carrito");

let carrito_lista = JSON.parse(window.localStorage.getItem("carrito_lista"));

console.log(carrito_lista);

onAuthStateChanged(auth, async (user) => {
    CheckUsuario(user)
})


$btn_carrito.forEach((btn) => btn.addEventListener("click", function(){

    const dbRef = ref(getDatabase());
    get(child(dbRef, `Productos/${btn.parentElement.parentElement.children[0].textContent}/Stock`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            if(snapshot.val() != 0){
                if(carrito_lista.length != 0){
                    for (let i = 0; i < carrito_lista.length; i++){
                        if(btn.parentElement.parentElement.children[0].textContent == carrito_lista[i].Name){
                            carrito_lista[i].Quantity++
                            break;
                        }
                        else if (i == carrito_lista.length - 1){
                            carrito_lista.push({"Name" : btn.parentElement.parentElement.children[0].textContent, "Price" : btn.parentElement.parentElement.children[2].children[0].textContent, "Quantity": 1, "Image" : btn.parentElement.parentElement.parentElement.children[0].children[0].src});
                            break;
                        }
                    }   
                }
                else if (carrito_lista.length == 0){
                carrito_lista.push({"Name" : btn.parentElement.parentElement.children[0].textContent, "Price" : btn.parentElement.parentElement.children[2].children[0].textContent, "Quantity": 1, "Image" : btn.parentElement.parentElement.parentElement.children[0].children[0].src});
                }
    
                window.localStorage.setItem("carrito_lista",JSON.stringify(carrito_lista)); 
            }
            else{
                alert("Producto sin stock");
            }
            
        } else {
          console.log("No data available"); 
        }
    }).catch((error) => {
        console.error(error);
    });
    
}));
