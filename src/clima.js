const pesquisa = document.querySelector('input#pesquisa');
const cartao = document.querySelector('div.cartao');
const cartaoBg = document.querySelector('div.cartaoBg');

// 2 - Quando a url da API for acessada, executar essa função:
const showData = (resultado) => {
    
    // Alterar dados no DOM vindo do resultado do JSON
    document.querySelector('#cidade').innerHTML = resultado.name;
    document.querySelector('#temperatura').innerHTML = parseInt(resultado.main.temp) + '<sup><small>ºC</small></sup>';
    document.querySelector('#icone').src = `https://openweathermap.org/img/wn/${resultado.weather[0].icon}@4x.png`;
    cartaoBg.style.background = `url('https://openweathermap.org/img/wn/${resultado.weather[0].icon}@4x.png') no-repeat center`;
    cartaoBg.style.backgroundSize = '100%';
    document.querySelector('#condicao').innerHTML = resultado.weather[0].description;
    document.querySelector('#umidade').innerHTML = '<strong>Umidade: </strong>' + parseInt(resultado.main.humidity) + '%';
    document.querySelector('#vento').innerHTML = '<strong>Vento: </strong>' + parseInt(resultado.wind.speed) + ' km/h';
    
    // Mostrar o resto da pagina (já alterada)
    cartao.style.visibility = 'visible';
    cartaoBg.style.visibility = 'visible';
}

// 1 - Quando pressionar o enter, executar essa função:
pesquisa.addEventListener('keyup', (evento) => {
    
    if (evento.keyCode === 13) { // codigo da tecla pressionada (13 = enter)

        let cidade = pesquisa.value; // essa variavel pega o valor da input
        let idioma = 'pt_br' // more id: https://openweathermap.org/current#multi
        const medida = 'metric' // 'Default'=Kelvin, 'Metric'=Celsius, 'Imperial'=Fahrenheit
        const key = '73471f972fa8c4a7c03d226d4d699699';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&units=${medida}&lang=${idioma}`

        // opções do tipo (objeto, um array com mais possibilidades)
        const options = {
            method: 'GET', // metodo de acesso (get,post,put..)
            mode: 'cors', // pedir para entrar na porta (origem/servidor diferente)
            cache: 'default' // o dado so é atualizado se for difente do salvo
        }

        // acesse a esta URL, com essas opções:
        fetch(url, options)
            // se der CERTO: me mostre no formato JSON
        .then(resposta => {resposta.json()
            // deu certo no formato JSON? > executar essa função
            .then (dados => {
                //console.log(dados);
                showData(dados);
            })
        })
            // se der ERRADO: > mostrar erro!
            .catch(evento => alert('deu erro: '+ evento, message))
}})