const shoppingList=document.querySelector(".shopping-list");
const shoppingForm=document.querySelector(".shopping-form");



loadItems();
shoppingForm.addEventListener("submit",handleFormSubmit);

function loadItems() {
    const items= [
        {id:1, name:"Egg", completed:false},
        {id:2 ,name:"Fish",completed:true},
        {id:3 ,name:"Milk", completed:false},
        {id:4 ,name:"Bread",completed:false},

    ];

    shoppingList.innerHTML="";

    for(let item of items) {
        const li=createListItem(item);
        shoppingList.appendChild(li);
    
        
    }
}
function addItem(input) {
    const newItem=createListItem({
        id: generateId(),
        name: input.value,
        completed: false
    });

    shoppingList.appendChild(newItem);
    input.value="";

}
function generateId() {
    return Date.now().toString();
}
function handleFormSubmit(e) {
    e.preventDefault();

    const input=document.getElementById("item_name");

    if(input.value.trim().length===0) {
        alert("Yeni bir değer giriniz!");
        return;
    }
    addItem(input);
}
 function toggleCompleted(e) {
    const li =e.target.parentElement;
    li.toggleAttribute("item-completed",e.target.checked);
 }

function createListItem(item) {
    // checkbox
    const input=document.createElement("input");
    input.type="checkbox";
    input.classList.add("form-check-input");
    input.checked=item.completed;
    input.addEventListener("change",toggleCompleted);

    // item
    const div=document.createElement("div");
    div.textContent=item.name;
    div.classList.add("item-name");

    // delete icon
    const deleteIcon=document.createElement("span");
    deleteIcon.className="s-3 bi bi-x text-danger delete-icon";
    // li
    const li=document.createElement("li");
    li.className="border rounded p-3 mb-1 d-flex align-items-center";
    li.toggleAttribute("item-completed",item.completed);
   

    li.appendChild(input);
    li.appendChild(div);
    li.appendChild(deleteIcon);
    return li;
}



 /*<li class="border rounded p-3 mb-1 d-flex align-items-center">
            <input type="checkbox" class="form-check-input" name="" id="">
            <div class="item-name">Item</div>
            <i class="fs-3 bi bi-x text-danger delete-icon"></i>
           </li>  */