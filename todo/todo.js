class Todo{
    static url = "todos";
    #todos = [];
    #currentTodo = null;
    #currentTodoE = null;
    #EtodoContainer = null;
    #editTitle = null;
    #editBody = null;
    #http = null;
    #editE = null;
    #CLASSES = {
        todo_complete: "todo-complete",
        item_active: "item-active",
        show_edit: "show-edit",
        hideCompleteButton: "hide-element",
        close: "close",
        complete: "complete",
        item_title: "item-title",
        item_body: "item-body",
    }
    constructor(el, editEl){
        this.#EtodoContainer = el;
        this.#editE = editEl;
        this.init();
    }

    init(){
        this.#http = new Http(Todo.url);
        this.#editTitle = this.#editE.querySelector('.edit-title');
        this.#editBody = this.#editE.querySelector('.edit-body');
        this.addListeners();
        this.getTodos();
    }

    addListeners(){
        this.#EtodoContainer.addEventListener('click', this.onTodoClick);
        this.#editE.querySelector('.save').addEventListener('click', this.onSave);
    }

    getTodos(){
        this.#http.getAll().then((d) => {
            this.#todos = d;
            this.renderTodos(this.#todos);
        });
    }

    renderTodos(todos){
        const content = todos.map((t) => this.createToDoElement(t)).join("");
        this.#EtodoContainer.innerHTML = content;
    }

    createToDoElement(todo){
        return `          <div class="item ${todo.isComplete ? this.#CLASSES.todo_complete : ""}" id = "${todo.id}">
        <div class="item-content">
            <div>
                <div class="item-title ">${todo.title}</div>
                <div class="item-body">${todo.body}</div>
            </div>
            <div>${this.createDate(todo.createDate)}</div>
        </div>
        <div class="item-actions">
            <div class="close">X</div>
            <button class="complete ${todo.isComplete ? this.#CLASSES.hideCompleteButton : ""}">Complete</button>
        </div>
    </div>`;
    }

    createDate(date){
        const newDate = moment(date).format('DD.MM.YYYY');
        console.log(newDate);
        return newDate;
    }

    onTodoClick = (e) => {
        const target = e.target;
        if(this.#currentTodoE){
            this.#currentTodoE.classList.remove(this.#CLASSES.item_active);
        }
        this.#currentTodoE = e.target.closest(".item");
        if(this.#currentTodoE){
            this.#currentTodo = this.#todos.find(e => e.id === this.#currentTodoE.id);
        }
        if(e.target.classList.contains(this.#CLASSES.close)){
            this.removeTodo(this.#currentTodo.id);
            return;
        }
        if(e.target.classList.contains(this.#CLASSES.complete)){
            this.completeTodo(this.#currentTodo);
            return;
        }
        if(e.target.classList.contains(this.#CLASSES.item_title) || e.target.classList.contains(this.#CLASSES.item_body)){  
        this.editTodo();
            return;
        }
    };

    onSave = () => {
        this.#currentTodo.title = this.#editTitle.value;
        this.#currentTodo.body = this.#editBody.value;
        this.#http.update(this.#currentTodo.id, this.#currentTodo).then((r) => {
            if(r && r.id){
                this.#currentTodoE.querySelector('.item-title').innerHTML = r.title;
                this.#currentTodoE.querySelector('.item-body').innerHTML = r.body;
                this.#editE.classList.remove(this.#CLASSES.show_edit);
                this.#currentTodoE.classList.remove(this.#CLASSES.item_active);
                this.clearData();
            }
        });
    };

    createTodo(title, body){
        const todo = {
            title,
            body,
            isComplete:false,
        };
        this.#http.create(todo).then((r) => {
            if(r && r.id){
                this.#todos.unshift(r);
                const content = this.createToDoElement(r);
                this.#EtodoContainer.innerHTML += content;
            }
        });
    }

    editTodo(){
        this.#editE.classList.add(this.#CLASSES.show_edit);
        this.#currentTodoE.classList.add(this.#CLASSES.item_active);
        this.#editTitle.value = this.#currentTodo.title;
        this.#editBody.value = this.#currentTodo.body;
    }

    completeTodo(todo){
        todo.isComplete = true;
        this.#http.update(todo.id, todo).then((r) => {
            if(r && r.id){
                this.#currentTodoE.classList.add(this.#CLASSES.todo_complete);
                this.clearData();
            }
        })
    }

    
    removeTodo(id){
        this.#http.delete(id).then((r) => {
            if(r.deletedCount >= 1){
                this.#todos = this.#todos.filter((t) => t.id !== id);
                this.#currentTodoE.remove();
                this.clearData();
            }
        });
    }


    clearData(){
         this.#currentTodo = null;
         this.#currentTodoE = null;
    }
}