export function atualizarValorTamanho(tamanhoInput, span) {
    span.textContent = tamanhoInput.value;
}

export function exibirSenhaNaTela(elemento, tipo, senhaObj) {
    elemento.innerHTML = `<strong>${tipo}:</strong> ${senhaObj.senha} <br><strong>Data:</strong> ${senhaObj.data}`;
}

export function copiarSenha(input) {
    const senha = input.value;
    if (senha) {
        navigator.clipboard.writeText(senha).then(() => {
            alert('Senha copiada para a área de transferência!');
        }).catch(() => {
            alert('Erro ao copiar a senha.');
        });
    }
}

export async function atualizarLista(lista, senhas) {
    lista.innerHTML = '';
    senhas.sort((a, b) => new Date(b.data) - new Date(a.data));
    senhas.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.senha} (Gerada em: ${item.data})`;
        lista.appendChild(li);
    });
}
