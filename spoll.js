import {
  getDatabase,
  set,
  get,
  ref,
  child,
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";



let searchParams = new URLSearchParams(window.location.href);
console.log(searchParams);
var url_string = window.location.href; 
var url = new URL(url_string);
var id = url.searchParams.get("id");
console.log(id);

const dbRef = ref(getDatabase());

window.pollForm = document.querySelector("#pollForm");
let tt = document.getElementById("poll"),
  title,
  op1,
  op2,
  op3,
  op4,
  c1 = 0,
  c2 = 0,
  c3 = 0,
  c4 = 0,
  flag = 0;
console.log(tt);

const pollData = [
  {
    id: "1",
    option1: "",
    votes: 0,
    color: "rgb(255, 99, 132)",
  },
  {
    id: "2",
    option2: "",
    votes: 0,
    color: "rgb(54, 162, 235)",
  },
  {
    id: "3",
    option3: "",
    votes: 0,
    color: "rgb(36, 36, 36)",
  },
  {
    id: "4",
    option4: "",
    votes: 0,
    color: "rgb(255, 159, 64)",
  },
];

get(child(dbRef, `thepoll/-${id}`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      flag = 1;
      title = snapshot.child("question").val();
      op1 = snapshot.child("option1/name").val();
      op2 = snapshot.child("option2/name").val();
      op3 = snapshot.child("option3/name").val();
      op4 = snapshot.child("option4/name").val();
      c1 = snapshot.child("option1/count").val();
      c2 = snapshot.child("option2/count").val();
      c3 = snapshot.child("option3/count").val();
      c4 = snapshot.child("option4/count").val();
      pollData[0].option1 = op1;
      pollData[0].votes =c1;
      pollData[1].option2 = op2;
      pollData[1].votes =c2;
      pollData[2].option3 = op3;
      pollData[2].votes =c3;
      pollData[3].option4 = op4;
      pollData[3].votes =c4;
      console.log(tt.innerHTML);
      execute();
    } else {
      console.log("No data available");
      if (
        $("#poll").is(":empty") ||
        $("#1").is(":empty") ||
        $("#2").is(":empty") ||
        $("#3").is(":empty") ||
        $("#4").is(":empty")
      ) {
        if ($("#h_btn").attr("hidden")) {
          $("#contain").attr("hidden", "hidden");
          $(".chart-container").attr("hidden", "hidden");
          $("#h_btn").removeAttr("hidden");

          $("#h_btn").click(function () {
            window.location.href = "createPoll.html";
          });
        }
      }

      if (title) {
        $("#h_btn").attr("hidden", "hidden");
        $("#contain").removeAttr("hidden");
      }
    }
  })
  .catch((error) => {
    console.error(error);

    // alert("Error");
  });


  function execute() {
    if (title) {
      tt.innerHTML = title;
      console.log(title);
      document.getElementById("1").innerHTML = op1;
  
      document.getElementById("2").innerText = op2;
  
      document.getElementById("3").innerText = op3;
  
      document.getElementById("4").innerText = op4;
    } else {
      alert("Error,refresh the page");
    }
  
    pollForm.addEventListener("submit", pollFormSubmit);
    var id;
    function pollFormSubmit(event) {
      event.preventDefault();
      const pollOptionInput = pollForm.querySelectorAll(
        "input[name='pollOptions']"
      );
      for (let radioButtons of pollOptionInput)
        if (radioButtons.checked) {
          id = radioButtons.id;
          console.log(id);
        }
  
      if (pollOptionInput) {
        switch (id) {
          case "first":
            pollData[0].votes = c1 +1;
            updateData();
            break;
          case "second":
            pollData[1].votes = c2 + 1;
            updateData();
            break;
          case "third":
            pollData[2].votes = c3 + 1;
            updateData();
            break;
          case "fourth":
            pollData[3].votes = c4 + 1;
            updateData();
            break;
        }
       
  
        pollChart.data.datasets[0].data = pollData.map(
          (pollOption) => pollOption.votes
        );
        console.log(pollChart);
  

        pollChart.update();
        // window.location = window.location;
      }
    }
  
    if ($("#poll").is(":empty")) {
    } else {
      let label1 = op1;
      let label2 = op2;
      let label3 = op3;
      let label4 = op4;
  
      let arr = [label1, label2, label3, label4];
  
      const ctx = document.getElementById("chart").getContext("2d");
      console.log(ctx);
  
      var pollChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: arr.map((pollOption) => pollOption),
          datasets: [
            {
              label: "# of Votes",
              data: pollData.map((pollOption) => pollOption.votes),
              backgroundColor: pollData.map((pollOption) =>
                rgbToRgba(pollOption.color, 0.75)
              ),
              borderWidth: 3,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          title: {
            display: true,
            text: title,
            fontColor: "#333",
            fontSize: 20,
            padding: 20,
          },
          legend: {
            display: false,
          },
        },
      });
    }
  }


function updateData() {
  console.log("Sdf")
  set(child(dbRef, `thepoll/-${id}`), {
    question: title,
    option1: {
      name: op1,
      count: pollData[0].votes,
    },
    option2: {
      name: op2,
      count: pollData[1].votes,
    },
    option3: {
      name: op3,
      count: pollData[2].votes,
    },
    option4: {
      name: op4,
      count:pollData[3].votes,
    },
  }).then(()=>{
    console.log("set");
    pollForm.parentElement.setAttribute("disabled", "true");
    // document.getElementById("bt").style.display = "none";
    // document.getElementById("poll-footer").innerText = "You have Vote Successfully"
  });
}

function rgbToRgba(rgb, alpha = 1) {
  return `rgba(${rgb
    .substring(rgb.indexOf("(") + 1, rgb.length - 1)
    .split(",")
    .join()}, ${alpha})`;
}







