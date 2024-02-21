// Connect to the WebSocket server
const socket = io();

function addWord(inputId) {
    const inputElement = document.getElementById(inputId);
    const word = inputElement.value.trim();

    if (word !== '') {
        const list = inputId.includes('teacher') ? 'vocabulary-list' : 'student-list';
        const wordList = document.getElementById(list);
        const newWordItem = document.createElement('li');
        newWordItem.textContent = word;
        wordList.appendChild(newWordItem);

        // Emit a message to the server with the added word
        socket.emit('newWord', { list, word });

        // Clear the input
        inputElement.value = '';
    }
}

// Listen for new words from the server
socket.on('newWord', ({ list, word }) => {
    const wordList = document.getElementById(list);
    const newWordItem = document.createElement('li');
    newWordItem.textContent = word;
    wordList.appendChild(newWordItem);
});
