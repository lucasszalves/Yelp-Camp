// const fs = require('fs')

// let municipios = require('./municipios.json')
// const ufs = require('./estados.json')
// let estados = [];
// for (let uf of ufs) {
//     estados.push({ estado: uf.nome, cod_uf: uf.codigo_uf })
// }

// for (let municipio of municipios) {
//     const estado = estados.filter(estado => (estado.cod_uf === municipio.codigo_uf));
//     municipio.estado = estado[0].estado
// }

// const jsonString = JSON.stringify(municipios, null, 2);

// fs.writeFile('municipios_com_estados.json', jsonString, 'utf8', (err) => {
//     if (err) {
//         console.error('Erro ao escrever o arquivo:', err);
//         return;
//     }
//     console.log('Arquivo JSON salvo com sucesso!');
// });

// ^^^ pra inserir o estado nas cidades hehe

module.exports = require('./municipios_com_estados.json')