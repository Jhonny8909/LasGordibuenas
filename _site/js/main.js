import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"
import { auth } from "./appconfig.js"
import {CheckUsuario} from "./CheckUsuario.js"

import "./registrarse.js"
import "./logout.js"
import "./auth-email.js"


onAuthStateChanged(auth, async (user) => {
    CheckUsuario(user)
})

