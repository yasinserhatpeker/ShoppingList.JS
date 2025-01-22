const shoppingList=document.querySelector(".shopping-list");
const shoppingForm=document.querySelector(".shopping-form");
const filterButtons=document.querySelectorAll(".filter-buttons button");


document.addEventListener("DOMContentLoaded", function() {
    loadItems();
    shoppingForm.addEventListener("submit",handleFormSubmit);

    for(let button of filterButtons) {
        button.addEventListener("click",handleFilterSelection);

    }
} );

function saveToLS() {
    const listItems=document.querySelectorAll("li");
    const liste=[];

    for(let li of listItems) {
        const id=li.getAttribute("item-id");
        const name=li.querySelector(".item-name").textContent;
        const completed=li.hasAttribute("item-completed");

        liste.push({id,name,completed});

    }
 localStorage.setItem("shoppingItems",JSON.stringify(liste));

}


function loadItems() {
    const items= JSON.parse(localStorage.getItem("shoppingItems") || []);

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

    updateFilteredItems();

    saveToLS();

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

    updateFilteredItems();
    saveToLS();
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
    div.addEventListener("click",openEditMode);
    div.addEventListener("blur",closeEditMode);
    div.addEventListener("keydown",cancelEnter);
    // delete icon
    const deleteIcon=document.createElement("span");
    deleteIcon.className="s-3 bi bi-x text-danger delete-icon";
    deleteIcon.addEventListener("click",removeItem);
    // li
    const li=document.createElement("li");
    li.className="border rounded p-3 mb-1 d-flex align-items-center";
    li.toggleAttribute("item-completed",item.completed);
    li.setAttribute("item-id",item.id);
   

    li.appendChild(input);
    li.appendChild(div);
    li.appendChild(deleteIcon);
    return li;
}

function removeItem(e) {
    const li= e.target.parentElement;
    shoppingList.removeChild(li);
    saveToLS();

 }

 function openEditMode(e) {
    const li=e.target.parentElement;
    if(li.hasAttribute("item-completed")==false) {
        e.target.contentEditable=true;
    }
 }

 function closeEditMode(e) {
    e.target.contentEditable=false;
    saveToLS();
 }
function cancelEnter(e) {
    if(e.key=='Enter') {
        e.preventDefault();
    }
    closeEditMode
    
}

function handleFilterSelection(e) {

   const  filterBtn=e.target;

    for(let button of filterButtons) {
        button.classList.add("btn-secondary");
        button.classList.remove("btn-primary");
    }

    filterBtn.classList.add("btn-primary");
    filterBtn.classList.remove("btn-secondary");

    filterItems(filterBtn.getAttribute("item-filter"));


}

function filterItems(filterType) {

    const li_items=document.querySelectorAll("li");
    
    for(let li of li_items) {
        li.classList.remove("d-block");
        li.classList.remove("d-none");

        const item_completed=li.hasAttribute("item-completed");

        if(filterType=="completed") {
            li.classList.toggle(item_completed ? "d-block" :"d-none");
        }
        else if(filterType=="incomplete") {
            li.classList.toggle(item_completed ? "d-none":"d-block");

        }
        else {
            li.classList.toggle("d-block");

        }
    }
}

function updateFilteredItems() {
    let activeFilter=document.querySelector(".btn-primary[item-filter]");
    filterItems(activeFilter.getAttribute("item-filter"));

}




 /*<li class="border rounded p-3 mb-1 d-flex align-items-center">
            <input type="checkbox" class="form-check-input" name="" id="">
            <div class="item-name">Item</div>
            <i class="fs-3 bi bi-x text-danger delete-icon"></i>
           </li>  */