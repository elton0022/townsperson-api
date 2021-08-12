const knex = require('../database/connect');

module.exports = {
    async getAllTownsperson(req, res) {
        const townsperson = await knex('townsperson').select('*');

        return res.json(townsperson);
    },
    async addTownsperson(req, res) {
        const { filename: photo } = req.file;
        const { name, cpf, cns, email, birth_date, phone, status } = req.body;
        try {
            await knex('townsperson').insert({ 
                photo, 
                name, 
                cpf: Number(cpf), 
                cns: Number(cns), 
                email, 
                birth_date, 
                phone, 
                status
            });
        } catch (error) {
            return res.json(error.message);
        }

        return res.json({ message: 'inserido' })
    }
};