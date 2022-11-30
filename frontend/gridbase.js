/*  Creates a grid from the data pulled from the database
 *  Chris, Ashar
 *  version 1.0.0  10/1/2022
 *          2.0.0  10/7/2022 rerenders rather than reloads window
 *          2.1.0  11/8/2022 agents have ID and status
 *          3.0.0  11/16/2022 renders using multiple divs instead of one
 *          4.0.0  11/25/2022 Removed all functions which were used to create random Agents
 *                            Displays actual data sent in via postman
 *
 *   function toColor(stat):  takes in status and returns color
 *   function createBoard():  creates initial grid
 *   function createEle():  creates an element
 *   function setUpToolTip:  displays agent ID tooltip
 *   function displayTooltip:  calculates agent ID tooltip position
 *   function fadeOut:  fades out agent ID tooltip
 *   function fadeIn:  fades in agent ID tooltip  */

const ROWS = 80//5;   //original 80
const COLUMNS = 125//10;//original 125
const ONE_SEC = 1000;
const gridArea = document.querySelector(".grid");
const output = createEle(gridArea, "div", "output");
let tool = false;

function toColor(stat) {
  switch (stat) {
    case "logged out":
      return "fuchsia";
      break;
    case "available":
      return "yellow";
      break;
    case "on voice call":
      return "orange";
      break;
    case "after call work":
      return "lime";
      break;
    case "on preview task":
      return "cyan";
      break;
    default:
      return "black";
  }
}
function createBoard() {
  const total = ROWS * COLUMNS;
  for (let i = 0; i < total; i++) {
    const temp = createEle(output, "div", "box");
    temp.setAttribute("id", i);
  }
  output.style.setProperty(`grid-template-columns`, `repeat(${COLUMNS}, 1fr)`);
}
function createEle(parent, eleType, eleClass) {
  const ele = document.createElement(eleType);
  ele.classList.add(eleClass);
  return parent.appendChild(ele);
}
function updateColors(array) {
  for (let i = 0; i < array.length; i++) {
    document.getElementById(i).style.backgroundColor = toColor(array[i].status);
  }
}

let setUpToolTip = function () {
  let tooltip = "",
    toolTipDiv = document.querySelector(".tooltip"),
    toolTipElements = Array.from(document.querySelectorAll(".box")),
    timer;

  let displayTooltip = function (e, obj) {
    tooltip = "agent: " + idsNew[obj.id].ids;//idsNew[obj.id].agID;
    //+ " status: " + idsNew[obj.id].agStatus;  needed later???
    console.log(idsNew);
    toolTipDiv.innerHTML = tooltip;
    let winX = e.clientX; //x position mouse
    let winY = e.clientY; //y position mouse
    let inWid = window.innerWidth;
    let inHt = window.innerHeight;
    if (winY < 0.5 * inHt && winX < 0.5 * inWid) {
      //quad II
      toolTipDiv.style.top = e.pageY + "px";
      toolTipDiv.style.left = e.pageX + "px";
    } else if (winY > 0.5 * inHt && winX < 0.5 * inWid) {
      //quad III
      toolTipDiv.style.top = e.pageY - 75 + "px"; //offset up
      toolTipDiv.style.left = e.pageX + "px";
    } else if (winY < 0.5 * inHt && winX > 0.5 * inWid) {
      //quad I
      toolTipDiv.style.top = e.pageY + "px";
      toolTipDiv.style.left = e.pageX - 250 + "px"; //offset left
    } else {
      //quad IV
      toolTipDiv.style.top = e.pageY - 75 + "px"; //offset up
      toolTipDiv.style.left = e.pageX - 250 + "px"; //offset left
    }
    if (tool) fadeIn(toolTipDiv);
  };

  let fadeOut = function (element) {
    let op = 1;
    if (!timer) {
      timer = setInterval(function () {
        if (op <= 0.1) {
          clearInterval(timer);
          timer = null;
          element.style.opacity = 0;
          element.style.display = "none";
        }
        element.style.opacity = op;
        op -= op * 0.1;
      }, 10);
    }
  };

  let fadeIn = function (element) {
    let op = 0.1;
    element.style.display = "block";
    let timer = setInterval(function () {
      if (op >= 1) {
        clearInterval(timer);
      }
      element.style.opacity = op;
      op += op * 0.1;
    }, 10);
  };

  //listens for mouse entering or leaving agent div
  toolTipElements.forEach(function (elem) {
    let timeout;
    if (tool) {
      elem.addEventListener("mouseenter", function (e) {
        let that = this;
        timeout = setTimeout(function () {
          displayTooltip(e, that);
        }, 400);
      });
      elem.addEventListener("mouseleave", function (e) {
        clearTimeout(timeout);
        fadeOut(toolTipDiv);
      });
    }
  });

  //changes value of tool based on checkbox status
  const checkBox = document.querySelector("#idCheck");
  checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
      tool = true;
    } else tool = false;
  });
};

let idsNew = [];
createBoard();
window.setInterval(() => {
  fetch("http://localhost:3000/data", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
        //console.log(data);
        //console.log(data[0].ids);
        idsNew = [...data];
        //console.log(data[0]);
        //console.log(idsNew[0]);
      updateColors(data);
    });
    setUpToolTip();
}, ONE_SEC);

/*fetch function will fetch all the data. The order in which data 
 travels is (stored in database) --> (pulled to the web via get api) --> 
 (this function fetching from the web using url)*/
