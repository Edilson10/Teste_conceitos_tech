var rodada = 1;
var matriz_jogo = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;

$(document).ready( function(){

	$('#btn_iniciar_jogo').click( function(){

		//valida a digitação dos apelidos dos jogadores
		if($('#entrada_nome_jogador_1').val() == ''){
			alert('Nome do jogador  não foi preenchido');
			return false;
		}

		if($('#entrada_nome_jogador_2').val() == ''){
			alert('Nome do jogador não foi preenchido');
			return false;
		}

		//exibir os apelidos
		$('#nome_jogador_1').html($('#entrada_nome_jogador_1').val());
		$('#nome_jogador_2').html($('#entrada_nome_jogador_2').val());

		//contrala visualização das divs
		$('#pagina_inicial').hide();
		$('#palco_jogo').show();

	});

	$('.jogada').click( function(){

		var id_campo_clicado = this.id;
		jogada(id_campo_clicado);
	});

	function jogada(id){
		var icone = '';
		var ponto = 0;

		if((rodada % 2) == 1){
			icone = 'url("imagens/marcacao_1.png")';
			ponto = -1;
		} else {
			icone = 'url("imagens/marcacao_2.png")';
			ponto = 1;
		}
		
		rodada++;

		$('#'+id).css('background-image', icone);

		var linha_coluna = id.split('-');

		matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;
	
		verifica();

	}
    
	//verificar combinacao
	function verifica(){

		//verifica na horizontal
		var pontos = 0;
		for(var i = 1; i <= 3; i++){
			pontos = pontos + matriz_jogo['a'][i];
		}
		vencedor((pontos));

		pontos = 0;
		for(var i = 1; i <= 3; i++){
			pontos = pontos + matriz_jogo['b'][i];
		}
		vencedor((pontos));

		pontos = 0;
		for(var i = 1; i <= 3; i++){
			pontos = pontos + matriz_jogo['c'][i];
		}
		vencedor((pontos));

		//verifica na vertical
		for(var l = 1; l <= 3; l++){
			pontos = 0;
			pontos += matriz_jogo['a'][l];
			pontos += matriz_jogo['b'][l];
			pontos += matriz_jogo['c'][l];

			vencedor((pontos));
		}

		//verificar na diagonal
		pontos = 0;
		pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
		vencedor((pontos));

		pontos = 0;
		pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
		vencedor((pontos));

	}

	function vencedor(pontos){
		if(pontos == -3){
			var jogada_1 = $('#entrada_nome_jogador_1').val();
			alert(jogada_1 + ' é o vencedor');
			$('.jogada').off();
		
		} else if(pontos == 3){
			var jogada_2 = $('#entrada_nome_jogador_2').val();
			alert(jogada_2 + ' é o vencedor');
			$('.jogada').off();
		}
	}


});