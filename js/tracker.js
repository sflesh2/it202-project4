

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

let currScene = "Home"; //always start on the home screen
let changeScene = (e)=>{
    //move the app to the data page
        // <a class="mdc-list-item mdc-list-item--activated" href="#" id="home" aria-current="page">
        //  <i class="material-icons mdc-list-item__graphic" aria-hidden="true">queue</i>
        document.querySelector("#" + currScene).style = "display: none;";
        document.querySelector("#"+e).style = "display: block";
    
        let remove = document.querySelector("#"+currScene.toLowerCase());    
        remove.classList.remove("mdc-list-item--activated");
       
        let add = document.querySelector("#"+e.toLowerCase());
        add.classList.add("mdc-list-item--activated");
        currScene = e;
}
let selection = null;
let hover=(e)=>{
    if(selection == null || selection != e){
         e.style.backgroundColor = "lightCyan";
         e.style.borderWidth = "1px";
         e.style.borderStyle = "solid"; 
         e.style.borderColor = "black";
    }
   
}

let hoverOff=(e)=>{
    if(selection == null || selection != e){
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

document.querySelector(".remove-button").addEventListener("click", (e)=>{
        if(selection == null){
            alert("A country must be selected to remove it");
        }else{
            //trackedNations.remove(selection.value);
            trackedNations.splice(trackedNations.indexOf(selection.id),1); 
            document.querySelector(".country-list").removeChild(selection);
            selection = null;
        }
});

document.querySelector(".add-button").addEventListener("click", (e)=>{
    let list = document.querySelector("#selector"); 
    let s = list.value;
    if(s == ""){
        alert("Please Select a value");
        return;
    }
    let clone=document.querySelector(".template-list-item").cloneNode(true); 
    clone.classList.remove("template-list-item");
    clone.textContent = s;
    clone.id=s;
    if(trackedNations.includes(s)){
        alert(s + " is already being tracked!");
    }else{
        document.querySelector(".country-list").appendChild(clone);
        trackedNations.push(s);
        
    }
    list.value = "";
    
    
});

document.querySelector(".clear-button").addEventListener("click", (e)=>{
    trackedNations = []; //remove all the items in tracked nations 
    
    let parent = document.querySelector(".country-list");
    let children = parent.children; 
    let removeList = [];
    for(let child of children){
        if(child.classList.contains("template-list-item") == false){
            removeList.push(child);
        }
    }
    
    for(let r of removeList){
        parent.removeChild(r);
    }
});

document.querySelector(".data-button").addEventListener("click", (e)=>{
    if(trackedNations.length === 0){
        alert("You must add countries in order to plot data");
    }else{
        let table = document.querySelector(".mdc-data-table__content");
        
        
        let children = table.children; 
        let removeList = [];
        for(let child of children){
            if(child.classList.contains("template-row") == false){
                removeList.push(child);
            }
        }

        for(let r of removeList){
            table.removeChild(r);
        }
        
        
       for(let item of trackedNations){
            let row = document.querySelector(".template-row").cloneNode(true);
            row.classList.remove("template-row");
            let i = allData[item]; 
            let entryData = i[i.length-1];
            
            
            let country = document.querySelector(".template-cell").cloneNode(true);
            country.classList.remove("template-cell"); 
            
            let confirmed = country.cloneNode(true); 
            let death = country.cloneNode(true); 
            let recovered = country.cloneNode(true); 
            
            country.textContent = item; 
            confirmed.textContent = entryData["confirmed"]; 
            death.textContent = entryData["deaths"];
            recovered.textContent=entryData["recovered"];
            row.appendChild(country); 
            row.appendChild(confirmed); 
            row.appendChild(death); 
            row.appendChild(recovered); 
            
            table.appendChild(row);
           
        }
        
        changeScene("Data");
    }
});

document.querySelectorAll("aside.mdc-drawer a.mdc-list-item").forEach(item=>{
       
       item.addEventListener("click", even => {
           let target = item.id;
           
           let pages = document.querySelectorAll(".page"); 
           for(page of pages){
               page.style = "display:none;"
           }
           
           if(target == "home"){
              changeScene("Home");
           }else if(target == "data"){
               changeScene("Data"); 
           }else if(target == "add"){
               changeScene("Add");
           }else if(target == "charts"){
               changeScene("Charts");
           }
           drawer.open = false;
       });
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

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}    


function drawChart() {
            // Define the chart to be drawn.
            var data = new google.visualization.DataTable();
            /*data.addColumn('string', 'Month');
            data.addColumn('number', 'Tokyo');
            data.addColumn('number', 'New York');
            data.addColumn('number', 'Berlin');
            data.addColumn('number', 'London');
            */
            data.addColumn('string', 'date');
            for(let c of trackedNations){
                data.addColumn('number', c);
            }
            
            let allRows = [];
            let baseLine = allData[trackedNations[0]];
            let i = 0; 
            let stat = "confirmed";
            for(let dates of baseLine){
                let row = []; 
                row.push(dates.date);
                for(let n of trackedNations){
                    row.push(allData[n][i][stat])
                }
                i+=1;
                allRows.push(row);
            }
            data.addRows(allRows);
               
            // Set chart options
            var options = {'title' : "Virus " + stat,
               hAxis: {
                  title: 'Date'
               },
               vAxis: {
                  title: stat
               },   
               'width':550,
               'height':400	  
            };

            // Instantiate and draw the chart.
            var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
            chart.draw(data, options);
}