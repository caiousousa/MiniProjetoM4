import { gerarSenha } from './senhaUtils.js';
import { getSenhas, getUltimaSenha, getSenhaAleatoria, salvarSenha } from './api.js';
import { atualizarValorTamanho,exibirSenhaNaTela,copiarSenha,atualizarLista } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    const btnTodas = document.getElementById('btnTodas');
    const btnUltima = document.getElementById('btnUltima');
    const btnAleatoria = document.getElementById('btnAleatoria');
    const respostaApi = document.getElementById('respostaApi');
    const copiarBotao = document.getElementById('copiarSenha');
    const senhaGeradaInput = document.getElementById('senhaGerada');
    const tamanhoSenhaInput = document.getElementById('tamanhoSenha');
    const valorTamanhoSpan = document.getElementById('valorTamanho');
    const maiusculas = document.getElementById('maiusculas');
    const minusculas = document.getElementById('minusculas');
    const numeros = document.getElementById('numeros');
    const simbolos = document.getElementById('simbolos');
    const gerarSenhaBotao = document.getElementById('gerarSenha');
    const listaSenhasUl = document.getElementById('listaSenhas');

    tamanhoSenhaInput.addEventListener('input', () => {
        atualizarValorTamanho(tamanhoSenhaInput, valorTamanhoSpan);
    });

    btnTodas.addEventListener('click', async () => {
        const dados = await getSenhas();
        if (dados.length === 0) {
            respostaApi.innerHTML = '<em>Nenhuma senha gerada ainda.</em>';
            return;
        }
    
        respostaApi.innerHTML = `<strong>Todas as senhas:</strong><br><br>` +
            dados
                .sort((a, b) => new Date(b.data) - new Date(a.data))
                .map(s => `• ${s.senha} <br><strong>Gerada em: ${s.data}</strong>`)
                .join('<br><br>');
    
        document.getElementById('listaSenhas').style.display = 'none'; // Oculta a lista, se estiver usando
    });
    

    btnUltima.addEventListener('click', async () => {
        const dados = await getUltimaSenha();
        exibirSenhaNaTela(respostaApi, 'Última senha', dados);
        document.getElementById('secaoSenhas').style.display = 'none';
    });

    btnAleatoria.addEventListener('click', async () => {
        const dados = await getSenhaAleatoria();
        exibirSenhaNaTela(respostaApi, 'Senha aleatória', dados);
        document.getElementById('secaoSenhas').style.display = 'none';
    });

    copiarBotao.addEventListener('click', () => copiarSenha(senhaGeradaInput));

    gerarSenhaBotao.addEventListener('click', async () => {
        const senha = gerarSenha(
            parseInt(tamanhoSenhaInput.value),
            maiusculas.checked,
            minusculas.checked,
            numeros.checked,
            simbolos.checked
        );

        senhaGeradaInput.value = senha;

        if (senha) {
            const obj = {
                senha,
                data: new Date().toLocaleString()
            };

            await salvarSenha(obj);

            const senhas = await getSenhas();
            atualizarLista(listaSenhasUl, senhas);
        }
    });

    // Atualiza a lista ao carregar
    (async () => {
        const senhas = await getSenhas();
        atualizarLista(listaSenhasUl, senhas);
    })();
});
