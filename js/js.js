if(localStorage.todoList==undefined){
	var todoList = []
}else{
	var todoList = JSON.parse(localStorage.todoList)
}
var input = document.querySelector('#input');
var donediv = document.querySelector(".done .list")
var doingdiv = document.querySelector(".doing .list")
var maindiv = document.querySelector('.main')
var numed = document.querySelector('.done .num')
var numing = document.querySelector('.doing .num')
showItem();
input.onkeydown = function(e){
	if(e.key == "Enter"){
		var value = input.value;
		var objItem = {
			content:value,
			isDone:false
		}
		input.value = "";
		todoList.push(objItem)
		showItem()
	}
}
maindiv.onclick = function(e){
	if(e.target.className =='del'){
		delIndex = e.target.dataset.index;
		todoList.splice(parseInt(delIndex),1);
		showItem()
	}
}
doingdiv.onchange = function(e){
	var changeIndex = (e.target.dataset.index);
	todoList[parseInt(changeIndex)].isDone = true;
	showItem();
}
donediv.onchange = function(e){
	var changeIndex = (e.target.dataset.index);
	todoList[parseInt(changeIndex)].isDone = false;
	showItem();
}
function showItem(){
	localStorage.todoList = JSON.stringify(todoList)
	donediv.innerHTML='';
	doingdiv.innerHTML='';
	var doneNum = 0;
	var doingNum = 0;
	todoList.forEach(function(item,index){
		var toItemDiv = document.createElement('div')
		toItemDiv.className = 'toItem'
		if(item.isDone){
			toItemDiv.innerHTML = `
			<input type="checkbox" checked="checked" data-index="${index}"/>
			<div class="content">`+item.content+`</div>
			<div class="del">删除</div>
			`
			doneNum++
			donediv.appendChild(toItemDiv)
		}else{
			toItemDiv.innerHTML = `
			<input type="checkbox" data-index="${index}"/>
			<div class="content">`+item.content+`</div>
			<div class="del">删除</div>
			`
			doingNum++;
			doingdiv.appendChild(toItemDiv)
		}
	})
	numed.innerText = doneNum;
	numing.innerText = doingNum;
}