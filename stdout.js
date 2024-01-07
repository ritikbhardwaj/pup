import { Worker, parentPort, isMainThread } from 'node:worker_threads';
import { stdout } from 'node:process';
import cliSpinners from 'cli-spinners';

let TOTAL=5;
let flag = true;
let progress = 0;
let bar = '|';
let barLen = 20;
for(let i = 0; i < barLen; i++) {
	bar += ' ';
}
bar+= '|';

const replaceAt = (str,index, replacement) => {
	let strr = '|';
	for(let i = 0; i < index; i++) {
		strr+= replacement;
	}
    return strr + str.substring(index + replacement.length);
}

parentPort.on('message', (data) => {
	const { type, value } = data;
	if(type === 'quit') flag = false;
	if(type === 'update') progress += 1;
});

let spinnerFrames=['▁','▃','▄','▅','▆','▇','█','▇','▆','▅','▄','▃'];
spinnerFrames = cliSpinners.simpleDots.frames;

let fac = 0;
let i = 0;
// let loader = loaderStates[0];
setInterval(() => {
	i++
	if(i === spinnerFrames.length) {
		i = 0;
	}
	fac = Math.ceil((progress/TOTAL)*barLen);
	bar = replaceAt(bar,fac+1,'\u2592');
	stdout.write(`\rIn Progress${spinnerFrames[i]} | ${Math.ceil((progress/TOTAL)*100)}% Done`);
},200);
