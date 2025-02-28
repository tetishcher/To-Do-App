const removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
const completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
const newItem = document.getElementById("item");
const newItemButton = document.getElementById("createBtn");
const itemTable = document.getElementById("itemTable");

const xmlRequest = new XMLHttpRequest();

function renderUsers(items) {
  itemTable.innerHTML = "";
  items.forEach((item) => {
    const row = document.createElement("tr");
    const idCell = document.createElement("td");
    const nameCell = document.createElement("td");
    const removeCell = document.createElement( "td");
    const remove = document.createElement("button")
    remove.classList.add("remove");
    idCell.textContent = item.id;
    nameCell.textContent = item.name;
    remove.innerHTML = removeSVG;
    removeCell.appendChild(remove);
    row.setAttribute("id", item.id);
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(removeCell);
    itemTable.appendChild(row);
    remove.addEventListener('click', deleteItemOnClick);
  });
}

xmlRequest.onreadystatechange = function () {
  if (xmlRequest.readyState < 4) {
    console.log("...loading");
  } else {
    const respText = xmlRequest.responseText;
    const items = JSON.parse(respText);
    renderUsers(items);
  }
};

xmlRequest.open("GET", "http://localhost:8000/", true);
xmlRequest.send();

newItemButton.addEventListener("click", function () {
  const item = {
    name: newItem.value,
  };
  document.getElementById('item').value = '';
  postItem(item);
});

async function postItem(item) {
  const resp = await fetch("http://localhost:8000/", {
    method: "POST",
    body: JSON.stringify(item),
  });
  const items = await resp.json();
  renderUsers(items);
}

async function deleteItemOnClick() {
  const item = {
    action: "delete",
    id: parseInt(this.parentNode.parentNode.id),
  };
  const resp = await fetch("http://localhost:8000/", {
    method: "POST",
    body: JSON.stringify(item)
  });
  const items = await resp.json();
  renderUsers(items);
}
