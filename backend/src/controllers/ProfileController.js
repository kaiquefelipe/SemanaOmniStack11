const connection = require('../database/connection')

module.exports = {
    async list (request, response) {
        let ongs_id = request.headers.authorization;
        let incidents = await connection('incidents').where('ongs_id', ongs_id).select('*');
        
        return response.json(incidents);
    }
};