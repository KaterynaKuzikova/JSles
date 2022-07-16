const inputE = document.getElementById("inp");
const btnE = document.getElementById("btn");
const containerE = document.querySelector('.container');

btnE.addEventListener("click", onAddList);
containerE.addEventListener("click", onToDoClick);

function onAddList(){
        const toDo = inputE.value;
        if(!isDataListValid(toDo)){
                alert('enter valid data, please');
                clearData();
                return;
        }
        const el = createNewToDo(toDo, 'li', 'item-list', 'delete');
        renderElement(containerE, el);
        clearData();

}

function isDataListValid(toDo){
        if(!toDo.trim()){
            return false;
         }
         return true;
     }

function clearData(){
        inputE.value = "";
}

function createNewToDo(toDo, containerTag, containerClassName){
        return `<${containerTag} name="todo" class="${containerClassName}">
        <div  class="item" ><span name="delete" class="delete">X</span> ${toDo}
        </div>
        </${containerTag}>`;
}

function renderElement(container, el){
        container.innerHTML += el;
}


function onToDoClick(e){
        [...e.target.attributes].forEach((el) => {
                if(el.value === "delete"){
                        onDelete(e.target);
                }
                if(el.value === "todo"){
                        compliteToDo(e.target);
                }
        });
}


function onDelete(elem){
        elem.closest('.item-list').remove();
}

function compliteToDo(elem){
        elem.classList.toggle("complite");
}