const connection = require('../database/connection');
const { create, index } = require('./OngController');


module.exports = {
   
    async create(req,res){
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return res.status(201).json(id) ;
    },

    async index(req,res){
        const { page = 1 } = req.query;
       
        const [count] = await connection('incidents').count();

        const result = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1 ) * 5)
        .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        res.header('X-Total-Count', count['count(*)']);
        return res.json(result);
    },
    
    async delete(req,res){
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if(incident.ong_id !== ong_id){
            return res.status(401).json({ erro: 'Operation not permitted'});
        }

        await connection('incidents').where('id',id).delete();
        return res.status(204).send();
    }

    
}