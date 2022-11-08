/**  Creates a grid from a randomly filled array 
 *   Chris
 *   version 1.0.0  10/1/2022
 *           1.1.0  10/7/2022 rerenders rather than reloads window
 * 
 *   class Rectangle:  creates agent rectangles.
 *      draw() draws Rectangle on canvas
 *   class Grid:  creates grid of Rectangles
 *      draw() draws Grid on canvas
 *   newCenter() creates array of offline agents
 *   updateCenter() makes status changes for some agents
 *   colorArray() converts status array to color array */
 
 window.addEventListener('DOMContentLoaded', (event) =>{
    
    const ROWS = 80
	const COLUMNS = 125
    const MAX_AGENTS = 10000
    const MAX_CHANGES = 1800
    const ONE_SEC = 1000
    const REC_W = window.innerWidth/COLUMNS
    const REC_H = window.innerHeight/ROWS
    const statusType = ["logged out", "available", "on voice call", 
        "after call work", "on preview task"];

    const myCanvas = document.getElementById("gridCanvas");
    const myCanvas_context = myCanvas.getContext('2d');

    myCanvas.style.background = "#000000"
    myCanvas.width = window.innerWidth;
    myCanvas.height = window.innerHeight;

    class Rectangle {
        constructor(x, y, height, width, color) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
        }
        draw(){
            myCanvas_context.lineWidth = 5
            myCanvas_context.fillStyle = this.color
            myCanvas_context.strokeStyle = "black"
            myCanvas_context.fillRect(this.x, this.y, this.width, this.height)
            myCanvas_context.strokeRect(this.x, this.y, this.width, this.height)
        }
    }

    class Grid{
        constructor(width, height, array) {
            this.width = width
            this.height = height
            this.x = 0
            this.y = 0
            this.blocks = []
            let agentNumber = 0
            for(let i = 0; this.y < myCanvas.height; i++){
                agentNumber++
                for(let i = 0; this.x < myCanvas.width; i++){
                    agentNumber++
                    if (agentNumber < MAX_AGENTS){
                    let block = new Rectangle(this.x, this.y, this.height,
                        this.width, toColor(array[agentNumber].agStatus))
                    this.blocks.push(block)
                    }
                    this.x+=this.width
                }
                this.y+=this.height
                this.x = 0
            }
        }

        draw(){
            for(let b = 0; b < this.blocks.length; b++){
                this.blocks[b].draw()
            }
        }
    }

    function randomID() {
        let id = ""
        for (let i = 0; i < 15; i++) {
            id += Math.floor(Math.random() * 10)
        }
        return id
    }

    function randomStatus() {
        return statusType[Math.floor(Math.random() * statusType.length)]
    }

    class randomAgent {
        constructor(agID, agStatus) {
        this.agID = agID
        this.agStatus = agStatus
        }
    }

    function newCenter() {
        let a_ray = []
        for (let i = 0; i < MAX_AGENTS; i++) {
            let id = randomID()
            let stat = "offline"
            let agent = new randomAgent(id, stat)
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

    //render grid
    let idsNew = []
    idsNew = newCenter()
    window.setInterval(function(){ 
        let board = new Grid(REC_W, REC_H, idsNew)
        board.draw()
        idsNew = updateCenter(idsNew) //update agent statuses
    }, ONE_SEC) //delay between renders
 })