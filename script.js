let cart = [];

let products = [

{
id:1,
name:"ساعة فاخرة",
price:4500,
image:"https://via.placeholder.com/400"
},

{
id:2,
name:"عطر فاخر",
price:6000,
image:"https://via.placeholder.com/400"
},

{
id:3,
name:"هاتف ذكي",
price:35000,
image:"https://via.placeholder.com/400"
}

];



let box = document.getElementById("products-list");



function showProducts(){


box.innerHTML="";


products.forEach(product=>{


box.innerHTML += `

<div class="product">

<img src="${product.image}">

<h3>${product.name}</h3>

<p class="price">
${product.price} دج
</p>


<button onclick="addToCart(${product.id})">

أضف للسلة

</button>

</div>

`;

});


}



showProducts();





function addToCart(id){


let product =
products.find(p=>p.id===id);


cart.push(product);


updateCart();


}





function updateCart(){


let items =
document.getElementById("cart-items");


let total=0;


items.innerHTML="";


cart.forEach(product=>{


items.innerHTML += `

<div>

${product.name}

<br>

${product.price} دج

</div>

`;


total += product.price;


});



document.getElementById("total").innerHTML=total;


document.getElementById("cart-count").innerHTML=cart.length;


}





function openCart(){

document.getElementById("cart")
.classList.add("active");

}



function closeCart(){

document.getElementById("cart")
.classList.remove("active");

}






function sendWhatsApp(){


let name =
document.getElementById("customer-name").value;


let address =
document.getElementById("customer-address").value;



let text =
"🛒 طلب جديد\n\n";


text +=
"الاسم: "+name+"\n";


text +=
"العنوان: "+address+"\n\n";



cart.forEach(p=>{

text +=
"- "+p.name+" "+p.price+" دج\n";

});



window.open(

"https://wa.me/213778196483?text="
+
encodeURIComponent(text)

);


}