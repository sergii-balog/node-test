const http = require('http');

const server = http.createServer((request, response) => {
	if(request.url == "/"){
		response.write("<h1>Node development server.</h1>");
		response.end();
	}
	if(request.url == "/api/data"){
		response.write(JSON.stringify([{id:2, name: "Suro Namuro"}, {id:5, name: "Yakitaki Shimaki"}], null, " "));
		response.end();
	}
});

const port = 4545;

server.listen(port);

console.log(`Listening on port ${port} ...`);