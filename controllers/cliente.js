const { Persona, Cliente } = require('../models');
const Token = require('./genradorToken');

async function getAll(pagina, cantidad) {

    try {

        const desplazamiento = (pagina - 1) * cantidad;
        console.log(desplazamiento);

        const { rows, count } = await Persona.findAndCountAll({
            limit: cantidad,
            offset: desplazamiento,
            attributes: [
                "id",
                "CI",
                "Nombre",
                "ApellidoPaterno",
                "ApellidoMaterno"
            ],
            include: {
                model: Cliente,
                attributes: [
                    'Telefono',
                    'NIT'
                ],
                required: true
            }
        });

        //console.log("Nose por que sale esto =>", rows, count);
        
        return { succes: true, detalle:  rows };

    } catch (error) {

        throw { succes: false, detalle: error };
    }
}
/*
async function buscarClienteByToken(tokenPersona, tokenCliente) {
    try {
        const resultado = await Persona.findAll({
            attributes: [
                "id",
                "CI",
                "Nombre",
                "ApellidoPaterno",
                "ApellidoMaterno"
            ],
            where: {
                Token: tokenPersona//'47a21490991ddabc5d37b71daed3a241eae86939f28d10c709b72b5f46302cd6'
            },
            include: {
                attributes: [
                    'Telefono',
                    'NIT'
                ],
                model: Cliente,
                where: {
                    Token: tokenCliente//'80a5b5f0e8080f674e1ac80656f94003efd450dd52fa5b1b409d59c6d6df8b3b'
                }
            },
        });

        return resultado[0];
    } catch (error) {
        throw error;
    }

}
*/
async function buscarPersonaByToken(tokenPersona, tokenCliente) {
    try {
        const resultado = await Persona.findAll({
            //attributes: [
            //    "id",
            //    "CI",
            //    "Nombre",
            //    "ApellidoPaterno",
            //    "ApellidoMaterno"
            //],
            where: {
                Token: tokenPersona//'47a21490991ddabc5d37b71daed3a241eae86939f28d10c709b72b5f46302cd6'
            },
        });

        return resultado[0];
    } catch (error) {
        throw error;
    }
}

async function buscarClienteByToken(tokenPersona, tokenCliente) {
    try {
        const resultado = await Cliente.findAll({
            //attributes: [
            //    'Telefono',
            //    'NIT'
            //],
            where: {
                Token: tokenPersona//'47a21490991ddabc5d37b71daed3a241eae86939f28d10c709b72b5f46302cd6'
            },
        });

        return resultado[0];
    } catch (error) {
        throw error;
    }
}

async function create(body) {

    const tokenPersona = Token.generateSHA256(body.Nombre + body.ApellidoPaterno + body.ApellidoMaterno + body.CI);
    const tokenCliente = Token.generateSHA256(body.Telefono + body.NIT);

    const PersonaCreado = await buscarPersonaByToken(tokenPersona);

    const ClienteCreado = await buscarClienteByToken(tokenCliente);

    let nuevaPersona;
    try {

        if (!PersonaCreado) {

            const persona = {
                Nombre: body.Nombre,
                ApellidoPaterno: body.ApellidoPaterno,
                ApellidoMaterno: body.ApellidoMaterno,
                CI: body.CI,
                Token: tokenPersona
            }
            nuevaPersona = await Persona.create(persona);
        } else {
            nuevaPersona = PersonaCreado;
        }

        let nuevoCliente;

        if (!ClienteCreado) {

            const cliente = {
                Telefono: body.Telefono,
                NIT: body.NIT,
                Token: tokenCliente,
                IdPersona: nuevaPersona.id
            }

            nuevoCliente = await Cliente.create(cliente);

            nuevaPersona.dataValues["Cliente"] = nuevoCliente;
            console.log(nuevaPersona);

            return { succes: true, detalle: nuevaPersona, mensaje: "Cliente creado" };
        } else {
            nuevoCliente = ClienteCreado;

            nuevaPersona.dataValues["Cliente"] = nuevoCliente;
            console.log(nuevaPersona);
            return { succes: true, detalle: [nuevaPersona], mensaje: "El cliente ya fue creado" };
        }


    } catch (error) {
        console.log(error);
        throw { succes: false, detalle: error };
    }
}
module.exports = {
    getAll,
    create
}