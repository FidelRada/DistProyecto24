const { Persona, Cliente, Solicitud, Ciudad, EstadoSolicitud } = require('../models');
const Token = require('./genradorToken');

async function getAll(pagina, cantidad, IdCliente) {

    try {

        const desplazamiento = (pagina - 1) * cantidad;
        console.log(desplazamiento);

        const { rows, count } = await Solicitud.findAndCountAll({
            limit: cantidad,
            offset: desplazamiento,
            attributes: [
                "id",
                "Fecha",
                "Descripcion"
            ],
            include: [
                {
                    model: Cliente,
                    attributes: [],
                    required: true,
                    where: {
                        id: IdCliente
                    }
                },
                {
                    model: Ciudad,
                    as: "Origen",
                    attributes: ["Departamento"],
                    required: true
                },
                {
                    model: Ciudad,
                    as: "Destino",
                    attributes: ["Departamento"],
                    required: true
                },
                {
                    model: EstadoSolicitud,
                    attributes: ["Nombre"],
                    required: true
                }
            ]
        });

        //console.log("Nose por que sale esto =>", rows, count);

        return { succes: true, detalle: rows };

    } catch (error) {

        throw { succes: false, detalle: error };
    }
}

async function buscarSolicitudByToken(tokenSolicitud) {
    try {
        const resultado = await Solicitud.findAll({
            //attributes: [
            //    'Telefono',
            //    'NIT'
            //],
            where: {
                Token: tokenSolicitud//'47a21490991ddabc5d37b71daed3a241eae86939f28d10c709b72b5f46302cd6'
            },
        });

        return resultado[0];
    } catch (error) {
        throw error;
    }
}

async function create(body) {

    const tokenSolicitud = Token.generateSHA256(body.Descripcion + body.IdCliente + body.IdDestino + body.IdOrigen );


    let nuevaSolicitud;
    try {
        const SolicitudCreado = await buscarSolicitudByToken(tokenSolicitud);

        if (!SolicitudCreado) {

            const SolicitudData = {
                Fecha: new Date(),
                Descripcion: body.Descripcion,
                IdEstado: body.IdEstado,
                IdCliente: body.IdCliente,
                IdOrigen: body.IdOrigen,
                IdDestino: body.IdDestino,
                Token: tokenSolicitud
            }
            nuevaSolicitud = await Solicitud.create(SolicitudData);
            const r = { succes: true, detalle: [nuevaSolicitud], mensaje: "Solicitud creado" }; 
            return r;
        } else {
            nuevaSolicitud = SolicitudCreado;
            const r = { succes: true, detalle: [nuevaSolicitud], mensaje: "La Solicitud ya fue creado" }; 
            return r;
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