const rows = 4, cols = 4;
const puzzleContainer = document.getElementById("puzzle-container");
const imageUrl = "amor.jpg"; // Cambia esto por la imagen de tu pareja
let pieces = [];
let hasMoved = false;

// Crear piezas
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        let piece = document.createElement("div");
        piece.classList.add("piece");
        piece.style.backgroundImage = `url(${imageUrl})`;
        piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
        piece.setAttribute("data-row", row);
        piece.setAttribute("data-col", col);
        piece.draggable = true;
        puzzleContainer.appendChild(piece);
        pieces.push(piece);
    }
}

// Mezclar las piezas al inicio
shufflePieces();

// Asignar eventos de arrastrar y soltar
pieces.forEach((piece) => {
    piece.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", pieces.indexOf(piece));
    });

    piece.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    piece.addEventListener("drop", (e) => {
        let draggedIndex = e.dataTransfer.getData("text/plain");
        let targetIndex = pieces.indexOf(piece);

        // Intercambiar solo las dos piezas involucradas
        let tempTop = pieces[draggedIndex].style.top;
        let tempLeft = pieces[draggedIndex].style.left;
        pieces[draggedIndex].style.top = pieces[targetIndex].style.top;
        pieces[draggedIndex].style.left = pieces[targetIndex].style.left;
        pieces[targetIndex].style.top = tempTop;
        pieces[targetIndex].style.left = tempLeft;

        // Intercambiar en el array
        [pieces[draggedIndex], pieces[targetIndex]] = [pieces[targetIndex], pieces[draggedIndex]];

        hasMoved = true; // Registrar movimiento

        checkWin();
    });
});

// Función para mezclar las piezas antes de iniciar el juego
function shufflePieces() {
    let positions = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            positions.push({ top: row * 102, left: col * 102 });
        }
    }

    positions.sort(() => Math.random() - 0.5); // Mezcla posiciones aleatoriamente

    pieces.forEach((piece, index) => {
        piece.style.top = `${positions[index].top}px`;
        piece.style.left = `${positions[index].left}px`;
        piece.setAttribute("data-top", positions[index].top);
        piece.setAttribute("data-left", positions[index].left);
    });
}

// Verificar si el rompecabezas está completo
function checkWin() {
    if (!hasMoved) return; // No verificar si no ha habido movimientos

    let isComplete = pieces.every((piece) => {
        let correctRow = piece.getAttribute("data-row");
        let correctCol = piece.getAttribute("data-col");
        let expectedTop = correctRow * 102;
        let expectedLeft = correctCol * 102;
        let actualTop = parseInt(piece.style.top); // Convertir a número
        let actualLeft = parseInt(piece.style.left); // Convertir a número
        return actualTop === expectedTop && actualLeft === expectedLeft;
    });

    if (isComplete) {
        setTimeout(() => alert("Felicidades amor, aunque nuestra relación sea un rompecabezas, con esfuerzo podemos encontrar las piezas ❤️"), 100);
    }
}
