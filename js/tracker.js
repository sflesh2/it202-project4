

let trackedNations = []; 

let refresh = ()=>{
      //example of the API call
      fetch("https://pomber.github.io/covid19/timeseries.json")
          .then(response => response.json())
          .then(data => {
            //data["France"].forEach(({ date, confirmed, recovered, deaths }) =>
            //  console.log(`${date} active cases: ${confirmed - recovered - deaths}`)
            //);
            console.log(data);
      });  }
    
      
//reload the json data if the refresh button is pressed
document.querySelector("#refresh").addEventListener("click", (e)=>{
  refresh();
}); 


let selection = null;

let hover=(e)=>{
    if(selection == null){
         e.style.backgroundColor = "lightCyan";
         e.style.borderWidth = "1px";
         e.style.borderStyle = "solid"; 
         e.style.borderColor = "black";
    }
   
}

let hoverOff=(e)=>{
    if(selection == null){
         e.style.backgroundColor = "whitesmoke";
         e.style.borderStyle = "none"; 
    }
   
    
}

let select=(e)=>{
    
    if(selection == e){
        selection = null; 
    
        e.style.backgroundColor = "whitesmoke";
        e.style.borderStyle = "none"; 
    }else{
        if(selection != null){
           selection.style.backgroundColor = "whitesmoke";
           selection.style.borderStyle = "none"; 
        }
        
        selection = e; 
    
        e.style.backgroundColor = "lightgreen";
        e.style.borderWidth = "1px";
        e.style.borderStyle = "solid"; 
        e.style.borderColor = "black";
    }
    
}

document.querySelector(".add-button").addEventListener("click", (e)=>{
    let s = document.querySelector("#country").value;
    let clone=document.querySelector(".template-list-item").cloneNode(true); 
    clone.classList.remove("template-list-item");
    clone.textContent = s; 
    if(trackedNations.includes(s)){
        alert(s + " is already being tracked!");
    }else{
        document.querySelector(".country-list").appendChild(clone);
        trackedNations.push(s);
    }
    
});

let allData = null;
fetch("https://pomber.github.io/covid19/timeseries.json")
  .then(response => response.json())
  .then(data => {
    allData = data;
    let tempKeys = Object.keys(allData); 
    let menu = document.querySelector("#country");
    for(let key of tempKeys){
        let clone = document.querySelector(".option-template").cloneNode(true);
        clone.value=key; 
        clone.textContent=key;
        clone.classList.remove("option-template"); 
        menu.appendChild(clone);
    }
});