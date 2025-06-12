const readline = require('readline');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askMenu() {
    console.log('\n--- Menú ---');
    console.log('1. Jugar');
    console.log('2. Salir');
    rl.question('Elige una opción: ', (option) => {
        if (option === '1') {
            startGame();
        } else if (option === '2') {
            console.log('¡Hasta luego!');
            rl.close();
        } else {
            console.log('Opción no válida.');
            askMenu();
        }
    });
}

function startGame() {
    const secret = getRandomInt(1, 100);
    let attempts = 0;

    function guess() {
        rl.question('Adivina el número (entre 1 y 100): ', (input) => {
            const num = parseInt(input, 10);
            if (isNaN(num) || num < 1 || num > 100) {
                console.log('Por favor, ingresa un número válido entre 1 y 100.');
                guess();
                return;
            }
            attempts++;
            if (num < secret) {
                console.log('El número secreto es mayor.');
                guess();
            } else if (num > secret) {
                console.log('El número secreto es menor.');
                guess();
            } else {
                console.log(`¡Felicidades! Adivinaste el número en ${attempts} intentos.`);
                askMenu();
            }
        });
    }

    guess();
}

askMenu();