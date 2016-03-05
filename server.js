var http = require('http');
var fs = require('fs');

var server = http.createServer(servidor);

function servidor(requisicao, resposta){
	var gplay = require('google-play-scraper');


	gplay.reviews(
		{
		appId: 'com.johnipiresrodrigues.jogodatabuada',
		page: 0,
		sort: gplay.sort.NEWEST,
		lang : 'en'
		}
	).then(function(apps){
		//console.log('Retrieved ' + apps.length + ' reviews!');
		var len = apps.length;
		var html = "";
		for (i = 0; i < len; i++) { 
			var resultado = apps[i];
			html += "<p1>"+ i +" ||Data : "+ resultado.date+" ||Score : " + resultado.score + " || Comentario : " + resultado.text + "</p1></br>";
		}
		resposta.writeHead(200);
		resposta.end(html);
	}).catch(function(e){
		console.log('There was an error fetching the reviews!');
		resposta.writeHead(404);
		resposta.end("Erro");
	});

};

var porta = Number(process.env.PORT || 3000);
server.listen(porta, function(){
  console.log("Servidor On-line");
});