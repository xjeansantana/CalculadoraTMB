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
        const lipidioInput = document.getElementById('lipidio');
        let lipidio = parseFloat(lipidioInput.value);

        if (isNaN(tmb) || isNaN(peso) || isNaN(proteina) || isNaN(carboidrato)) {
            result.innerHTML = '<p>Por favor, insira valores válidos para TMB, peso, proteína e carboidrato.</p>';
            return;
        }

        let porcentagemTotal = 0;

        const calcProteina = (((proteina * peso) * 4) / tmb) * 100;
        porcentagemTotal += calcProteina;

        const calcCarboidrato = (carboidrato);
        porcentagemTotal += calcCarboidrato;

        const restaPorcentagem = 100 - porcentagemTotal;

        if (carboidrato !== 0 && !isNaN(restaPorcentagem) && restaPorcentagem >= 0) {
            lipidio = restaPorcentagem;
            lipidioInput.value = lipidio.toFixed(2);
        } else {
            lipidioInput.value = 0;
        }

        const calcLipidio = (tmb * (lipidio / 100));
        porcentagemTotal += lipidio;

        result.innerHTML += `<p><b>Proteína:</b> ${calcProteina.toFixed(1)}%. | ${((calcProteina / 100) * tmb).toFixed(1)}kCal. </p>`;
        result.innerHTML += `<p><b>Carboidrato:</b> ${calcCarboidrato.toFixed(1)}%. | ${(tmb * (calcCarboidrato / 100)).toFixed(1)}kCal.</p>`;
        result.innerHTML += `<p><b>Lipídio:</b> ${lipidio.toFixed(1)}%. | ${calcLipidio.toFixed(1)}kCal.</p>`;
        
    });
});
