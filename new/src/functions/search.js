const fs = require('fs');

function searchNameInFile(filePath, name) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (error, data) => {
            if (error) {
                console.error('Si è verificato un errore durante la lettura del file:', error);
                reject(error);
                return;
            }
    
            const lines = data.split('\n');
    
            let count = 0;
            for (const line of lines) {
                const words = line.match(/\b\w+\b/g);
                let foundIndex = -1;
    
                for (let i = 0; i < words.length; i++) {
                    if (words[i].toLowerCase() === name.toLowerCase()) {
                        foundIndex = i;
                        count++;
                        if (count >= 2) { // Dopo quante volte che trova nameToSearch si deve fermare es: 2
                            const context = words.slice(foundIndex + 1, foundIndex + 19); // Quante parole dopo nameToSearch si deve salvare es: 1/19
                            resolve(context);
                            return;
                        }
                    }
                }
            }
            if (count < 2) {
                console.log('Il nome cercato non è stato trovato almeno due volte nel file.');
                resolve([]);
            }
        });
    });
}
  
function findValue(variable, value) {
    for (const sublist of variable) {
        const index = sublist.indexOf(value);
        if (index !== -1 && index < sublist.length - 1) {
            let nextValue;
            if (sublist[index + 2].includes('E')) { // Controlla se é presente una 'E' all'interno del prezzo

                const stringa_iniziale = sublist[index + 1] + "." + sublist[index + 2]; // Crea la stringa di partenza es: 1.99320246E7
                
                const [decimale_stringa, esponente_stringa] = stringa_iniziale.split('E'); // Divide la stringa in: 1.99320246 (decimale) e 7 (esponente)
                
                const esponente = parseInt(esponente_stringa); // Conversione in intero
                const decimale = parseFloat(decimale_stringa); // Conversione in float

                nextValue = decimale * Math.pow(10, esponente); // Calcola il prezzo reale
            } else {
                nextValue = parseInt(sublist[index + 1]); // Dopo quante parole rispetto a valueToFind deve cercare es: 1
            }
            return nextValue;
        }
    }
}

module.exports = {
    searchNameInFile,
    findValue
};