const cidade = document.querySelector('input#cidade');
const pesquisar = document.querySelector('input#pesquisar');
const mostrarResultados = document.querySelector('div#resultados');

document.querySelector('div#resultados').style.visibility = 'hidden';

const showData = (resultado) => {
    // Alterar dados da pagina vindo do resultado do JSON
    document.querySelector('#nomeCidade').innerHTML = resultado.name;
    document.querySelector('#temperatura').innerHTML = parseInt(resultado.main.temp);
    document.querySelector('#icone').src = `http://openweathermap.org/img/wn/${resultado.weather[0].icon}.png`;
    document.querySelector('#condicao').innerHTML = resultado.weather[0].description;
    document.querySelector('#humidade').innerHTML = parseInt(resultado.main.humidity);
    document.querySelector('#vento').innerHTML = parseInt(resultado.wind.speed);
    // Mostrar o resto da pagina (já alterada)
    mostrarResultados.style.visibility = 'visible';
}

pesquisar.addEventListener('click', (evento) => {
    
    let cidadeNome = cidade.value; // essa variavel pega o valor da input
    let idioma = 'pt_br' // more id: https://openweathermap.org/current#multi
    const medida = 'metric' // 'Default'=Kelvin, 'Metric'=Celsius, 'Imperial'=Fahrenheit
    const key = '73471f972fa8c4a7c03d226d4d699699';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidadeNome}&appid=${key}&units=${medida}&lang=${idioma}`

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
})