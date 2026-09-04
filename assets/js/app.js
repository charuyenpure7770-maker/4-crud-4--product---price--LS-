const cl = console.log;
const info = document.getElementById("info");
const form = document.getElementById("form");
const productControl = document.getElementById("product");
const priceControl = document.getElementById("price");
const submit = document.getElementById("submit");
const update = document.getElementById("update");
const h1 = document.getElementById("h1");
const h2 = document.getElementById("h2");



//database
// let productArr = [
//     {
//         id: "123",
//         productName: "iPhone15",
//         price: 50000
//     },
//     {
//         id: "124",
//         productName: "ipad",
//         price: 80000
//     }
// ];
// let prodArr = localStorage.setItem("productArr",JSON.stringify(productArr));

let productArr = JSON.parse(localStorage.getItem("productArr")) ||[];
cl(productArr);

function showUi(arr){
    let result = ``;
    arr.forEach((ele ,i)=> {
        result+= `          <tr id="${ele.id}">
                                <td>${i+1}</td>
                                <td>${ele.productName}</td>
                                <td>${ele.price}</td>
                                <td><i onclick="onEdit(this)" class="fa-solid fa-pen fa-2x text-primary"  role="button"></i></td>
                                <td><i onclick="onRemove(this)" class="fa-solid fa-trash-can fa-2x text-danger" role="button"></i></td>
                            </tr>
        `    
    });
    info.innerHTML = result;
}
showUi(productArr);


function createTr(obj){
    let tr = document.createElement("tr");
    tr.id = obj.id;
    tr.innerHTML = `
                                <td>${obj.SrNo}</td>
                                <td>${obj.productName}</td>
                                <td>${obj.price}</td>
                                <td><i onclick="onEdit(this)" class="fa-solid fa-pen fa-2x text-primary"  role="button"></i></td>
                                <td><i onclick="onRemove(this)" class="fa-solid fa-trash-can fa-2x text-danger" role="button"></i></td>
    
    `
    info.append(tr);
    Swal.fire({
        title:"Added",
        text:"your todo is added successfully!!",
        icon:"success",
        timer:2500
    })
}
//edit
function onEdit(ele){
    let EDIT_ID  = ele.closest("tr").id;
    let EDIT_OBJ = productArr.find(t=> t.id === EDIT_ID);
          productControl.value=EDIT_OBJ.productName;
         priceControl.value = EDIT_OBJ.price;
         submit.classList.add('d-none')
         update.classList.remove('d-none')
         h1.classList.add('d-none')
         h2.classList.remove('d-none')
        localStorage.setItem("EDIT_ID",EDIT_ID);
}
//update 
function onUpdate(eve){
    let UPDATE_ID = localStorage.getItem("EDIT_ID");
    let updatedObj = {
        id:crypto.UPDATE_ID,
          productName:productControl.value,
          price: priceControl.value
    }
    let index = productArr.findIndex(obj=> obj.id === UPDATE_ID);
    productArr[index] = updatedObj;
    let td = document.getElementById(UPDATE_ID).children;
   td[1].innerText = productControl.value;
   td[2].innerText =  priceControl.value;
    submit.classList.remove('d-none')
    update.classList.add('d-none')
    h1.classList.remove('d-none')
    h2.classList.add('d-none')
     Swal.fire({
        title:"updated!!",
        text:"your todo is updated successfully!!",
        icon:"success",
        timer:2500
    })
}
//remove
function onRemove(ele){
   let confirmation = confirm("are you sure to remove this todo ??");
   if(confirmation){
     let REMOVE_ID = ele.closest("tr").id;
    let getIndex = productArr.findIndex(obj=> obj.id === REMOVE_ID);
    productArr.splice(getIndex,1);
    ele.closest("tr").remove();
    localStorage.setItem("productArr",JSON.stringify(productArr));
   let td = [...document.querySelectorAll("#info tr td:first-child")]
   td.forEach((ele,i)=>{
      ele.innerText = i + 1
   })

    Swal.fire({
        title:"removed",
        text:"your todo is removed successfully!!",
        icon:"success",
        timer:2500
    })
   }
}
function onAddProduct(eve){
    eve.preventDefault();
    let obj = {
        SrNo:productArr.length+1,
        id:crypto.randomUUID(),
          productName:productControl.value,
          price: priceControl.value
    }
    productArr.push(obj);
    localStorage.setItem("productArr",JSON.stringify(productArr));
    createTr(obj);
    form.reset();
}

form.addEventListener("submit",onAddProduct);
update.addEventListener("click",onUpdate);