document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.sec-main__content__form');
    const result = document.querySelector('.sec-main__content__result');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        result.classList.add('show');
        result.innerHTML = '';

        const tmb = parseFloat(document.getElementById('tmb').value);
        const peso = parseFloat(document.getElementById('peso').value);
        const proteina = parseFloat(document.getElementById('proteina').value);
        const carboidrato = parseFloat(document.getElementById('carboidrato').value);
        const lipidio = parseFloat(document.getElementById('lipidio').value);

        if (isNaN(tmb) || isNaN(peso) || isNaN(proteina) || isNaN(carboidrato)) {
            result.innerHTML = '<p>Por favor, insira valores válidos para TMB, peso, proteína e carboidrato.</p>';
            return;
        }


        let porcentagemTotal = 0;
        let restaPorcentagem = 0;

        const calcProteina = (((proteina * peso)*4) / tmb) * 100;
        porcentagemTotal = (porcentagemTotal+calcProteina);
        let proteinaFinal = (calcProteina/100)*tmb;
        restaPorcentagem = (100-porcentagemTotal)


        const calcCarboidrato = (tmb*(carboidrato/100));
        porcentagemTotal = (porcentagemTotal+carboidrato);
        restaPorcentagem = (100-porcentagemTotal);

        const calcLipidio = (tmb*(lipidio/100));
        porcentagemTotal = (porcentagemTotal+lipidio);
        restaPorcentagem = (100-porcentagemTotal);



        result.innerHTML += `<p><b>Proteína:</b> ${calcProteina.toFixed(1)}%. | ${proteinaFinal.toFixed(1)}kCal. </p>`;
        result.innerHTML += `<p><b>Carboidrato:</b> ${carboidrato.toFixed(1)}%. | ${calcCarboidrato.toFixed(1)}kCal.</p>`;
        result.innerHTML += `<p><b>Lipídio:</b> ${lipidio.toFixed(1)}%. | ${calcLipidio.toFixed(1)}kCal.</p>`;
        result.innerHTML += `<p><b>Porcentagem Total:</b> ${porcentagemTotal.toFixed(1)}%. Ainda Restam:</b> ${restaPorcentagem.toFixed(1)}% </p>`;

    });
});
