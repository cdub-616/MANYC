/*  Creates a grid from the data pulled from the database
 *  Chris, Ashar
 *  version 1.0.0  10/1/2022
 *          2.0.0  10/7/2022 rerenders rather than reloads window
 *          2.1.0  11/8/2022 agents have ID and status
 *          3.0.0  11/16/2022 renders using multiple divs instead of one
 *          4.0.0  11/25/2022 Removed all functions which were used to create 
 *                            random Agents and displays actual data sent in via 
 *                            postman
 *          4.1.0  11/29/2022 updated tooltip for live grid
 *          4.1.1  12/12/2022 updated status colors
 *
 *   function toColor(stat):  takes in status and returns color
 *   function createBoard():  creates initial grid
 *   function createEle():  creates an element
 *   function updateColors():  updates agent color due to status change
 *   function setUpToolTip:  displays agent ID tooltip
 *   function displayTooltip:  calculates agent ID tooltip position
 *   function fadeOut:  fades out agent ID tooltip
 *   function fadeIn:  fades in agent ID tooltip  */

const ROWS = 80;  //5 for 50, 80 for 10,000
const COLUMNS = 125;  //10 for 50, 125 for 10,000
const ONE_SEC = 1000;
const gridArea = document.querySelector(".grid");
const output = createEle(gridArea, "div", "output");
let tool = false;

function toColor(stat) {
    switch (stat) {
        case "logged out":
            return "rgba(255, 99, 132, 1)";
            break;
        case "available":
            return "rgba(54, 162, 235, 1)";
            break;
        case "on voice call":
            return "rgba(255, 206, 86, 1)";
            break;
        case "after call work":
            return "rgba(75, 192, 19, 1)";
            break;
        case "on preview task":
            return "rgba(153, 102, 255, 1)";
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
    output.style.setProperty(`grid-template-columns`, `repeat(${COLUMNS}, 
        1fr)`);
}

function createEle(parent, eleType, eleClass) {
    const ele = document.createElement(eleType);
    ele.classList.add(eleClass);
    return parent.appendChild(ele);
}

function updateColors(array) {
    for (let i = 0; i < array.length; i++) {
        document.getElementById(i).style.backgroundColor = 
            toColor(array[i].status);
    }
}

let setUpToolTip = function () {
    let tooltip = "",
        toolTipDiv = document.querySelector(".tooltip"),
        toolTipElements = Array.from(document.querySelectorAll(".box")),
        timer;

    let displayTooltip = function (e, obj) {
        tooltip = "agent: " + idsNew[obj.id].ids;
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

    //listen for mouse entering or leaving agent div
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

    //change value of tool based on checkbox status
    const checkBox = document.querySelector("#idCheck");
    checkBox.addEventListener("change", () => {
        if (checkBox.checked) {
            tool = true;
        } else tool = false;
    });
};

//render board and status updates
let idsNew = [];  
createBoard();
window.setInterval(() => {
    //retrieve agent status data 
    fetch("http://localhost:3000/data", {
        method: "GET",
    })
    .then((res) => res.json())
    .then((data) => {
        idsNew = [...data]; 
        updateColors(data);
    });
    setUpToolTip();
}, ONE_SEC);

/*fetch function will fetch all the data. The order in which data 
 travels is (stored in database) --> (pulled to the web via get api) --> 
 (this function fetching from the web using url)*/