const validatorEmail = require("email-validator");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const validateBirthDate = require('../utils/validatorBirthdate');
const knex = require('../database/connect');
const { cpf } = require('cpf-cnpj-validator');

module.exports = {
    async getAllTownsperson(req, res) {
        const townsperson = await knex('townsperson').select('*');

        return res.json(townsperson);
    },
    async addTownsperson(req, res) {
        try {
            const { filename: photo } = req.file;

            await sharp(req.file.path)
                .resize(500)
                .jpeg({quality: 70})
                .toFile(
                    path.resolve(req.file.destination, 'resized', photo)
                )
            
            fs.unlinkSync(req.file.path);

            const body = req.body;

            if(!validatorEmail.validate(body.email) || !cpf.isValid(body.cpf)){
                return res.send('Email ou CPF inválidos');
            }

            if(!validateBirthDate(body.birth_date)){
                return res.send('Data de nascimento inválida')
            }

            //await knex('townsperson').insert({ photo, ...body});
        } catch (error) {
            return res.status(400).json(error.message);
        }

        return res.json({ message: 'inserido' })
    }
};