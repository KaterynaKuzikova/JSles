class Contact{
    static url = "contacts";
    #contacts = [];
    #currentContact = null;
    #currentContactE = null;
    #EcontactContainer = null;
    #editTitle = null;
    #editBody = null;
    #editPhone = null;
    #http = null;
    #editE = null;
    #CLASSES = {
        item_active: "item-active",
        show_edit: "show-edit",
        hideEditButton: "hide-element",
        close: "close",
        edit: "edit",
        item_title: "item-title",
        item_body: "item-body",
        item_phone: "item-phone",
    }
    constructor(el, editEl){
        this.#EcontactContainer = el;
        this.#editE = editEl;
        this.init();
    }

    init(){
        this.#http = new Http(Contact.url);
        this.#editTitle = this.#editE.querySelector('.edit-title');
        this.#editBody = this.#editE.querySelector('.edit-body');
        this.#editPhone = this.#editE.querySelector('.edit-phone');
        this.addListeners();
        this.getContacts();
    }

    addListeners(){
        this.#EcontactContainer.addEventListener('click', this.onContactClick);
        this.#editE.querySelector('.save').addEventListener('click', this.onSave);
    }

    getContacts(){
        this.#http.getAll().then((d) => {
            this.#contacts = d;
            this.renderContacts(this.#contacts);
        });
    }

    renderContacts(contacts){
        const content = contacts.map((c) => this.createContactElement(c)).join("");
        this.#EcontactContainer.innerHTML = content;
    }

    createContactElement(contact){
        return `          <div class="item " id = "${contact.id}">
        <div class="item-content">
            <div>
                <div class="item-title ">${contact.title}</div>
                <div class="item-body">${contact.body}</div>
                <div class="item-phone">${contact.phone}</div>
            </div>
            <div>${this.createDate(contact.createDate)}</div>
        </div>
        <div class="item-actions">
            <div class="close">X</div>
            <button class="edit">Edit</button>
        </div>
    </div>`;
    }

    createDate(date){
        const newDate = moment(date).format('DD.MM.YYYY');
        console.log(newDate);
        return newDate;
    }

    onContactClick = (e) => {
        const target = e.target;
        if(this.#currentContactE){
            this.#currentContactE.classList.remove(this.#CLASSES.item_active);
        }
        this.#currentContactE = e.target.closest(".item");
        if(this.#currentContactE){
            this.#currentContact = this.#contacts.find(e => e.id === this.#currentContactE.id);
        }
        if(e.target.classList.contains(this.#CLASSES.close)){
            this.removeContact(this.#currentContact.id);
            return;
        }
        if(e.target.classList.contains(this.#CLASSES.edit)){
            this.editContact(this.#currentContact);
            return;
        }
    };

    onSave = () => {
        this.#currentContact.title = this.#editTitle.value;
        this.#currentContact.body = this.#editBody.value;
        this.#currentContact.phone = this.#editPhone.value;
        this.#http.update(this.#currentContact.id, this.#currentContact).then((r) => {
            if(r && r.id){
                this.#currentContactE.querySelector('.item-title').innerHTML = r.title;
                this.#currentContactE.querySelector('.item-body').innerHTML = r.body;
                this.#currentContactE.querySelector('.item-phone').innerHTML = r.phone;
                this.#editE.classList.remove(this.#CLASSES.show_edit);
                this.#currentContactE.classList.remove(this.#CLASSES.item_active);
                this.clearData();
            }
        });
    };

    createContact(title, body, phone){
        const contact = {
            title,
            body,
            phone,
        };
        this.#http.create(contact).then((r) => {
            if(r && r.id){
                this.#contacts.unshift(r);
                const content = this.createContactElement(r);
                this.#EcontactContainer.innerHTML += content;
            }
        });
    }

    editContact(){
        this.#editE.classList.add(this.#CLASSES.show_edit);
        this.#currentContactE.classList.add(this.#CLASSES.item_active);
        this.#editTitle.value = this.#currentContact.title;
        this.#editBody.value = this.#currentContact.body;
        this.#editPhone.value = this.#currentContact.phone;
    }

    
    removeContact(id){
        this.#http.delete(id).then((r) => {
            if(r.deletedCount >= 1){
                this.#contacts = this.#contacts.filter((c) => c.id !== id);
                this.#currentContactE.remove();
                this.clearData();
            }
        });
    }


    clearData(){
         this.#currentContact = null;
         this.#currentContactE = null;
    }
}