const inputField = document.getElementById('word-input');
const resultsList = document.getElementById('results-list');

inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const word = inputField.value.trim();
        fetchDefinition(word);
    }
});

function fetchDefinition(word) {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayDefinitions(data);
        })
        .catch(error => {
            console.error('Error:', error);
            resultsList.innerHTML = '<li>No definitions found for the given word.</li>';
        });
}

function displayDefinitions(data) {
    resultsList.innerHTML = '';

    if (Array.isArray(data) && data.length > 0) {
        data.forEach(entry => {
            entry.meanings.forEach(meaning => {
                meaning.definitions.forEach(definition => {
                    const definitionItem = document.createElement('li');
                    definitionItem.textContent = definition.definition;
                    resultsList.appendChild(definitionItem);
                });
            });
        });
    } else {
        resultsList.innerHTML = '<li>No definitions found for the given word.</li>';
    }
}