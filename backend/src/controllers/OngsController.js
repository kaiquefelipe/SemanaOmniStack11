const crypto = require('crypto');
const connection = require('../database/connection')
const generateUniqueId = require('../utils/generateUniqueId')


module.exports = {
    async list (request, response) {
        let ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },
    
    async create (request, response) {
        let { name, email, whatsapp, city, uf } = request.body;
        let id = generateUniqueId()

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return response.json({ id });
    }
};