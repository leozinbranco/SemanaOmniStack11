connection = require('../database/connection');

module.exports = {
        async create (request, response){
            //const id  = request.body.id;
            const { id } = request.body;

            const ong = await connection('ongs')
                            .where('id', id)
                            .select('name')
                            .first();
            //se ong nao existir
            if(!ong){   
                return response.status(400).json('No ONG found with this ID.');
            }

            return response.json(ong);
        }
}