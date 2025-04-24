const API_URL = 'https://6807fea7942707d722dd0b44.mockapi.io/senhas';

export async function getSenhas() {
    const res = await fetch(API_URL);
    return await res.json();
}

export async function getUltimaSenha() {
    const senhas = await getSenhas();
    if (senhas.length === 0) return { mensagem: 'Nenhuma senha gerada ainda.' };
    senhas.sort((a, b) => b.id - a.id);
    return senhas[0];
}

export async function getSenhaAleatoria() {
    const senhas = await getSenhas();
    if (senhas.length === 0) return { mensagem: 'Nenhuma senha gerada ainda.' };
    const indice = Math.floor(Math.random() * senhas.length);
    return senhas[indice];
}

export async function salvarSenha(senhaObj) {
    return await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(senhaObj)
    });
}
