const CheckLogout = document.querySelectorAll('.logged-out')
const CheckLogin = document.querySelectorAll('.logged-in')

console.log(CheckLogin)
console.log(CheckLogout)

export const CheckUsuario = user => {
    
    if (user) {
        CheckLogout.forEach(link => link.style.display = 'none')
        CheckLogin.forEach(link => link.style.display = 'block') 
    }
    else{
        CheckLogout.forEach(link => link.style.display = 'block')
        CheckLogin.forEach(link => link.style.display = 'none')
    }
    }