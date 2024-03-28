var express = require('express');
var { body, validationResult } = require('express-validator');
const { setSucces, setError } = require('./respuestas');
var router = express.Router();
const solicitudController = require('../controllers/solicitud');

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

const validateSolicitudCreate = [
    // Validación del cuerpo de la solicitud usando express-validator
    //body('Fecha').isDate().notEmpty().withMessage("Tiene que ser una fecha"),
    body('Descripcion').isString().notEmpty().withMessage("La Descripcion no puede ser vacio"),
    body('IdEstado').isInt().notEmpty().withMessage("Tiene que ser un numero entero"),
    body('IdCliente').isInt().notEmpty().withMessage("Tiene que ser un numero entero"),
    body('IdOrigen').isInt().notEmpty().withMessage("Tiene que ser un numero entero"),
    body('IdDestino').isInt().notEmpty().withMessage("Tiene que ser un numero entero")
];

router.post('/create', validateSolicitudCreate, async (req, res, next) => {
    const errorEstrucutura = validationResult(req);

    if (!errorEstrucutura.isEmpty()) {

        const errors = setError(411, errorEstrucutura.errors, "Error en la estructura json ");

        return res.status(400).json(errors);
    }

    try {

        const nuevoSolicitud = await solicitudController.create(req.body);

        const succes = setSucces(
            nuevoSolicitud.detalle,
            {
                total: 1
            },
            nuevoSolicitud.mensaje
        )

        console.log(succes);

        res.status(202).json(succes);

    } catch (error) {
        console.log(error);
        res.status(501).json(error);
    }

})

const validateSolicitudGetAll = [
    body('Pagina').isInt({ min: 1 }).withMessage("El valor tiene que ser igual o mayor a 1"),
    body('Cantidad').isInt({ min: 1, max: 100 }).withMessage("El valor debe de estar entre 1 y 100"),
    body('IdCliente').isInt({ min: 1 }).withMessage("Valor imbalido"),
];

router.get('/getAll', validateSolicitudGetAll, async (req, res, next) => {

    const errorEstrucutura = validationResult(req);

    if (!errorEstrucutura.isEmpty()) {

        const errors = setError(411, errorEstrucutura.errors, "Error en la estructura json");

        return res.status(400).json(errors);
    }

    try {

        const pagina = req.body.Pagina;
        const cantidad = req.body.Cantidad;
        const IdCliente = req.body.IdCliente;
        
        const consulta = await solicitudController.getAll(pagina, cantidad, IdCliente);

        console.log("controller", consulta);
        console.log(consulta.detalle.rows,
            {
                total: consulta.detalle.length,
                pagina: pagina
            },
            "Consulta exitosa");
        const succes = setSucces(
            consulta.detalle,
            {
                total: consulta.detalle.length,
                pagina: pagina
            },
            "Consulta exitosa"
        );

        return res.status(200).json(succes);

    } catch (error) {
        console.log(error);

        const errors = setError(511, error, "Error al consultar en la base de datos");
        return res.status(500).json(errors);

    }

});

module.exports = router;
