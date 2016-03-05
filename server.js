var url = require('url');
var http = require('http');
var fs = require('fs');

var server = http.createServer(servidor);

function servidor(requisicao, resposta){
		if(requisicao.url == '/'){
	  resposta.writeHead(200);
	  resposta.end(fs.readFileSync('view/index.html'));
	}else if(requisicao.url != '/index.html') {
		var result = url.parse(requisicao.url, true);
		var pacote = result.query['pacote'];
		var lingua = result.query['lingua'];
		if (pacote == ""){
			pacote = 'com.johnipiresrodrigues.jogodatabuada';
		}
		if (lingua == ""){
			pacote = 'pt_BR';
		}
		var gplay = require('google-play-scraper');
		gplay.reviews(
			{
			appId: pacote,
			page: 0,
			sort: gplay.sort.NEWEST,
			lang : lingua
			}
		).then(function(apps){
			//console.log('Retrieved ' + apps.length + ' reviews!');
			var len = apps.length;
			var html = "<p2><center><b>Pacote : " + pacote + "</b></center></p2><center><p2><b>Lingua : " + lingua + "</b></center></p2></br></br></br>";
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
	}

};

var porta = Number(process.env.PORT || 3000);
server.listen(porta, function(){
  console.log("Servidor On-line");
});