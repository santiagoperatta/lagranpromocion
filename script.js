function getRandomNumber() {
	return Math.floor(Math.random() * 30723) + 1;
}

let realNumber = getRandomNumber();
let containerSorteador = document.querySelector('.container-sorteador');

function insertarNumeros() {
	containerSorteador.style.backgroundImage = "url(img/Sorteadores-04.png)";

	// Generar un número aleatorio
	let realNumber = getRandomNumber();

	// Enviar el número generado al servidor
	fetch('obtener_dato.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ numero: realNumber })
	})
		.then(response => response.json())
		.then(data => {
			// Manejar los datos recibidos del servidor (si es necesario)
			console.log(data);
		})
		.catch(error => {
			console.error('Error al enviar solicitud:', error);
		});

	let temporalesInterval = setInterval(function () {
		let tempNumber = getRandomNumber();
		mostrarNumerosTemporales(tempNumber);
	}, 80);

	fetch('obtener_dato.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ numero: realNumber }) // Envía el número generado como JSON al servidor
	})
		.then(response => response.json())
		.then(data => {
			// Manejar los datos recibidos del servidor (si es necesario)
			console.log(data);
		})
		.catch(error => {
			console.error('Error al enviar solicitud:', error);
		});

	setTimeout(function () {
		clearInterval(temporalesInterval);
		mostrarNumeroFinal();
		// Eliminar la clase de parpadeo antes de iniciar una nueva animación
		document.querySelectorAll('.parpadeo').forEach(function (element) {
			element.classList.remove('parpadeo');
		});
		setTimeout(function () {
			containerSorteador.style.backgroundImage = "url(img/Sorteadores-06.png)";
			// Agregar parpadeo a los números ganadores
			for (let i = 0; i < 5; i++) {
				document.getElementById(`num${i + 1}`).classList.add('parpadeo');
			}
		}, 40);
	}, 4 * 1000);
}


function mostrarNumeroFinal() {
	realNumber = getRandomNumber();
	let numeroComoString = realNumber.toString();
	let digitos = [];
	// Limpiar el contenido de los párrafos antes de insertar los nuevos números
	containerSorteador.querySelectorAll('p').forEach(function (parrafo) {
		parrafo.textContent = '';
	});

	// Completar con ceros por delante si el número es menor a 5 dígitos
	while (numeroComoString.length < 5) {
		numeroComoString = '0' + numeroComoString;
	}

	// Iterar sobre cada dígito del número y asignarlo a su respectivo párrafo
	for (let i = 0; i < 5; i++) {
		digitos.push(parseInt(numeroComoString[i]));

		document.getElementById('num' + (i + 1)).textContent = numeroComoString[i];
	}

	console.log(numeroComoString);
}

function mostrarNumerosTemporales(number) {
	let numeroComoString = number.toString();
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
