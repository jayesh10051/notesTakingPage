
//function to show elements from localstorage
function showItem() {
    let notes = localStorage.getItem("notes");
    if (notes == null || notes == `[]`) {
        document.getElementsByClassName("cardSection")[0].innerHTML=`Add notes in above section`;
    }
    else{
        document.getElementsByClassName("cardSection")[0].innerHTML=``;
        let notesArray = Array.from(JSON.parse(notes));
        notesArray.forEach(function(element,index) {
            let text = element.noteText;
            let title = element.noteTitle;
            let card = document.createElement("div");
            card.classList = "card-body noteCard";
            card.id = `card${index}`;
            card.innerHTML= `<h5 class="card-title">${title}</h5>
            <p class="card-text">
              ${text}
            </p>
            <a id=${index} onclick="deleteNote(this.id)"  class="btn btn-primary">Delete</a>`;
            let cardSection = document.getElementsByClassName('cardSection')[0];
            cardSection.appendChild(card);
        })

    }
}
showItem();

// adding functionality to add note button
let button = document.getElementById("addButton");
button.addEventListener("click",function addnote() {
    let notes = localStorage.getItem("notes");
    let notetxt = document.getElementById("floatingTextarea2").value;
    let notetitle = document.getElementById("title").value;
    let note = {noteText : notetxt,
                noteTitle : notetitle};
    if (notetxt == "") {
        alert("type something in text area");
    }
    else{
        if (notes == null) {
            let notesobj = [];
            notesobj.push(note);
            localStorage.setItem("notes",JSON.stringify(notesobj))
        }
        else{
            let notesobj = JSON.parse(notes);
            let notesArray = Array.from(notesobj);
            notesArray.push(note);
            notes = JSON.stringify(notesArray);
            localStorage.setItem("notes",notes);
        }
    }
    document.getElementById("title").value = ``;
    document.getElementById("floatingTextarea2").value=``;
    showItem();
});

//adding delete functionality to the delete button
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes"));
    let notess= Array.from(notes);
    notess.splice(index,1);
    let notesNew = JSON.stringify(notess);
    localStorage.setItem("notes",notesNew);
    showItem(); 
}

//adding search functionality
//adding event listener to to search area
let searchArea = document.getElementById(`searchtxt`);
let notes = JSON.parse(localStorage.getItem(`notes`));
searchArea.addEventListener("input",function searchtxt(){
    console.log("search detected");
    let inputtxt = searchArea.value;
    Array.from(notes).forEach(function(element,index) {
         if (element.noteTitle.includes(inputtxt) || element.noteText.includes(inputtxt)) {
            document.getElementById(`card${index}`).style.display = "block";
         }
         else{
            document.getElementById(`card${index}`).style.display = "none";
         }
    })
});
