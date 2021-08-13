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
                .resize(200)
                .jpeg({ quality: 70 })
                .toFile(
                    path.resolve(req.file.destination, 'resized', photo)
                )

            fs.unlinkSync(req.file.path);

            const body = req.body;

            if (!validatorEmail.validate(body.email) || !cpf.isValid(body.cpf)) {
                return res.send('Email ou CPF inválidos');
            }

            if (!validateBirthDate(body.birth_date)) {
                return res.send('Data de nascimento inválida')
            }

            await knex('townsperson').insert({ photo, ...body });
        } catch (error) {
            return res.status(400).json(error.message);
        }

        return res.json({ message: 'inserido' })
    },
    async updateTownsperson(req, res) {
        try {
            const { id } = req.params;
            const { filename: photo } = req.file;

            let townsperson = await knex('townsperson')
                .select('*')
                .where({ id })
                .first();

            if (townsperson) {

                fs.unlinkSync(path.resolve('src', 'uploads', 'resized', townsperson.photo));

                await sharp(req.file.path)
                    .resize(200)
                    .jpeg({ quality: 70 })
                    .toFile(
                        path.resolve(req.file.destination, 'resized', photo)
                    )

                fs.unlinkSync(req.file.path);

                const body = req.body;

                if (!validatorEmail.validate(body.email) || !cpf.isValid(body.cpf)) {
                    return res.send('Email ou CPF inválidos');
                }

                if (!validateBirthDate(body.birth_date)) {
                    return res.send('Data de nascimento inválida')
                }
                
                townsperson = await knex('townsperson')
                    .update({ photo, ...body })
                    .where({ id });

                return res.json(townsperson);
            }
        } catch (error) {
            return res.status(400).json(error.message);
        }

        return res.send('O munícipe não foi encontrado');
    }
};