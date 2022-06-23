const nameE = document.getElementById("firstName");
const surnameE = document.getElementById("lastName");
const phoneE = document.getElementById("phoneNumber");
const btnE = document.getElementById("btn");
const listOfContactsE = document.querySelector(".listOfContacts");
const template = document.getElementById("template").innerHTML;

btnE.addEventListener("click", onAddList);

function onAddList(){
    const name = nameE.value;
    const surname = surnameE.value;
    const phoneNumber = phoneE.value;
    if(!isValid(name, surname, phoneNumber)){
        alert("Wrong data!");
        clearInput();
        return;
    }
    const el = createContactE(name, surname, phoneNumber, template);
    startElement(listOfContactsE, el);
    clearInput();
}

function isValid(name, surname, phoneNumber){
    if(!name.trim() || !surname.trim() || isNaN(+phoneNumber)){
       return false;
    }
    return true;
}

function clearInput(){
    nameE.value = '';
    surnameE.value = '';
    phoneE.value = '';
}

function createContactE(name, surname,phoneNumber, template){
    return template
    .replace('{{name}}', name)
    .replace('{{surname}}', surname)
    .replace('{{phoneNumber}}', phoneNumber);
}

function startElement(listOfContacts, element){
    listOfContacts.innerHTML += element;
}