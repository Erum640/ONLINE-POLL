import {
  getDatabase,
  ref,
  push,
  update,
  remove,
  set
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

const db = getDatabase();

var create = document.getElementById("save");
console.log(create);
function copyLink() {
  /* Get the text field */
  var copyText = document.getElementById("poll-link");

  /* Select the text field */
  copyText.innerText;
  

   /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.innerText);

  /* Alert the copied text */
  alert("Copied the text: " + copyText.innerText);
}

function InsertData() {
  if (
    $.trim($("#p1-input").val()) == "" ||
    $.trim($("#cn1-inp").val()) == "" ||
    $.trim($("#cn2-inp").val()) == "" ||
    $.trim($("#cn3-inp").val()) == "" ||
    $.trim($("#cn4-inp").val()) == ""
  ) {
    alert("Input can not be left blank");
  } else {
   
    var pollname = document.getElementById("p1-input").value;
    var op1 = document.getElementById("cn1-inp").value;
    var op2 = document.getElementById("cn2-inp").value;
    var op3 = document.getElementById("cn3-inp").value;
    var op4 = document.getElementById("cn4-inp").value;
    console.log(pollname, op1, op2, op3);

    const newPollRef = push(ref(db, "thepoll"));
    console.log(newPollRef.key)
    set(newPollRef, {
      question: pollname,
      option1: {
        name: op1,
        count: 0,
      },
      option2: {
        name: op2,
        count: 0,
      },
      option3: {
        name: op3,
        count: 0,
      },
      option4: {
        name: op4,
        count: 0,
      },
    })
      .then(() => {
        // alert("data stored successfully");
        console.log("hello");

        const el =document.getElementById("create-poll-form")
        el.innerHTML=`<h3>Your Poll has Been Created Sucessfully</h3>
        
        <div><div id="plldt">Poll Name : ${pollname}</div>
        <div id="pll">Option 1: ${op1}</div>
        <div id="pll">Option 2: ${op2}</div>
        <div id="pll">Option 3: ${op3}</div>
        <div id="pll">Option 4: ${op4}</div><div>
       <div id="poll-link">${window.location.host + '/spoll.html?id='+newPollRef.key.substring(1)}</div> <button id="share-btn">Share</button>`
      document.getElementById("share-btn").addEventListener("click",copyLink);

       
      })

      
      .catch((error) => {
        alert("unsuccessful, error" + error);
      });

     //window.location.href = "spoll.html";
  }
}


create.addEventListener("click", InsertData);
