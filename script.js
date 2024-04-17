function getRandomNumber() {
    return Math.floor(Math.random() * 51000) + 1;
}

let containerSorteador = document.querySelector('.container-sorteador');
let temporalesInterval;

function insertarNumeros() {
    let realNumber;
    verificarNumeroRecursivo();

    function verificarNumeroRecursivo() {
        realNumber = getRandomNumber();
        verificarNumero(realNumber)
            .then(valido => {
                if (valido) {
                    containerSorteador.style.backgroundImage = "url(img/sorteadorprueba8.png)";
                    enviarNumeroAlServidor(realNumber);
                    mostrarNumerosTemporales(realNumber);
                    setTimeout(function () {
                        clearInterval(temporalesInterval);
                        mostrarNumeroFinal(realNumber);
                        document.querySelectorAll('.parpadeo').forEach(function (element) {
                            element.classList.remove('parpadeo');
                        });
                        setTimeout(function () {
                            containerSorteador.style.backgroundImage = "url(img/sorteadorprueba4.png)";
                            for (let i = 0; i < 5; i++) {
                                document.getElementById(`num${i + 1}`).classList.add('parpadeo');
                            }
                        }, 40);
                    }, 4 * 1000);
                } else {
                    verificarNumeroRecursivo();
                }
            })
            .catch(error => {
                console.error('Error al verificar número:', error);
            });
    }
}

function enviarNumeroAlServidor(numero) {
    fetch('obtener_dato.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ numero: numero })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error al enviar solicitud:', error);
    });
}

function mostrarNumeroFinal(numero) {
    console.log("Número final generado:", numero);
    let numeroComoString = numero.toString();
    let digitos = [];
    containerSorteador.querySelectorAll('p').forEach(function (parrafo) {
        parrafo.textContent = '';
    });

    while (numeroComoString.length < 5) {
        numeroComoString = '0' + numeroComoString;
    }

    for (let i = 0; i < 5; i++) {
        digitos.push(parseInt(numeroComoString[i]));
        document.getElementById('num' + (i + 1)).textContent = numeroComoString[i];
    }
}

function mostrarNumerosTemporales(number) {
    let numeroComoString = number.toString();
    let digitos = [];

    containerSorteador.querySelectorAll('p').forEach(function (parrafo) {
        parrafo.textContent = '';
    });

    let contador = 0;
    temporalesInterval = setInterval(function () {
        let tempNumber = getRandomNumber();
        contador++;
        if (contador >= 50) {
            clearInterval(temporalesInterval);
            return;
        }
        mostrarNumeroTemporal(tempNumber);
    }, 80);

    while (numeroComoString.length < 5) {
        numeroComoString = '0' + numeroComoString;
    }

    for (let i = 0; i < 5; i++) {
        digitos.push(parseInt(numeroComoString[i]));
        document.getElementById('num' + (i + 1)).textContent = numeroComoString[i];
    }
}

function mostrarNumeroTemporal(number) {
    let numeroComoString = number.toString();
    let digitos = [];

    while (numeroComoString.length < 5) {
        numeroComoString = '0' + numeroComoString;
    }

    for (let i = 0; i < 5; i++) {
        digitos.push(parseInt(numeroComoString[i]));
        document.getElementById('num' + (i + 1)).textContent = numeroComoString[i];
    }
}

function verificarNumero(numero) {
    return fetch('obtener_dato.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ numero: numero })
    })
    .then(response => response.json())
    .then(data => {
        if (data.id_asociado) {
            return true;
        }
        return false;
    })
    .catch(error => {
        console.error('Error al verificar número:', error);
        return false;
    });
}
