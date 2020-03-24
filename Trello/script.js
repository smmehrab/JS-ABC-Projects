// var h = document.createElement('h1');
// var myValue = document.createTextNode('Hello World!');
// h.appendChild(myValue);
// document.querySelector('h1').appendChild(h);

var ul = document.getElementById('list');
var li;
var checkBox;
var label;

var addBtn = document.getElementById('add');
addBtn.addEventListener('click', addItem);

var removeBtn = document.getElementById('remove');
removeBtn.addEventListener('click', removeItem);

var resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', resetTodo);

function addItem() {
    // console.log('Add Button Clicked');
    var input = document.getElementById('input');
    var inputValue = input.value;
    var textNode = document.createTextNode(inputValue);

    if (inputValue === '') {
        return false;
    } else {
        li = document.createElement('li');

        checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.setAttribute('id', 'check');

        label = document.createElement('label');
        label.setAttribute('for', 'item'); //optional

        ul.insertBefore(li, ul.childNodes[0]);
        li.appendChild(checkBox);
        li.appendChild(label);
        label.appendChild(textNode);

        //li.className = 'visual';

        setTimeout(() => {
            li.className = 'visual';
        }, 5);

        input.value = '';
    }
}

function removeItem() {
    // console.log('Remove Button Clicked');
    li = ul.children;
    // console.log(li);
    for (let index = 0; index < li.length; index++) {
        // const element = li[index];
        // console.log(element);
        while (li[index] && li[index].children[0].checked) {
            ul.removeChild(li[index]);
        }
    }
}

function resetTodo() {
    // console.log('Remove Button Clicked');
    li = ul.children;
    // console.log(li);
    for (let index = 0; index < li.length; index++) {
        // const element = li[index];
        // console.log(element);
        while (li[index]) {
            ul.removeChild(li[index]);
        }
    }
}