(() => {
    const form = document.querySelector('.sec-main__content__form');
    const result = document.querySelector('.sec-main__content__result');
    const tmbInput = document.querySelector('.sec-main__content__form__input#tmb');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        result.classList.add('show');
        result.innerHTML = '';

        const peso = parseFloat(document.querySelector('.sec-main__content__form__input#peso').value);
        const altura = parseFloat(document.querySelector('.sec-main__content__form__input#altura').value);
        const idade = parseInt(document.querySelector('.sec-main__content__form__input#idade').value, 10);
        const proteina = parseFloat(document.getElementById('proteina').value);
        const carboidrato = parseFloat(document.getElementById('carboidrato').value);
        const lipidioInput = document.getElementById('lipidio');
        let lipidio = parseFloat(lipidioInput.value);

        if (isNaN(peso) || isNaN(altura) || isNaN(idade) || isNaN(proteina) || isNaN(carboidrato) || isNaN(lipidio)) {
            result.innerHTML = '<p>Por favor, insira valores válidos para peso, altura, idade, proteína, carboidrato e lipídio.</p>';
            return;
        }

        const radiobtns = document.querySelectorAll('.sec-main__content__form__radio input');

        const getTmbMasc = 66.5 + (13.8 * peso) + (5 * altura) - (6.8 * idade);
        const getTmbFem = 655.1 + (9.6 * peso) + (1.9 * altura) - (4.7 * idade);
        const getImc = (peso / (altura * altura)) * 10000;
        const getQtdAgua = 0.035 * peso;
        const getCreatina = 0.07 * peso;
        const getProtein = peso * 2.0;

        let getGender = '';
        let pesoIdeal = 0;
        let tmb = 0;
        let porcentagemTotal = 0;
        let calcPeso = 0;

        if (getImc < 18.5) {
            result.innerHTML += `<p><b>Índice de Massa Corporal (IMC):</b> ${getImc.toFixed(2)} abaixo do peso ideal.</p>`;
        } else if (getImc >= 18.5 && getImc < 25) {
            result.innerHTML += `<p><b>Índice de Massa Corporal (IMC):</b> ${getImc.toFixed(2)} peso ideal.</p>`;
        } else if (getImc >= 25 && getImc < 30) {
            result.innerHTML += `<p><b>Índice de Massa Corporal (IMC):</b> ${getImc.toFixed(2)} acima do peso.</p>`;
        } else if (getImc >= 30 && getImc < 35) {
            result.innerHTML += `<p><b>Índice de Massa Corporal (IMC):</b> ${getImc.toFixed(2)} obesidade grau I.</p>`;
        } else if (getImc >= 35 && getImc < 40) {
            result.innerHTML += `<p><b>Índice de Massa Corporal (IMC):</b> ${getImc.toFixed(2)} obesidade grau II.</p>`;
        } else {
            result.innerHTML += `<p><b>Índice de Massa Corporal (IMC):</b> ${getImc.toFixed(2)} obesidade grau III (mórbida).</p>`;
        }

        radiobtns.forEach((el) => {
            if (el.id === 'genderMasc' && el.checked) {
                result.innerHTML += `<p><b>Taxa Metabólica Basal (TMB):</b> ${getTmbMasc.toFixed(2)} calorias.</p>`;
                getGender = 'M';
                pesoIdeal = 22 * ((altura / 100) * (altura / 100));
                calcPeso = (peso-pesoIdeal);
                const tmbValue = parseFloat(tmbInput.value);
                if (isNaN(tmbValue) || tmbValue === 0) {
                    tmbInput.value = getTmbMasc.toFixed(2); // Define o valor do campo de entrada de texto
                    tmb = getTmbMasc; // Use este valor para os cálculos
                } else {
                    tmb = tmbValue;
                }
            } else if (el.id === 'genderFem' && el.checked) {
                result.innerHTML += `<p><b>Taxa Metabólica Basal (TMB):</b> ${getTmbFem.toFixed(2)} calorias.</p>`;
                getGender = 'F';
                pesoIdeal = 21 * ((altura / 100) * (altura / 100));
                calcPeso = (peso-pesoIdeal);
                const tmbValue = parseFloat(tmbInput.value);
                if (isNaN(tmbValue) || tmbValue === 0) {
                    tmbInput.value = getTmbFem.toFixed(2); // Define o valor do campo de entrada de texto
                    tmb = getTmbFem; // Use este valor para os cálculos
                } else {
                    tmb = tmbValue;
                }
            }
        });

       /* radiobtns.forEach((el, i, arr) => {
            if (el.id === 'atvFisS' && el.checked) {
                arr.forEach((item) => {
                    if (item.id === 'objPeso' && item.checked) {
                        if (getGender === 'F') {
                            result.innerHTML += `<p><b>Dieta Recomendada:</b> ${(tmb - (tmb * 0.1081)).toFixed(2)} calorias por dia.</p>`;
                        } else if (getGender === 'M') {
                            result.innerHTML += `<p><b>Dieta Recomendada:</b> ${(tmb - (tmb * 0.1081)).toFixed(2)} calorias por dia.</p>`;
                        }
                    } else if (item.id === 'objHiper' && item.checked) {
                        if (getGender === 'F') {
                            result.innerHTML += `<p><b>Dieta Recomendada:</b> ${(tmb + (tmb * 0.30)).toFixed(2)} calorias por dia.</p>`;
                        } else if (getGender === 'M') {
                            result.innerHTML += `<p><b>Dieta Recomendada:</b> ${(tmb + (tmb * 0.30)).toFixed(2)} calorias por dia.</p>`;
                        }
                        result.innerHTML += `<p><b>QTD. de Proteína Recomendada: </b> ${getProtein.toFixed(1)}g por dia.</p>`;
                        result.innerHTML += `<p><b>QTD. de Creatina Recomendada: </b> ${getCreatina.toFixed(1)}g por dia.</p>`;
                    }
                });
            } else if (el.id === 'atvFisN' && el.checked) {
                arr.forEach((item) => {
                    if (item.id === 'objPeso' && item.checked) {
                        if (getGender === 'F') {
                            result.innerHTML += `<p><b>Dieta Recomendada:</b> ${(tmb - (tmb * 0.1081)).toFixed(2)} calorias por dia.</p>`;
                        } else if (getGender === 'M') {
                            result.innerHTML += `<p><b>Dieta Recomendada:</b> ${(tmb - (tmb * 0.1081)).toFixed(2)} calorias por dia.</p>`;
                        }
                    } else if (item.id === 'objHiper' && item.checked) {
                        if (getGender === 'F') {
                            result.innerHTML += `<p><b>Dieta Recomendada:</b> ${(tmb + (tmb * 0.30)).toFixed(2)} calorias por dia.</p>`;
                        } else if (getGender === 'M') {
                            result.innerHTML += `<p><b>Dieta Recomendada:</b> ${(tmb + (tmb * 0.30)).toFixed(2)} calorias por dia.</p>`;
                        }
                    }
                });
            }
        }); */


        if (getGender) {
            result.innerHTML += `<p><b>Peso Ideal:</b> Ideal: ${pesoIdeal.toFixed(2)} kg. | Objetivo: -${calcPeso.toFixed(2)}kg</p>`;
        }

        const calcProteina = (((proteina * peso) * 4) / tmb) * 100;
        console.log(calcProteina);
        porcentagemTotal += calcProteina;

        const calcCarboidrato = carboidrato;
        porcentagemTotal += calcCarboidrato;

        const restaPorcentagem = (100 - porcentagemTotal);

        if (carboidrato !== 0 && !isNaN(restaPorcentagem) && restaPorcentagem >= 0) {
            lipidio = restaPorcentagem;
            lipidioInput.value = lipidio.toFixed(1);
        } else {
            lipidioInput.value = 0;
        }

        const calcLipidio = tmb * (lipidio / 100);

        result.innerHTML += `<p><b>Proteína:</b> ${calcProteina.toFixed(1)}%. | ${((calcProteina / 100) * tmb).toFixed(1)}kCal. </p>`;
        result.innerHTML += `<p><b>Carboidrato:</b> ${calcCarboidrato.toFixed(1)}%. | ${(tmb * (calcCarboidrato / 100)).toFixed(1)}kCal.</p>`;
        result.innerHTML += `<p><b>Lipídio:</b> ${lipidio.toFixed(1)}%. | ${calcLipidio.toFixed(1)}kCal.</p>`;


        result.innerHTML += `<p><b>QTD. de Água Recomendada:</b> ${getQtdAgua.toFixed(1)}L por dia.</p>`;
    });
})();
