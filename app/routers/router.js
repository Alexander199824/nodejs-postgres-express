// Importa el módulo Express
let express = require('express');
// Crea un nuevo enrutador de Express
let router = express.Router();

// Importa los controladores
const libros = require('../controllers/libros.controller.js');
const prestamos = require('../controllers/prestamos.controller.js');

// Rutas para el modelo Libros

// Crear un nuevo libro
router.post('/api/libros/create', libros.create);

// Obtener todos los libros
router.get('/api/libros/all', libros.retrieveAllLibros);

// Obtener un libro por su ID
router.get('/api/libros/onebyid/:id', libros.getLibroById);

// Actualizar un libro por su ID
router.put('/api/libros/update/:id', libros.updateById);

// Eliminar un libro por su ID
router.delete('/api/libros/delete/:id', libros.deleteById);

// Rutas para el modelo Prestamos

// Crear un nuevo préstamo
router.post('/api/prestamos/create', prestamos.create);

// Obtener todos los préstamos
router.get('/api/prestamos/all', prestamos.retrieveAllPrestamos);

// Obtener un préstamo por su número de pedido (ID)
router.get('/api/prestamos/onebyid/:id', prestamos.getPrestamoById);

// Actualizar un préstamo por su número de pedido (ID)
router.put('/api/prestamos/update/:id', prestamos.updateById);

// Eliminar un préstamo por su número de pedido (ID)
router.delete('/api/prestamos/delete/:id', prestamos.deleteById);

// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación
module.exports = router;
