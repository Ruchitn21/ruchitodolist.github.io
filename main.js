
function getandupdate() {
    title= document.getElementById("title").value;
    desc= document.getElementById("description").value;
    a= new Date();
    time= a.getHours()+" : "+a.getMinutes();
    date= a.getDate()+" / "+(a.getMonth()+1)+" / "+a.getFullYear()+" at "+time;

    if (localStorage.getItem("itemJson")==null)
    {
        
        itemJsonArray= [];
        itemJsonArray.push([title,desc,date]);
        localStorage.setItem("itemJson",JSON.stringify(itemJsonArray));
    }
    else
    {
        itemJsonArrayStr= localStorage.getItem("itemJson");
        itemJsonArray= JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([title,desc,date]);
        localStorage.setItem("itemJson",JSON.stringify(itemJsonArray));
        
    }
    update();   

}

function update(){
    if (localStorage.getItem('itemJson')==null){
        itemJsonArray = []; 
        localStorage.setItem('itemJson', JSON.stringify(itemJsonArray))
    } 
    else{
        itemJsonArrayStr = localStorage.getItem('itemJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr); 
    }
    // Populate the table
    let tableBody = document.getElementById("table-body");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td> 
        <td>${element[2]}</td>
        <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td> 
        </tr>`; 
    });
    tableBody.innerHTML = str;
}

ele= document.getElementById("add-button");
ele.addEventListener("click",getandupdate);
update();

function deleted(itemIndex){
    console.log("Delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem('itemJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 2);
    localStorage.setItem('itemJson', JSON.stringify(itemJsonArray));
    update();

}

function clearStorage(){

    localStorage.clear();
    update()
    }