/**  Creates a grid from a randomly filled array 
 *   Chris Wright
 *   version 1.0.0  10/1/2022
 *   
 *   createGrid() displays grid
 *   createEle() creates element for grid
 *   status_array() randomly fills array with agent status */
 
 window.addEventListener('DOMContentLoaded', (event) =>{
    
    let keysPressed = {}

    document.addEventListener('keydown', (event) => {
        keysPressed[event.key] = true;
     });
     
     document.addEventListener('keyup', (event) => {
         delete keysPressed[event.key];
      });

    let tutorial_canvas = document.getElementById("tutorial");
    let tutorial_canvas_context = tutorial_canvas.getContext('2d');

    tutorial_canvas.style.background = "#000000"


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
            tutorial_canvas_context.lineWidth = 5
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.strokeStyle = "black"
            tutorial_canvas_context.fillRect(this.x, this.y, this.width, this.height)
            tutorial_canvas_context.strokeRect(this.x, this.y, this.width, this.height)
        }
        move(){
            this.x+=this.xmom
            this.y+=this.ymom
        }
    }
    class Circle{
        constructor(x, y, radius, color, xmom = 0, ymom = 0){
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.lens = 0
        }       
         draw(){
            tutorial_canvas_context.lineWidth = 0
            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI*2), true)
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fill()
            tutorial_canvas_context.stroke(); 
        }
        move(){
            this.x += this.xmom
            this.y += this.ymom
        }
    }

    class Grid{
        //constructor(width, height, color){
        constructor(width, height, array) {
            this.width = width
            this.height = height
            let agents = []
            agents = [...array]
            this.x = 0
            this.y = 0
            this.blocks = []
            let count = 0
            for(let q = 0; this.y<tutorial_canvas.height; q++){
                count++
                for(let q = 0; this.x<tutorial_canvas.width; q++){
                    count++
                    let agentNumber = count
                    //console.log(this.x)
                    //console.log(this.y)
                    console.log(agentNumber)
                    //let block = new Rectangle(this.x, this.y, this.height, this.width, color)
                    if (count<=10080){
                    let block = new Rectangle(this.x, this.y, this.height, this.width, agents[agentNumber])
                    this.blocks.push(block)
                    }
                    this.x+=this.width
                }
                this.y+=this.height
                this.x = 0
            }
            //console.log(count)
        }
        draw(){
            for(let b = 0; b<this.blocks.length; b++){
                this.blocks[b].draw()
            }
        }
    }

    class Agent{
        constructor(grid, color){
            this.grid = grid
            this.body = new Circle(10,10,Math.min(this.grid.width/4, this.grid.height/4), color)
            this.location = this.grid.blocks[Math.floor(Math.random()*this.grid.blocks.length)]
        }
        draw(){
            this.control()
            this.body.x = this.location.x + this.location.width/2
            this.body.y = this.location.y + this.location.height/2
            this.body.draw()
        }
        control(){
            if(keysPressed['w']){
                this.body.y -= this.grid.height
            }
            if(keysPressed['a']){
                this.body.x -= this.grid.width
            }
            if(keysPressed['s']){
                this.body.y += this.grid.height
            }
            if(keysPressed['d']){
                this.body.x += this.grid.width
            }

            for(let g = 0;g<this.grid.blocks.length; g++){
                if(this.body.x > this.grid.blocks[g].x){
                    if(this.body.y > this.grid.blocks[g].y){
                        if(this.body.x < this.grid.blocks[g].x+this.grid.blocks[g].width){
                            if(this.body.y < this.grid.blocks[g].y+this.grid.blocks[g].height){
                                if(this.grid.blocks[g].color != "red"){
                                    this.location = this.grid.blocks[g]
                                }
                            }  
                        }  
                    }
                }


            }


        }

    }

	const ROWS = 80
	const COLUMNS = 125
	const SCRN_W = 1900
	const SCRN_H = 1010
	const REC_W = SCRN_W/COLUMNS
	const REC_H = SCRN_H/ROWS
    const statusType = ["logged out", "available", "on voice call", "after call work", "on preview task"];

    function newCenter(array) {
        let a_ray = [...array]
        for (let i=0; i<10080; i++) {
            a_ray.push("offline")
            //a_ray.push("blue")
        }
        /*for (let i=0; i<10080; i++) {
            //ids.push("blue")
            ids.push("available")
        }*/
        return a_ray
    }

    function updateCenter(array) {
        let a_ray = [...array]
        let count = 0
        for (let i=0; i<10080; i++) {
            //let index = Math.floor(Math.random() * 10080)
            let type = statusType[Math.floor(Math.random() * 5)]
            //a_ray[index] = type
            a_ray[i] = type
            //console.log(a_ray[index])
            count++
        }
        //a_ray[9999] += count;
        //console.log(a_ray[9999])
        return a_ray
    }

    function colorArray(array) {
        let a_ray = array
        for (let i=0; i<10080; i++) {
            //console.log(a_ray[i])
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
        //console.log(a_ray)
        return a_ray
    }
    let ids = []
    let idsNew = []
    let idsColor = []
    let idsUpdateColor = []
    
    idsNew = newCenter(ids)
    //idsNew = updateCenter(ids)
    //console.log(idsNew[9999])
    //idsNew = updateCenter(idsNew)
    //console.log(idsNew[9999])
    //idsColor = updateCenter(idsNew)
    //idsUpdateColor = colorArray(idsColor)
    //let board = new Grid(REC_W, REC_H, ids)
    //let board = new Grid(REC_W, REC_H, "red")
    let boardInit = new Grid(REC_W, REC_H, colorArray(idsNew))
    //let board = new Grid(REC_W, REC_H, idsUpdateColor)
    //let board = new Grid(REC_W, REC_H, idsNew)
    //console.log(ids)
    //console.log(idsNew)
    //console.log(idsColor)
    //console.log(colorArray(idsColor))
    //console.log(idsUpdateColor)
    boardInit.draw()
    //idsNew = updateCenter(idsNew)
    setTimeout(() => {
        window.setInterval(function(){ 
            let count = 0
            //console.log(idsColor)
            //idsColor = updateCenter(idsNew)
            //console.log(idsColor)
            idsNew = updateCenter(idsNew)
            //let board = new Grid(REC_W, REC_H, colorArray(idsColor))
            let board = new Grid(REC_W, REC_H, colorArray(idsNew))
            board.draw()
            console.log(count)
            count ++
        }, 1000)
    , 1000}) 
    /*function model() {
        setTimeout(() => {
            //window.setInterval(function(){
                idsNew = updateCenter(idsNew)
                console.log(idsNew[9999])
                let board = new Grid(REC_W, REC_H, colorArray(idsNew))
                board.draw()
                model()
            //}, 1000)
        , 1000})
    } */  
 })