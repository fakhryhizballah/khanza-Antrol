const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

module.exports = {
    findUser: async (nip) => {
        let user = await sequelize.query("SELECT * FROM user WHERE id_user = AES_ENCRYPT(:nip,'nur')", {
            replacements: { nip: nip },
            type: QueryTypes.SELECT
        });
        return user[0];
    },
    findUserPassword: async (nip) => {
        let user = await sequelize.query("SELECT aes_decrypt(id_user,'nur') as user, aes_decrypt(password,'windi') as pass FROM user WHERE id_user = AES_ENCRYPT(:nip,'nur')", {
            replacements: { nip: nip },
            type: QueryTypes.SELECT
        });
        let data = {
            user: user[0].user.toString(),
            password: user[0].pass.toString()
        }
        return data;
    },
    updatedPasword: async (nip, pass) => {
        let user = await sequelize.query("UPDATE user SET password = AES_ENCRYPT(:pass,'windi') WHERE id_user = AES_ENCRYPT(:nip,'nur')", {
            replacements: { nip: nip, pass: pass },
            type: QueryTypes.UPDATE
        });
        return user;
    },
    updateHakAses: async (nip, hak, state) => {
        let user = await sequelize.query("UPDATE user SET " + hak + " = :state WHERE id_user = AES_ENCRYPT(:nip,'nur')", {
            replacements: { nip: nip, state: state },
            type: QueryTypes.UPDATE
        });
        return user;
    }
}