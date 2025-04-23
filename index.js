//selecting the form
const userform = document.getElementById("userform")

let currentRow = null; // Track the row being edited

let formMode="create";//track the form mode default create mode


let cancelbtn=document.getElementById("cbtn")//selecting the cancel btn



//adding funtion to the form when the form is submit
userform.addEventListener("submit", function (event) {
    event.preventDefault();


    //selecting the formdata form the form
    let formData = new FormData(userform);

    //object create and store the formdata form the form
    let userdetails = {
        name: formData.get("name"),//get the name form the form name input box
        email: formData.get("email"),
        phone: formData.get("phonenum"),
        dob: formData.get("dob"),
        gender: formData.get("gender"),
        hobbies: formData.getAll("hobbies").join(","),
        education: formData.get("education"),
        address: formData.get("address")
    }

    //selecting the usertable
    let usertable = document.getElementById("usertable").getElementsByTagName("tbody")[0];

    if (formMode ==="edit" && currentRow) {
        // Update existing row
        currentRow.cells[1].innerText = userdetails.name;
        currentRow.cells[2].innerText = userdetails.email;
        currentRow.cells[3].innerText = userdetails.phone;
        currentRow.cells[4].innerText = userdetails.dob;
        currentRow.cells[5].innerText = userdetails.gender;
        currentRow.cells[6].innerText = userdetails.hobbies;
        currentRow.cells[7].innerText = userdetails.education;
        currentRow.cells[8].innerText = userdetails.address;
        currentRow.style.backgroundColor=""; //change the row color to default color 
        currentRow = null; // Reset currentRow

        formMode="create";//change the formmode to create

        userform.querySelector("input[type='submit']").value="Submit";//reset the name after update as button as submit

        cancelbtn.style.display="none"//after update remove the cancel button


        
    } else {
        // Create new row
        const newrow = usertable.insertRow();//row created and inserted into the tbody

        newrow.innerHTML = `
        <td></td>
        <td>${userdetails.name}</td>
        <td>${userdetails.email}</td>
        <td>${userdetails.phone}</td>
        <td>${userdetails.dob}</td>
        <td>${userdetails.gender}</td>
        <td>${userdetails.hobbies}</td>
        <td>${userdetails.education}</td>
        <td>${userdetails.address}</td>
        <td>
        <button onClick="edit(this)" id="ebtn">Edit</button>
        <button onClick="deleterow(this)" id="delbtn">Delete</button>
        </td>
        `;
    }
    userform.reset();//reset the input box in the userform
    updateserial()


})

function deleterow(button) {
    button.closest("tr").remove();
    updateserial()//updating the serial number after deleting the row
    // console.log("deleted")

}

function updateserial() {
    let rows = document.querySelectorAll("#usertable tbody tr")//slecting the all rows in the usertable body

    rows.forEach((row, index) => {
        row.cells[0].innerText = index + 1//updating the serial number of the rows
        console.log(row.cells[0].innerText)
    })
}





function edit(button) {
    
    currentRow = button.closest("tr");//selecting the tr whole row of the button
    formMode="edit";

    currentRow.style.backgroundColor="red";

    let cells = currentRow.cells;//selecting the td inside the row 

    userform.elements["name"].value = cells[1].textContent;//adding the value to the input box form the usertable

    userform.elements["email"].value = cells[2].textContent;

    userform.elements["phonenum"].value = cells[3].textContent;

    userform.elements["dob"].value = cells[4].textContent;

    userform.elements["gender"].value = cells[5].textContent;

    let hobbies = cells[6].innerText.split(",");//hobbies which is added in the row
    
    userform.elements["hobbies"].forEach(hobby => {
        hobby.checked=hobbies.includes(hobby.value) //comparing the data form the table to the form 
        
    });

    userform.elements["education"].value=cells[7].textContent;

    userform.elements["address"].value=cells[8].textContent;

    userform.querySelector("input[type='submit']").value="Update"//when the edit button is clicked submit changed  to "update" 

    cancelbtn.style.display="inline"//add the cancel btn 

}



cancelbtn.addEventListener("click",function(){
if(currentRow){
    currentRow.style.backgroundColor=""; //change the row colur to default color 
    currentRow=null; //reset the current row to null
}
  
   

    formMode="create";//change to formmode to create mode

    userform.reset();//reset the input box in the userform

    userform.querySelector("input[type='submit']").value="Submit";//reset the name after update as button as submit

    cancelbtn.style.display="none"//remove the cancel btn 





})