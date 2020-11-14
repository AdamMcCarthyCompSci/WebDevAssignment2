var xmlhttp = new XMLHttpRequest();
var url = "scheduling.json";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        
        //Parse the JSON data to a JavaScript variable. 
        var parsedObj = JSON.parse(xmlhttp.responseText);    
        // This function is defined below and deals with the JSON data read from the file. 
        mainFunction(parsedObj); 
    }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();

    
function mainFunction(obj) {   
    const container = document.getElementById("container");
    const dayContainer = document.getElementById("dayContainer");
    obj.forEach(function(item) {
        const dayButton = document.createElement("button");       
        dayButton.innerHTML = item.day;
        dayButton.className = "dayClass";
        var slot = item.slots      
        dayButton.onclick = function() {
            dayFunction(slot,this)
            while (paperContainer.hasChildNodes()) {
                paperContainer.removeChild(paperContainer.lastChild);
                } 
            paperFunction();
 
        }
        dayContainer.append(dayButton);
    });
}

function dayFunction (obj,click) {
    var dayLoop = document.getElementsByClassName("dayClass")
    for (var i = 0; i <dayLoop.length; i++) {
        if (dayLoop[i] === click) {
            click.style.backgroundColor = "green" ;
        }
        else {
            dayLoop[i].style.backgroundColor = "red";
        }}
    const timeContainer = document.getElementById("timeContainer");            
    while (timeContainer.hasChildNodes()) {
        timeContainer.removeChild(timeContainer.lastChild);
        }  
    for (var i in obj) {
        const timeButton = document.createElement("button");
        timeButton.innerHTML = obj[i].time;
        timeButton.id = i;
        timeButton.className = "timeClass";
        timeButton.onclick = function() {



            timeFunction(obj,this,paperToggle);
        }
        timeContainer.append(timeButton);
    }                     
}


function timeFunction (obj,click,toggle) {
    var timeLoop = document.getElementsByClassName("timeClass")
    for (var i = 0; i <timeLoop.length; i++) {
        if (timeLoop[i] === click) {
            click.style.backgroundColor = click.style.backgroundColor === "green" ? "red" : "green" ;
        }
        else {
            timeLoop[i].style.backgroundColor = "red";
        }
    }
    var session = obj[click.id].sessions;
    const sessionContainer = document.getElementById("sessionContainer");
    while (sessionContainer.hasChildNodes()) {
        sessionContainer.removeChild(sessionContainer.lastChild);
    } 
    session.forEach(function(item) {
        const sessionButton = document.createElement("button");
        sessionButton.innerHTML = item.title+"</br>"+item.time+"</br>"+item.room+"</br>"+item.type;
        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];
        sessionButton.onclick = function () {
            while (submissionsList.hasChildNodes()) {
                submissionsList.removeChild(submissionsList.lastChild);
            } 
            var submission = item.submissions;
            modal.style.display = "block";
            submission.forEach(function(item) {
                var title = item.title;
                var submissionLink = document.createElement("a");
                var submissionText = document.createTextNode(title);
                submissionLink.appendChild(submissionText);
                submissionLink.title = "item.title";
                submissionLink.href = item.doiUrl;           
                submissionsList.append(submissionLink);                
                submissionsList.innerHTML += "</br></br>"
            });

        };
        span.onclick = function() {
            modal.style.display = "none";
        };
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        if (toggle == "All") {
            sessionContainer.append(sessionButton);
        }   
        if (toggle == "Paper" && item.type == "paper") {
            sessionContainer.append(sessionButton);
            }
        if (toggle == "Other" && item.type != "paper") {
            sessionContainer.append(sessionButton);
        }

    });         
}

function paperFunction() {

    const paperContainer = document.getElementById("paperContainer");
    const paperButton1 = document.createElement("button");
    paperButton1.innerHTML = "All Sessions";
    paperButton1.className = "paperClass";
    paperButton1.onclick = function() {
        paperToggle = "All"
        paperButton1.style.backgroundColor = "green"
        paperButton2.style.backgroundColor = "red"
        paperButton3.style.backgroundColor = "red"
    }
    paperContainer.append(paperButton1);

    const paperButton2 = document.createElement("button");
    paperButton2.innerHTML = "Paper Sessions";
    paperButton2.className = "paperClass";
    paperButton2.onclick = function() {
        paperToggle = "Paper"
        paperButton1.style.backgroundColor = "red"
        paperButton2.style.backgroundColor = "green"
        paperButton3.style.backgroundColor = "red"
    }
    paperContainer.append(paperButton2);

    const paperButton3 = document.createElement("button");
    paperButton3.innerHTML = "Non-Paper Sessions";
    paperButton3.className = "paperClass";
    paperButton3.onclick = function() {
        paperToggle = "Other"
        paperButton1.style.backgroundColor = "red"
        paperButton2.style.backgroundColor = "red"
        paperButton3.style.backgroundColor = "green"
    }
    paperContainer.append(paperButton3);
}