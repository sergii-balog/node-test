const os = require('os');

function systemInfo(){
	console.log(`Total memory: ${(os.totalmem()/1024/1024/1024).toFixed(2)} Gb`);
	console.log(`Free memory: ${(os.freemem()/1024/1024/1024).toFixed(2)} Gb`);
	console.log(`Host name: ${os.hostname()}`);
	console.log(`Platform: ${os.platform()} ${os.release()}`);

}
function pressAnyKey(){
	console.log('\n\nPress any key to exit...');
	process.stdin.setRawMode(true);
	process.stdin.resume();
	process.stdin.on('data', process.exit.bind(process, 0));
}

systemInfo();
pressAnyKey();

