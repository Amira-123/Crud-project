
/*1-  كله input   امسك ال */
var productNameInput=document.getElementById("productNameInput");
var productPriceInput=document.getElementById("productPriceInput");
var productCategoryInput=document.getElementById("productCategoryInput");
var productDescInput=document.getElementById("productdescInput");
var submitBtn=document.getElementById("submitBtn")
var searchInput=document.getElementById("searchInput");
var productNameAlert=document.getElementById("productNameAlert");
var currentIndex;


/*2-input همسك ال هيكتب جوه      */
var productList=[]; /* array out of fun */

function addProduct()
{
    var product=
    {
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        desc:productDescInput.value,
    }
//  console.log(product);
    productList.push(product);
    localStorage.setItem("ourproducts",JSON.stringify(productList));
    displayProduct(productList);
    productNameInput.classList.remove("is-valid")
    clearForm()
 // console.log(productList);
}
submitBtn.onclick=function()
{
    if (submitBtn.innerHTML=="add product"){
        addProduct();
    }
    else{
        updateProduct();
    }
}  
/*3- fill data in table (dispaly data) */
function displayProduct(anyArray)
{
var cartoona="";
for(var i=0; i<anyArray.length;i++){
    cartoona+=`<tr>
                   <td>${i}</td>
                   <td> ${anyArray[i].name}</td>
                   <td> ${anyArray[i].price}</td>
                   <td> ${anyArray[i].category}</td>
                   <td>${anyArray[i].desc}</td>
                   <td> <button onclick="getProData(${i})" class="btn btn-warning"> update</button></td>
                   <td> <button onclick="deleteProduct(${i})"class="btn btn-danger"> delete</button></td>
                </tr>`
}
document.getElementById("tableBody").innerHTML=cartoona;
}
/*4- clear form after addproduct */
function clearForm()
    {
       productNameInput.value="";
        productPriceInput.value="";
      productCategoryInput.value="";
        productDescInput.value="";
    }
/*5- return data from localstorage */    
if(localStorage.getItem("ourproducts")==null)  
{
    productList=[];

} 
else
{
 productList=JSON.parse(localStorage.getItem("ourproducts"));
 displayProduct(productList)
} 
/*6- delete by clickon (delete button) */
function deleteProduct(index)
{
    productList.splice(index,1);
    localStorage.setItem("ourproducts",JSON.stringify( productList));
    displayProduct(productList);
}
/*7-search */
function searchProduct()
{
    var term = searchInput.value;
    var wantedProducts=[];

    for(var i=0; i<productList.length;i++)
    {
        if(productList[i].name.toLowerCase().includes(term.toLowerCase()))
        {
        wantedProducts.push(productList[i]);
        }
    }
    displayProduct(wantedProducts);
   
}
searchProduct();
/* 8- make validation */

function validateproductName(productName)
{
    var regex =/^[A-Z][a-z]{3,6}$/;
    if(regex.test(productName) == true)
    {
        productNameAlert.classList.replace("d-block","d-none")
        productNameInput.classList.remove("is-invalid")
        productNameInput.classList.add("is-valid")
    }
    else{
        productNameInput.classList.add("is-invalid")
        productNameInput.classList.remove("is-valid")
        productNameAlert.classList.replace("d-none","d-block")
    }
}
productNameInput.addEventListener("keyup",function(){
    validateproductName(productNameInput.value)
})

function getProData(index){
  var currentProduct = productList[index];
  productNameInput.value=currentProduct.name;
  productPriceInput.value=currentProduct.price;
  productCategoryInput.value=currentProduct.category;
  productDescInput.value=currentProduct.desc;
  submitBtn.innerHTML="update product";
  currentIndex=index;
}

 function updateProduct()
 {
     //console.log("hello")
     var product=
     {
         name:productNameInput.value,
         price:productPriceInput.value,
         category:productCategoryInput.value,
         desc:productDescInput.value,
     }
     productList[currentIndex]=product;
     localStorage.setItem("ourproducts",JSON.stringify( productList));
     displayProduct(productList);
     submitBtn.innerHTML="add product";
     clearForm();
 }

