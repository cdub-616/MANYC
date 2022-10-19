/**  Creates a grid from a randomly filled array 
 *   Chris Wright
 *   version 1.0.0  10/1/2022
 *   
 *   createGrid() displays grid
 *   createEle() creates element for grid
 *   status_array() randomly fills array with agent status */
 
 window.addEventListener('DOMContentLoaded', (event) =>{
    
    const ROWS = 80
	const COLUMNS = 125
	const SCRN_W = 1900
	const SCRN_H = 1010
	const REC_W = SCRN_W/COLUMNS
	const REC_H = SCRN_H/ROWS
    const statusType = ["logged out", "available", "on voice call", "after call work", "on preview task"];

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
            let agents = []
            agents = [...array]
            this.x = 0
            this.y = 0
            this.blocks = []
            let count = 0
            for(let q = 0; this.y<myCanvas.height; q++){
                count++
                for(let q = 0; this.x<myCanvas.width; q++){
                    count++
                    let agentNumber = count
                    if (count<=10080){
                    let block = new Rectangle(this.x, this.y, this.height, this.width, agents[agentNumber])
                    this.blocks.push(block)
                    }
                    this.x+=this.width
                }
                this.y+=this.height
                this.x = 0
            }
        }

        draw(){
            for(let b = 0; b<this.blocks.length; b++){
                this.blocks[b].draw()
            }
        }
    }

	

    function newCenter(array) {
        let a_ray = [...array]
        for (let i=0; i<10080; i++) {
            a_ray.push("offline")
        }
        return a_ray
    }

    function updateCenter(array) {
        let a_ray = [...array]
        for (let i=0; i<1800; i++) {
            let index = Math.floor(Math.random() * 10080)
            let type = statusType[Math.floor(Math.random() * 5)]
            a_ray[index] = type
        }
        return a_ray
    }

    function colorArray(array) {
        let a_ray = array
        for (let i=0; i<10080; i++) {
            switch(a_ray[i]) {  //color based on status
                case "logged out":
                    a_ray[i] = 'red';
                    break;
                case "available":
                    a_ray[i] = 'orange';
                    break;
                case "on voice call":
                    a_ray[i] = 'yellow';
                    break;
                case "after call work":
                    a_ray[i] = 'green';
                    break;
                case "on preview task":
                    a_ray[i] = 'blue';
                    break;
                default:
                    a_ray[i] = 'black';
            }
        }
        return a_ray
    }

    let idsNew = []
    idsNew = newCenter(idsNew)
    let boardInit = new Grid(REC_W, REC_H, colorArray(idsNew))
    let board = new Grid(REC_W, REC_H, colorArray(idsNew))
    boardInit.draw()
    setTimeout(() => {
        window.setInterval(function(){ 
            //let count = 0
            idsNew = updateCenter(idsNew)
            let board = new Grid(REC_W, REC_H, colorArray(idsNew))
            board.draw()
            //count ++
        }, 1000)
    , 1000}) 
 })