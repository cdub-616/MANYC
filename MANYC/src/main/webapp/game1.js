/**
 * 
 */
const gamearea = document.querySelector('.gamearea');
const score = createEle(gamearea, 'div', 'Score :', 'score');
const output = createEle(gamearea, 'div', '', 'output');
const game = {x:7, y:6};
createBoard();

function createBoard() {
	const total = game.x * game.y;
	for (let i=0; i<total; i++) {
		const temp = createEle(output, 'div', `${i+1}`, 'box');
		if (i%2) {
			temp.style.backgroundColor = 'red';
		} else {
			temp.style.backgroundColor = 'black';
			temp.style.color = 'white';
		}
	}
	output.style.setProperty(`grid-template-columns`,`repeat(${game.x},1fr)`)
}
function createEle(parent, eleType, html, eleClass) {
	const ele = document.createElement(eleType);
	ele.innerHTML = html;
	ele.classList.add(eleClass);
	return parent.appendChild(ele);
}
