const succesRes = {
    success: true,
    data: {
        resultados: [],
        metadatos: {
            total: 100,           // Total de resultados
            pagina: 1,            // Número de página actual
        }
    },
    mensaje: "Consulta exitosa" // Mensaje opcional para indicar el estado de la solicitud
};

const errorRes = {
    success: false,
    error: {
        codigo: 404,
        mensaje: "Recurso no encontrado",
        detalles: []
    }
}

module.exports = {
    setSucces(dataresult, metadata, mensaje) {

        succesRes.data.resultados = dataresult;
        
        succesRes.data.metadatos=metadata;
        
        succesRes.mensaje = mensaje;

        return succesRes;
    },
    setError(codigo, detalles, mensaje) {

        errorRes.error.codigo = codigo;
        
        errorRes.error.detalles = detalles;
        
        errorRes.error.mensaje = mensaje;
        
        return errorRes;
    }
    
}