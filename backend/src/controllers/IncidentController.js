const connection = require('../database/connection');
//em padrão MVC, é recomendado n ter mais que 5 métodos(listagem, delete, alterar, create e verificação de especifico)
module.exports = {
    async index (request, response){
        const { page = 1} = request.query;

        const [count] = await connection('incidents').count();
        //console.log(count);


        const incident = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)   //offset = deslocamento, ou seja, onde ele vai começar. page = 1, entao page -1 = 0, 0 * 5 = 0, deslocamento inicial = 0.
        .select(['incidents.*', //retorna id do caso, não da ong
                    'ongs.name', 
                    'ongs.email',
                    'ongs.whatsapp', 
                    'ongs.city', 
                    'ongs.uf']);

        response.header('X-Total-Count', count['count(*)']);
        
        return response.json(incident);
    },

    async create (request, response){
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title, description, value, ong_id
        });
        //console.log([id]);

        return response.json({id});

    },

        
    

    async delete (request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;
        console.log(ong_id);
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

            //console.log(incident.ong_id);
            //console.log(ong_id);
        if(incident.ong_id !== ong_id){
            return response.status(401).json({ error: 'Operation not permitted. '});
        
        }

        await connection('incidents').where('id', id ).delete();

        return response.status(204).send();
        //204 = no content, send = enviar resposta sem corpo.
    },

    
}