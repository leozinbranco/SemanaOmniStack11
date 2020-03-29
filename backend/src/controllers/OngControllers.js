const crypto = require('crypto');
connection = require('../database/connection');

/*
get: buscar alguma inf no backend
post: criar alguma inf no backend
put: alterar alguma inf no backend
delete: deletar alguma inf no backend
*/

module.exports = {
    async index (request, response){
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);  //obj criado da select feita 
    },


    async create(request, response){
                //requisição e resposta

                
        const {name, email, whatsapp, city, uf} = request.body;  //dados do corpo 
        //console.log(data);

        const id = crypto.randomBytes(4).toString('HEX');
        //id random criado

        await connection('ongs').insert({
            id, name, email, whatsapp, city, uf
        })


    return response.json({ id });        
    }
}