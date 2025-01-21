const shoppingList=document.querySelector(".shopping-list");

loadItems();

function loadItems() {
    const items= [
        {id:1, name:"Egg", completed:false},
        {id:2 ,name:"Fish",completed:true},
        {id:3 ,name:"Milk", completed:false}

    ];

    shoppingList.innerHTML="";

    for(let item of items) {
        const li=createListItem(item);
        shoppingList.appendChild(li);
        
    }
}

function createListItem(item) {
    // checkbox
    const input=document.createElement("input");
    input.type="checkbox";
    input.classList.add("form-check-input");
    input.checked=item.completed;

    // item
    const div=document.createElement("div");
    div.textContent=item.name;
    div.classList.add="item-name";

    // delete icon
    const deleteIcon=document.createElement("span");
    deleteIcon.className="s-3 bi bi-x text-danger delete-icon";
    // li
    const li=document.createElement("li");
    li.className="border rounded p-3 mb-1 d-flex align-items-center";

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