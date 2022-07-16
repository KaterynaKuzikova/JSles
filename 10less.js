const inputE = document.getElementById("inp");
const btnE = document.getElementById("btn");
const containerE = document.querySelector('.container');
const errorE = document.querySelector('.error-cont');


inputE.addEventListener('keyup', isDataListValid);
btnE.disabled = true;
btnE.addEventListener("click", onAddList);
containerE.addEventListener("click", onToDoClick);

function onAddList(e){
        const toDo = inputE.value;
        const el = createNewToDo(toDo, 'delete');
        renderElement(containerE, el);
        clearData();

}


function isDataListValid(e){

        if(!e.target.value.trim()){
                errorE.innerText = "";
                btnE.disabled = true;
                return;
        }
        if(e.target.value.trim().length <= 3){
            errorE.innerText = 'length should be > 3';
            btnE.disabled = true;
            return;
         }
         errorE.innerText = " ";
         btnE.disabled = false;

         if(e.keyCode === 13){
                onAddList();
        }


      
     }


     document.addEventListener('keydown', function(event){
        if (event.shiftKey && ['Backspace'].includes(event.key) ) {
            inputE.value = '';
        }
    });

function clearData(){
        inputE.value = "";
}

function createNewToDo(toDo, containerClassName){
        return `<div  name="todo" class="item-list"><span name="delete" class="delete">X</span> ${toDo}
        </div>`;
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
        elem.classList.toggle('complite');
}







