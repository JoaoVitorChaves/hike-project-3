//The purpose of "use strict" is to indicate that the code should be executed in "strict mode".
"use strict";
//From this point, we started to put const instead let, cause in these cases the value of variables are constants in any moment and there wont be any constation to put a equality different than their definitions. 
//SVG stands for Scalable Vector Graphics,defining vector-based graphics in XML format
const removeicon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
const completeicon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
//Instead of put a condition that if the localStorage.getItem('completed')  would be null, use the void string, else use JSON.parse(localStorage.getItem('completed'), we inverted and placed a simple language, cause we realized that would be readed in the same way.
//To keep clear the configuration of a ternary operator, it's like a multiplication with two terms between parentheses and another one, cause both use distributive method (in case to put differents conditions).
const todos = (localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []);
const completed = (localStorage.getItem('completed') ? JSON.parse(localStorage.getItem('completed')) : []);

loadItems();
//for-loops with the property length to satisfy every element that will be created, defined by addItemtoDOM function.
//It's not necessary to place false after todos[i], it'll be read clearly.
function loadItems() {

	for(let i = 0; i<todos.length; i = i + 1) {
		addItemtoDOM(todos[i]);
	} for(let i = 0; i<completed.length; i = i + 1) {
		addItemtoDOM(completed[i], true);
	}

}
//The push() method adds new items to the end of an array, and returns the new length.
//Defined the event when the "+" is clicked, placing a new item input.
document.getElementById("new-item-button").onclick = function() { 

	const itemtext = document.getElementById('new-item-input').value;

	if (itemtext) {
		todos.push(itemtext);
        addItemtoDOM(itemtext);
        document.getElementById('new-item-input').value = '';
    
    	updatestorage();
    }

}
//Defined by addEventListener a new interative property for our page, by a keypress, the same event when button "+" is clicked.
document.addEventListener('keypress', function(e) {

	const itemtext = document.getElementById('new-item-input').value;

	if (e.which == 13){
    	todos.push(itemtext);
        addItemtoDOM(itemtext);
        document.getElementById('new-item-input').value = '';

    	updatestorage();
	}

}, false);
//classList.add place the term in parentheses in a div.
//The append() method inserts specified content at the end of the selected elements. The prepend() method is opposite of append() method.
//In this function, it defined where the li created belongs (the specific ul).
function addItemtoDOM(itemtext, completed) {

	const item = document.createElement('li');
	item.innerText = itemtext;

	const buttons = document.createElement('div');
	buttons.classList.add('buttons');

	const removebutton = document.createElement('button');
	removebutton.classList.add('remove');
	removebutton.innerHTML = removeicon;
	removebutton.onclick = removeitem;

	const completebutton = document.createElement('button');
	completebutton.classList.add('complete');
	completebutton.innerHTML = completeicon;
	completebutton.onclick = completeitem;

	buttons.append(removebutton);
	buttons.append(completebutton);
	item.append(buttons);

	const listid = (completed ? 'completed-list' : 'todo-list');
	document.getElementById(listid).prepend(item);
}
//The push() method adds new items to the end of an array, and returns the new length.
function removeitem() {

	const item = this.parentNode.parentNode;
	const currentlistId = item.parentNode.id;
	const text = item.innerText;
	
	item.remove();

	if (currentlistId === 'todo-list') {
		todos.splice(todos.indexOf(text), 1);
	} else {
		completed.splice(completed.indexOf(text), 1);
	}

	updatestorage();
}

function completeitem() {

	const item = this.parentNode.parentNode;
	const currentlistId = item.parentNode.id;
	const text = item.innerText;

	item.remove();

	if (currentlistId === 'todo-list') {
		todos.splice(todos.indexOf(text), 1);
		completed.push(text);
		document.getElementById('completed-list').prepend(item);

	} else {
		completed.splice(todos.indexOf(text), 1);
		todos.push(text);
		document.getElementById('todo-list').prepend(item);
	}

	updatestorage();
}

function updatestorage() {

	localStorage.setItem('todos', JSON.stringify(todos));
	localStorage.setItem('completed', JSON.stringify(completed));
}