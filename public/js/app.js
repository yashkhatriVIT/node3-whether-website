let myForm = document.getElementById('myForm');
let Message = document.getElementById('message');
let Error = document.getElementById('error');
console.log(myForm);
myForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let input = document.getElementById('bar');
    let value  = input.value;
    fetch(`http://localhost:3000/whether?address=${value}`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        if(data.error){
            Error.textContent = data.error;
            Message.textContent = ``;
        }
        else{
            Message.textContent = `${data.location}`;
            Error.textContent = `${data.forecast}`;
        }
    });

})