

// controller/wordController.js
const WordService = require('../model/word');
const moduleVALIDATORAPI    = require('../middleware/validatorApi');

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
    },



    getUserContributions: async (req, res) => 
        {
            try 
            {
                const requiredFields = ['userId']
                const { userId } = req.body;

                const validation = moduleVALIDATORAPI.validateRequiredFields(req.body, requiredFields);

                if (!validation.success) 
                {
                    res.status(400).json({ message: validation.message, missingFields: validation.missingFields });
                    return; // Detener la ejecución si hay campos faltantes
                }
    

    
                // Llamar al servicio para obtener el historial de contribuciones del usuario
                const contributions = await WordService.getUserContributions(userId);
    
                // Responder con el historial de contribuciones del usuario
                if (contributions) 
                {
                    res.status(200).json({ contributions });
                } 
                else 
                {
                    res.status(404).json({ message: 'No se encontraron contribuciones para el usuario.' });
                }
            } 
            catch (error) 
            {
                console.error('Error:', error);
                res.status(500).json({ message: 'Error', error: { message: error.message } });
            }
        }
}

module.exports = {
    WordController
}
