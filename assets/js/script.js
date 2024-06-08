(() => {
    const form = document.querySelector('.sec-main__content__form');
    const result = document.querySelector('.sec-main__content__result');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        result.classList.add('show');
        result.innerHTML = '';

        const peso = parseFloat(document.querySelector('.sec-main__content__form__input#peso').value);
        const altura = parseFloat(document.querySelector('.sec-main__content__form__input#altura').value);
        const idade = parseInt(document.querySelector('.sec-main__content__form__input#idade').value, 10);

        if (isNaN(peso) || isNaN(altura) || isNaN(idade)) {
            result.innerHTML = '<p>Por favor, insira valores válidos para peso, altura e idade.</p>';
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
        let proteina  = 0;
        let carboidrato = 0;
        let gordura = 0;
        

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
            } else if (el.id === 'genderFem' && el.checked) {
                result.innerHTML += `<p><b>Taxa Metabólica Basal (TMB):</b> ${getTmbFem.toFixed(2)} calorias.</p>`;
                getGender = 'F';
                pesoIdeal = 21 * ((altura / 100) * (altura / 100));
            }
        });

        if (getGender) {
            result.innerHTML += `<p><b>Peso Ideal:</b> ${pesoIdeal.toFixed(2)} kg.</p>`;
        }

        radiobtns.forEach((el, i, arr) => {
            if (el.id === 'atvFisS' && el.checked) {
                arr.forEach((item) => {
                    if (item.id === 'objPeso' && item.checked) {
                        if (getGender === 'F') {
                            result.innerHTML += `<p><b>Dieta Recomendada:</b> ${(getTmbFem - (getTmbFem * 0.1081)).toFixed(2)} calorias por dia.</p>`;
                        } else if (getGender === 'M') {
                            result.innerHTML += `<p><b>Dieta Recomendada:</b> ${(getTmbMasc - (getTmbMasc * 0.1081)).toFixed(2)} calorias por dia.</p>`;
                        }
                    } else if (item.id === 'objHiper' && item.checked) {
                        if (getGender === 'F') {
                            result.innerHTML += `<p><b>Dieta Recomendada:</b> ${(getTmbFem + (getTmbFem * 0.30)).toFixed(2)} calorias por dia.</p>`;
                        } else if (getGender === 'M') {
                            result.innerHTML += `<p><b>Dieta Recomendada:</b> ${(getTmbMasc + (getTmbMasc * 0.30)).toFixed(2)} calorias por dia.</p>`;
                        }
                        result.innerHTML += `<p><b>QTD. de Proteína Recomendada: </b> ${getProtein.toFixed(1)}g por dia.</p>`;
                        result.innerHTML += `<p><b>QTD. de Creatina Recomendada: </b> ${getCreatina.toFixed(1)}g por dia.</p>`;
                    }
                });
            } else if (el.id === 'atvFisN' && el.checked) {
                arr.forEach((item) => {
                    if (item.id === 'objPeso' && item.checked) {
                        if (getGender === 'F') {
                            result.innerHTML += `<p><b>Dieta Recomendada:</b> ${(getTmbFem - (getTmbFem * 0.1081)).toFixed(2)} calorias por dia.</p>`;
                        } else if (getGender === 'M') {
                            result.innerHTML += `<p><b>Dieta Recomendada:</b> ${(getTmbMasc - (getTmbMasc * 0.1081)).toFixed(2)} calorias por dia.</p>`;
                        }
                    } else if (item.id === 'objHiper' && item.checked) {
                        if (getGender === 'F') {
                            result.innerHTML += `<p><b>Dieta Recomendada:</b> ${(getTmbFem + (getTmbFem * 0.30)).toFixed(2)} calorias por dia.</p>`;
                        } else if (getGender === 'M') {
                            result.innerHTML += `<p><b>Dieta Recomendada:</b> ${(getTmbMasc + (getTmbMasc * 0.30)).toFixed(2)} calorias por dia.</p>`;
                        }
                    }
                });
            }
        });

        result.innerHTML += `<p><b>QTD. de Água Recomendada:</b> ${getQtdAgua.toFixed(1)}L por dia.</p>`;
    });
})();


