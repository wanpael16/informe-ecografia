// const { remote } = require("electron");


const formLogin = document.getElementById("formLogin");


// main.hello();
// addEventListener('DOMContentLoaded',()=>{
    formLogin.addEventListener('submit',   (e)=>{
        e.preventDefault();
        const formData = new FormData(formLogin);
        const obj={};
        formData.forEach((value, key) => {
            obj[key] = value;
        });
        // console.log("hola");
        
        

      

    })
// });


