// Define a utilização do model usuario e a dependência http-status
const Cliente = require('../models/cliente');
const status = require('http-status');

// Cria o método Insert, obtendo os dados da request
exports.Insert = (req, res, next) => {
    const nome = req.body.nome;
    const salario = req.body.salario;
    const dataNascimento = req.body.dataNascimento;
    const ativo = req.body.ativo;

    // Popula cada um dos campos do model com os campos recebido na request
    Cliente.create({
        nome: nome,
        salario: salario,
        dataNascimento: dataNascimento,
        ativo: ativo,
    })
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(usuario => {
            if (usuario) {
                res.status(status.OK).send(usuario);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        //catch = registra o que queremos que aconteca quando a Promise falhar
        .catch(error => next(error));
};

exports.SelectAll = (req, res, next) => {
    Cliente.findAll()
        .then(cliente => {
            if (cliente) {
                res.status(status.OK).send(cliente);
            }
        })
        .catch(error => next(error));
}
 
exports.SelectDetail = (req, res, next) => {
    const id = req.params.id;
 
    Cliente.findByPk(id)
        .then(cliente => {
            if (cliente) {
                res.status(status.OK).send(cliente);
            } else {
                res.status(status.NOT_FOUND).json({mensagem: "Cliente não encontrado!"});
            }
        })
        .catch(error => next(error));
};

exports.Update = (req, res, next) => {
    const id = req.params.id;
    const nome = req.body.nome;
    const salario = req.body.salario;
    const dataNascimento = req.body.dataNascimento;
    const ativo = req.body.ativo;
 
    Cliente.findByPk(id)
        .then(cliente => {
            if (cliente) {
                cliente.update({
                    nome: nome,
                    salario: salario,
                    dataNascimento: dataNascimento,
                    ativo: ativo
                },
                    {
                        where: { id: id }
                    })
                    .then(() => {
                        res.status(status.OK).json({mensagem: "Cliente atualizado com sucesso!"});
                    })
                    .catch(error => next(error));
            } else {
                res.status(status.NOT_FOUND).json({mensagem: "Cliente não encontrado!"});
            }
        })
        .catch(error => next(error));
};
 
exports.Delete = (req, res, next) => {
    const id = req.params.id;
 
    Cliente.findByPk(id)
        .then(cliente => {
            if (cliente) {
                cliente.destroy({
                    where: { id: id }
                })
                    .then(() => {
                        res.status(status.OK).json({mensagem: "Cliente removido com sucesso!"});
                    })
                    .catch(error => next(error));
            }
            else {
                res.status(status.NOT_FOUND).json({mensagem: "Cliente não encontrado!"});
            }
        })
        .catch(error => next(error));
};

