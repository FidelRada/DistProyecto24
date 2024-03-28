var express = require('express');
var { body, validationResult } = require('express-validator');
const { setSucces, setError } = require('./respuestas');
var router = express.Router();
const clienteController = require('../controllers/cliente');


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

const validateClienteCreate = [
    // Validación del cuerpo de la solicitud usando express-validator
    body('Nombre').isString().notEmpty().withMessage("Nombre no puede ser vacio"),
    body('ApellidoPaterno').isString().notEmpty().withMessage("ApellidoPaterno no puede ser vacio"),
    body('ApellidoMaterno').isString().notEmpty().withMessage("ApellidoMaterno no puede ser vacio"),
    body('CI').isString().notEmpty().isNumeric().withMessage("CI tiene que se un String de nuemero").isLength({ min: 8, max: 8 }).withMessage("Solo puede ser de 8 numeros"),
    body('Telefono').isString().notEmpty().isNumeric().withMessage("CI tiene que se un String de nuemero").isLength({ min: 8, max: 8 }).withMessage("Solo puede ser de 8 numeros"),
    body('NIT').isString().notEmpty().isNumeric().withMessage("CI tiene que se un String de nuemero").isLength({ min: 8, max: 8 }).withMessage("Solo puede ser de 8 numeros")
];

router.post('/create', validateClienteCreate, async (req, res, next) => {
    const errorEstrucutura = validationResult(req);

    if (!errorEstrucutura.isEmpty()) {

        const errors = setError(411, errorEstrucutura.errors, "Error en la estructura json del cliente");

        return res.status(400).json(errors);
    }

    try {

        const nuevoCliente = await clienteController.create(req.body);

        const succes = setSucces(
            nuevoCliente.detalle,
            {
                total: 1
            },
            nuevoCliente.mensaje
        )

        res.status(202).json(succes);

    } catch (error) {
        res.status(501).json(error);
    }



})

const validateClienteGetAll = [
    body('Pagina').isInt({ min: 1 }).withMessage("El valor tiene que ser igual o mayor a 1"),
    body('Cantidad').isInt({ min: 1, max: 100 }).withMessage("El valor debe de estar entre 1 y 100")
];

router.get('/getAll', validateClienteGetAll, async (req, res, next) => {

    const errorEstrucutura = validationResult(req);

    if (!errorEstrucutura.isEmpty()) {

        const errors = setError(411, errorEstrucutura.errors, "Error en la estructura json del cliente");

        return res.status(400).json(errors);
    }

    try {

        const pagina = req.body.Pagina;
        const cantidad = req.body.Cantidad;

        const consulta = await clienteController.getAll(pagina, cantidad);

        //console.log("controller", consulta);
        console.log( consulta.detalle.rows,
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
