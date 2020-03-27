const connection = require('../database/connection')

module.exports = {
    async create (request, response) {
        let { id } = request.body;
        let ongName = await connection('ongs').where('id', id).select('name').first();
        
        if(!ongName)
            return response.status(400).json({ error: "Nenhuma ONG encontrada com esse ID." })
        
        return response.json(ongName);
    }
}