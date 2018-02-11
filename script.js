var playerName, playerGender, mm_Room, mm_NewRoom, mm_start, DTT_GenderAssigned;
 mm_start = document.getElementById("mm_start");
 mm_NewRoom = document.getElementById("Character");
 mm_Room = document.getElementById("mm_Room");
 DTT_GenderAssigned = document.getElementById("DTT_GenderAssigned");

document.getElementById("mm_start").addEventListener("click", function( event ) {
    var radios = document.getElementsByName('DTT_GenderAssigned');

    for (var i = 0, length = radios.length; i < length; i++)
    {
     if (radios[i].checked)
     {
        mm_NewRoom.style.visibility = "visible";
        mm_start.remove(); 
        radios[0].disabled = true;
        radios[1].disabled = true;
        if (i == 1) {
          console.log("The user selected Female")  
        };
        if (i == 0) {
          console.log("The user selected Male")  
        };
        break;
     }
     
    }
    if (radios[1].checked == false && radios[0].checked == false && radios[2].checked == false) {
         console.log("None of the genders were checked, displaying error message on screen")
         alert("Please select the gender you were assigned at birth!")
     }
}, false);
function BodyLoaded() {
    console.log("'Dysphoria Trans Test' by @HannahTheTrans\nVersion:1.0");
    mm_NewRoom.style.visibility = "hidden";
    mm_Room.style.visibility = "visible";
};
