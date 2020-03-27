const connection = require('../database/connection')

module.exports = {
    async list (request, response) {
        let { page = 1 } = request.query;

        let [count] = await connection('incidents').count();

        let incidents = await connection('incidents')
                                .join('ongs', 'ongs.id', '=', 'incidents.ongs_id')
                                .limit(5)
                                .offset((page - 1) * 5)
                                .select([   
                                        'incidents.*',
                                        'ongs.name',
                                        'ongs.email',
                                        'ongs.whatsapp',
                                        'ongs.city',
                                        'ongs.uf'
                                    ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },
    
    async create (request, response) {
        let { title, description, value } = request.body;
        let ongs_id = request.headers.authorization;

        let [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ongs_id
        })

        return response.json({ id });
    },

    async delete (request, response) {
        let { id } = request.params;
        let ongs_id = request.headers.authorization;
        let incident = await connection('incidents').where('id', id).select('ongs_id').first();
        
        if(incident.ongs_id !== ongs_id)
            return response.status(401).json({ error: "Não autorizado."});

        await connection('incidents').where('id', id).delete();
        return response.status(204).send();
    }
};