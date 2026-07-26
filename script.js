// ==========================
// المنتجات
// ==========================

let products = [

{
id:1,
name:"ساعة فاخرة",
category:"إكسسوارات",
price:4500,
image:"https://via.placeholder.com/400"
},

{
id:2,
name:"هاتف ذكي",
category:"إلكترونيات",
price:35000,
image:"https://via.placeholder.com/400"
},

{
id:3,
name:"عطر فاخر",
category:"عطور",
price:6000,
image:"https://via.placeholder.com/400"
},

{
id:4,
name:"قميص أنيق",
category:"ملابس",
price:3000,
image:"https://via.placeholder.com/400"
}

];





// ==========================
// السلة
// ==========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];






// عرض المنتجات

function displayProducts(list = products){


let container =
document.getElementById("products-list");


container.innerHTML="";



list.forEach(product=>{


container.innerHTML += `


<div class="product">


<img src="${product.image}">


<h3>${product.name}</h3>


<p>
${product.category}
</p>


<div class="price">

${product.price} دج

</div>


<button onclick="addToCart(${product.id})">

أضف للسلة 🛒

</button>


</div>


`;


});


}




displayProducts();








// ==========================
// إضافة للسلة
// ==========================


function addToCart(id){


let product =
products.find(p=>p.id===id);



let exist =
cart.find(item=>item.id===id);



if(exist){

exist.qty++;

}

else{


cart.push({

...product,

qty:1

});


}



saveCart();

updateCart();


}








// ==========================
// تحديث السلة
// ==========================

function updateCart(){


let box =
document.getElementById("cart-items");


box.innerHTML="";


let total=0;



cart.forEach((item,index)=>{


total += item.price * item.qty;



box.innerHTML += `


<div>


<b>${item.name}</b>


<br>


${item.price} دج


<br>


<button onclick="changeQty(${index},-1)">
-
</button>


${item.qty}


<button onclick="changeQty(${index},1)">
+
</button>


<br>


<button onclick="removeItem(${index})">

حذف

</button>


</div>


`;



});



document.getElementById("total").innerHTML =
total;



document.getElementById("cart-count").innerHTML =
cart.reduce((a,b)=>a+b.qty,0);



}





// تغيير الكمية

function changeQty(index,value){


cart[index].qty += value;



if(cart[index].qty <=0){

cart.splice(index,1);

}



saveCart();

updateCart();


}





// حذف

function removeItem(index){


cart.splice(index,1);


saveCart();

updateCart();


}







// حفظ السلة

function saveCart(){

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

}








// ==========================
// فتح وإغلاق السلة
// ==========================


function openCart(){


document.getElementById("cart")
.classList.add("active");


document.getElementById("overlay")
.classList.add("show");


}



function closeCart(){


document.getElementById("cart")
.classList.remove("active");


document.getElementById("overlay")
.classList.remove("show");


}





updateCart();







// ==========================
// البحث
// ==========================


function searchProducts(){


let value =
document.getElementById("search")
.value.toLowerCase();



let result =
products.filter(product=>

product.name.toLowerCase()
.includes(value)

);



displayProducts(result);


}








// ==========================
// الوضع الليلي
// ==========================


function toggleMode(){


document.body.classList.toggle("dark");


}








// ==========================
// واتساب
// ==========================


function sendWhatsApp(){



if(cart.length===0){

alert("السلة فارغة");

return;

}



let name =
document.getElementById("customer-name").value;



let address =
document.getElementById("customer-address").value;



let message =

"🛒 طلب جديد من Premium Store\n\n";


message +=

"👤 الاسم: "
+ name
+"\n";


message +=

"📍 العنوان: "
+ address
+"\n\n";


message +=

"📦 المنتجات:\n";



let total=0;



cart.forEach(item=>{


message +=

"- "
+ item.name
+" × "
+ item.qty
+" = "
+ (item.price*item.qty)
+" دج\n";


total += item.price*item.qty;


});



message +=

"\n💰 المجموع: "
+ total
+" دج";





let phone =
"213778196483";



let url =

"https://wa.me/"
+phone+
"?text="
+encodeURIComponent(message);



window.open(url,"_blank");



}