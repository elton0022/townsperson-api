const validatorEmail = require("email-validator");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const validateBirthDate = require('../utils/validatorBirthdate');
const knex = require('../database/connect');
const { cpf } = require('cpf-cnpj-validator');

module.exports = {
    async findOneTownsperson(req, res) {
        let townsperson = null;
        let address = null;

        try {
            const { id } = req.params;

            townsperson = await knex('townspersons')
            .select('*')
            .where({id})
            .first();

            address = await knex('addresses')
            .select('*')
            .where({townsperson_id: id})
            .first();
        } catch (error) {
            return res.send(error.message)
        }
        return res.json({...townsperson, address});
    },
    async getAllTownsperson(req, res) {
        let townspersons = [];
        try {
            townspersons = await knex('townspersons')
            .leftJoin('addresses','townspersons.id', 'addresses.townsperson_id')
            .select(
                'townspersons.id as id',
                'townspersons.name',
                'townspersons.photo',
                'townspersons.phone',
                'townspersons.email',
                'addresses.id as addressId',
                'addresses.city',
                'addresses.uf',
                ) 
        } catch (error) {
            return res.send(error.message)
        }
        return res.json(townspersons);
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

            const { address, ...body } = req.body;

            if (!validatorEmail.validate(body.email) || !cpf.isValid(body.cpf)) {
                return res.send('Email ou CPF inválidos');
            }

            if (!validateBirthDate(body.birth_date)) {
                return res.send('Data de nascimento inválida')
            }

            const [id] = await knex('townspersons')
                .insert({ photo, ...body })
                .returning('id');

            const adressJson = JSON.parse(address);

            await knex('addresses').insert({
                ...adressJson,
                townsperson_id: id
            });

        } catch (error) {
            return res.status(400).json(error.message);
        }

        return res.json({ message: 'inserido' })
    },
    async updateTownsperson(req, res) {
        try {
            const { id } = req.params;
            const { filename: photo } = req.file;

            let townsperson = await knex('townspersons')
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

                const { address, ...body } = req.body;

                if (!validatorEmail.validate(body.email) || !cpf.isValid(body.cpf)) {
                    return res.send('Email ou CPF inválidos');
                }

                if (!validateBirthDate(body.birth_date)) {
                    return res.send('Data de nascimento inválida')
                }

                const addressJson = JSON.parse(address);

                await knex('townspersons')
                    .update({ photo, ...body })
                    .where({ id });

                await knex('address')
                    .update(addressJson)
                    .where({ townsperson_id: id });

                return res.json({ message: 'Atualizado com sucesso!' });
            }
        } catch (error) {
            return res.status(400).json(error.message);
        }

        return res.send('O munícipe não foi encontrado');
    }
};