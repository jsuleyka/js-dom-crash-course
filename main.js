let form = document.getElementById('addForm');
let itemInput = document.getElementById('item');
let itemList = document.getElementById('items');
let filter = document.getElementById('filter');

// Form submit event
form.addEventListener('submit', addItem);
// Delete event
itemList.addEventListener('click', removeItem);
// Filter event
filter.addEventListener('keyup', filterItems);

// Add item
function addItem(e) {
    e.preventDefault();

    // Get input value
    let newItem = itemInput.value;

    // Create new li element
    let li = document.createElement('li');

    // Add class
    li.className = 'list-group-item';

    // Add text node with input value
    if (newItem.length >= 3){
        li.appendChild(document.createTextNode(newItem));

        // Create del button element
        let deleteBtn = document.createElement('button');

        // Add classes to del button
        deleteBtn.className = 'btn btn-danger btn-sm float-right delete';

        // Append text node
        deleteBtn.appendChild(document.createTextNode('X'));

        // Append button to li
        li.appendChild(deleteBtn);

        // Append li to list
        itemList.appendChild(li);
        li.style.opacity = 0;

        // Show element by increasing opacity
        unfade(li);

        //Clear input
        itemInput.value = "";
    }
    else {
        alert("Please add an item valid");
    }
}

function unfade(element) {
    let op = 0.1;  // initial opacity
    element.style.display = 'block';
    let timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

// Remove item
function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are You Sure?')) {
            let li = e.target.parentElement;
            itemList.removeChild(li);
        }
    }
}

// Filter Items
function filterItems(e) {
    // convert text to lowercase
    let text = e.target.value.toLowerCase();
    // Get lis
    let items = itemList.getElementsByTagName('li');
    // Convert to an array
    Array.from(items).forEach(function (item) {
        let itemName = item.firstChild.textContent;
        if (itemName.toLowerCase().indexOf(text) != -1) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}