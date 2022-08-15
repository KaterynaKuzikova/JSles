const contact = new Contact(document.querySelector('.list'), document.querySelector('.edit-container'));
const titleE = document.querySelector(".title");
const bodyE = document.querySelector(".body");
const phoneE = document.querySelector(".phone");
document.querySelector('.create').addEventListener('click', () => contact.createContact(titleE.value, bodyE.value, phoneE.value));