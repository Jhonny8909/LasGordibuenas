const $lista = document.querySelector(".carrito")
const $total = document.querySelector(".total")
const $btn_limpiar = document.querySelector(".btn_limpiar")

let carrito_lista = JSON.parse(window.localStorage.getItem("carrito_lista"));
let total = 0;

console.log(carrito_lista)

if(carrito_lista[0] == null){
    VerCArrito();
}else{
    carrito_lista.forEach(VerCArrito);
}

function VerCArrito(item){
    if(item == null){
        $lista.innerHTML = `<li><b>No hay items en el carrito</b></li>`
        $total.innerHTML = `<b>TOTAL: $0</b>`
    }else{
        total += item.Price.replace(/^\D+/g, '')* item.Quantity;
        $lista.innerHTML += `<li><div class="container text-center">
        <div class="row align-items-center">
            <div class="col">
                <img src="${item.Image}">
            </div>
            <div class="col">
                <p class = "carrito_text">${item.Name}</p>
            </div>
            <div class="col">
                <p class = "carrito_text number">x${item.Quantity}</p>
            </div>
        </div></li>`

        $total.innerHTML = `<b>TOTAL: $${total}</b>`
    }
    console.log(total)
}

function LimpiarCarrito(){
    carrito_lista = [];
    console.log(carrito_lista);
    window.localStorage.setItem("carrito_lista",JSON.stringify(carrito_lista));
    VerCArrito();
}