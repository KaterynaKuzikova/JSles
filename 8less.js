const listContainer = document.getElementById("list");
const inputE = document.getElementById('inp');
const btnE = document.getElementById('btn');


btnE.addEventListener("click", onClick);

function onClick(){
  const inputText = inputE.value;
  const liE = document.createElement('li');
  listContainer.append(liE);
  liE.textContent = text;
  inputE.value = '';
}