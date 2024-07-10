var form=document.getElementById('form');
var textinput=document.getElementById('textinput');
var msg=document.getElementById('msg');
var dateinput=document.getElementById('dateinput');
var textarea=document.getElementById('textarea');
var tasks=document.getElementById('tasks');
var add=document.getElementById('add');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    formvalidation();
});
let formvalidation =()=>{
if(textinput.value==="")
    {
console.log('failure');
msg.innerHTML="Task cannot be blank";
    }
    else{
        console.log('success');
        msg.innerHTML=" ";
        acceptdata();
        add.setAttribute('data-dismiss','modal');
        add.click();
(()=>{
    add.setAttribute('data-dismiss','');})()
    }
};
let data=[{}]; //Empty objj
//convert empty object to array inorder to store the data in local storage of object 
let acceptdata=()=>{
  data.push({
   text:textinput.value,   
    date:dateinput.value, 
    description:textarea.value,
  });//set datain local storage
   localStorage.setItem("data",JSON.stringify(data));//key,array
   console.log(data); 
   createTasks();
}; 
let createTasks = () => {
  tasks.innerHTML = ""; // Clear the tasks container
  data.map((x, y) => {
   return (tasks.innerHTML += `<div id=${y}>
      <span class="c3">${x.text}</span>
      <br>
      <span class="small text-secondary">${x.date}</span>
      <p>${x.description}</p>
      <span class="options text-center">
        <i onclick="edittask(this)" data-toggle="modal" data-target="#form" class="fa fa-pencil-square text-center" aria-hidden="true"></i>
        <i onclick="deleteTask(this);createTasks()" class="fa fa-trash text-center" aria-hidden="true"></i>
      </span>
    </div>`);
  });
  resetfrom();
};
let deleteTask=(e)=>{
    //  e.remove(); //it ill removw the icon (delete icon)
  //e.parentElement.remove(); //it will remove the both icons 
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id,1);
  localStorage.setItem("data",JSON.stringify(data));//key,array
};
  //update task
  let edittask=(e)=>{
  var selectedtask=e.parentElement.parentElement;
  textinput.value=selectedtask.children[0].innerHTML;//first child
  dateinput.value=selectedtask.children[2].innerHTML;
  textarea.value=selectedtask.children[3].innerHTML;
  deleteTask(e);
  };
//reset form after adding task
let resetfrom=()=>{
    textinput.value="";
    dateinput.value="";
    textarea.value="";
}
//iife immediate invoke function element 
//Reterive data from our application(from local storage every time we refresh the pg)
(() => {
data = JSON.parse(localStorage.getItem("data")) || [];
createTasks();
console.log(data);
}
)();