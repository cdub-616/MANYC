/**  Creates a grid from a randomly filled array 
 *   Chris Wright
 *   version 1.0.0  10/1/2022
 *   
 *   createGrid() displays grid
 *   createEle() creates element for grid
 *   status_array() randomly fills array with agent status */
 
const gridArea = document.querySelector('.gridArea');
const output = createEle(gridArea, 'div', '', 'output');
const col_row = {x:125, y:80};

createGrid();
//delays 3 seconds and refreshes page
setTimeout(() => { document.location.reload(); }, 3000);

function createGrid() {
	const totalBoxes = col_row.x * col_row.y;
	var agentStatus = [];
	agentStatus = status_array();
	for (let i = 0; i < totalBoxes; i++) {
		const temp = createEle(output, 'div', ``, 'box');
		switch(agentStatus[i]) {  //color based on status
			case "logged out":
			   temp.style.backgroundColor = 'black'; 
			   break;
			case "available":
			   temp.style.backgroundColor = 'white';
			   break;
			case "on voice call":
			   temp.style.backgroundColor = '#1A56FA'; //blue
			   break;
			case "after call work":
			   temp.style.backgroundColor = '#F84E89'; //hot pink
			   break;
			case "on preview task":
			   temp.style.backgroundColor = '#CECBCC'; //light grey
			   break;
		}
	}
	output.style.setProperty(`grid-template-columns`,`repeat(${col_row.x},1fr)`)
}
function createEle(parent, eleType, html, eleClass) {
	const ele = document.createElement(eleType);
	ele.innerHTML = html;
	ele.classList.add(eleClass);
	return parent.appendChild(ele);
}

function status_array () {
   const statusType = ["logged out", "available", "on voice call", 
      "after call work", "on preview task"];
   const status = [];
   for (var i = 0; i < 10000; i++) {
	   status.push(statusType[Math.floor(Math.random() * 5)])
   }
   return status;
}