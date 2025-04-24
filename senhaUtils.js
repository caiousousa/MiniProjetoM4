export function gerarSenha(tamanho, maiusculas, minusculas, numeros, simbolos) {
    let caracteres = '';
    if (maiusculas) caracteres += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (minusculas) caracteres += 'abcdefghijklmnopqrstuvwxyz';
    if (numeros) caracteres += '0123456789';
    if (simbolos) caracteres += '!@#$%^&*()_+=-`~[]\\{}|;\':",./<>?';

    let senha = '';
    if (caracteres.length === 0) return '';

    for (let i = 0; i < tamanho; i++) {
        const index = Math.floor(Math.random() * caracteres.length);
        senha += caracteres.charAt(index);
    }

    return senha;
}
