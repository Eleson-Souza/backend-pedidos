// Define que estamos utilizando o sequelize
const Sequelize = require('sequelize');

// Obtem dados de conexão entre sequelize e banco de dados MySQL
const connection = require('../database/database.js');

// Cria tabela no BD e seus campos
const Cliente = connection.define("cliente", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    nome: {
        allowNull: false,
        type: Sequelize.STRING(100),
        validate: {
            len: [3, 100]
        }
    },
    salario: {
        allowNull: false,
        type: Sequelize.DOUBLE(),
        validate: {
            len: [1, 999999]
        }
    },
    dataNascimento: {
        allowNull: false,
        type: Sequelize.DATE()
    },
    ativo: {
        allowNull: false,
        type: Sequelize.BOOLEAN(),
        defaultValue: true
    }
});

module.exports = Cliente;
