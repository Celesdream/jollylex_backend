

// controller/wordController.js
const WordService = require('../model/word');

const WordController = {
    addWords: async (req, res) => {
        try {
            const words = req.body.words;

            // Validar que se envió un array de palabras
            if (!Array.isArray(words) || words.length === 0) {
                return res.status(400).json({ message: 'Debe proporcionar un array de palabras.' });
            }

            // Validar que cada palabra tiene los campos requeridos
            for (const word of words) {
                const { word: wordText, meaning, type, id_contributor } = word;
                if (!wordText || !meaning || !type || !id_contributor) {
                    return res.status(400).json({ message: 'Todos los campos son obligatorios para cada palabra.' });
                }
            }

            // Llamar al servicio para añadir las palabras
            const newWords = await WordService.addWords(words);

            // Responder con las nuevas palabras creadas
            if (newWords) {
                res.status(201).json({ newWords });
            } else {
                res.status(500).json({ message: 'Error al añadir las palabras.' });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Error', error: { message: error.message } });
        }
    }
}

module.exports = {
    WordController
}
