/**  Creates a grid from a randomly filled array 
 *   Chris
 *   version 1.0.0  10/1/2022
 *           2.0.0  10/7/2022 rerenders rather than reloads window
 *           2.1.0  11/8/2022 agents have ID and status
 *           3.0.0  11/16/2022 renders using multiple divs instead of one
 *
 *   class RandomAgent:  creates agent with random ID and status 
 *   function randomID():  returns randomized 15 digit agent ID
 *   function randomStatus():  returns randomized agent status
 *   function newCenter():  returns array of offline agents
 *   function updateCenter(array):  returns array with status changes for some 
 *      agents
 *   function toColor(stat):  takes in status and returns color 
 *   function createBoard():  creates initial grid
 *   function createEle():  creates an element
 *   function updateColors(array):  updates grid with changing status colors */
 
const ROWS = 80;
const COLUMNS = 125
const MAX_ID_DIG = 15
const MAX_AGENTS = 10000
const MAX_CHANGES = 1800
const ONE_SEC = 1000
const statusType = ["logged out", "available", "on voice call", 
        "after call work", "on preview task"];
const gridArea = document.querySelector('.grid');
const output = createEle(gridArea, 'div', 'output');

class RandomAgent {
    constructor(agID, agStatus) {
    this.agID = agID
    this.agStatus = agStatus
    }
}

function randomID() {
    let id = ""
    for (let i = 0; i < MAX_ID_DIG; i++) {
        id += Math.floor(Math.random() * 10)
    }
    return id
}

function randomStatus() {
    return statusType[Math.floor(Math.random() * statusType.length)]
}

function newCenter() {
    let a_ray = []
    for (let i = 0; i < MAX_AGENTS; i++) {
        let id = randomID()
        let stat = "offline"
        let agent = new RandomAgent(id, stat)
        a_ray.push(agent)
    }
    return a_ray
}

function updateCenter(array) {
    let a_ray = [...array]
    for (let i = 0; i < MAX_CHANGES; i++) {
        let index = Math.floor(Math.random() * MAX_AGENTS)
        let type = randomStatus()
        a_ray[index].agStatus = type
    }
    return a_ray
}

function toColor(stat) {
    switch(stat) {
        case "logged out":
            return 'fuchsia'
            break
        case "available":
            return 'yellow'
            break
        case "on voice call":
            return 'orange'
            break
        case "after call work":
            return 'lime'
            break
        case "on preview task":
            return 'cyan'
            break
        default:
            return 'black'
    }
}

function createBoard() {
    //let a_ray = [...array];
    const total = ROWS * COLUMNS;
    for (let i = 0; i < total; i++) {
        const temp = createEle(output, 'div', 'box');
        temp.setAttribute('id', i)
        temp.addEventListener('mouseenter', () =>
            console.log('Mouse enter'));
        temp.addEventListener('mouseleave', () =>
            console.log('Mouse leave'));
    }
    output.style.setProperty(`grid-template-columns`, 
        `repeat(${COLUMNS}, 1fr)`);
}

function createEle(parent, eleType, eleClass) {
    const ele = document.createElement(eleType);
    ele.classList.add(eleClass);
    return parent.appendChild(ele);
}

function updateColors(array) {
    let a_ray = [...array]
    for (let i = 0; i < array.length; i++) {
        document.getElementById(i).style.backgroundColor = 
        toColor(a_ray[i].agStatus);
    }
}

//render grid
let idsNew = []
idsNew = newCenter()
createBoard();
window.setInterval(function(){ 
    updateColors(idsNew);
    idsNew = updateCenter(idsNew) //update agent statuses
}, ONE_SEC) //delay between renders