// Importa la configuración de la base de datos
const db = require('../config/db.config.js');
// Obtiene el modelo Libro de la configuración importada
const Libro = db.Libro;

// Función para crear un nuevo libro
exports.create = (req, res) => {
    let libro = {};

    try {
        libro.codigoLibro = req.body.codigoLibro;
        libro.nombreLibro = req.body.nombreLibro;
        libro.editorial = req.body.editorial;
        libro.autor = req.body.autor;
        libro.genero = req.body.genero;
        libro.paisAutor = req.body.paisAutor;
        libro.numeroPaginas = req.body.numeroPaginas;
        libro.anoEdicion = req.body.anoEdicion;
        libro.precioLibro = req.body.precioLibro;

        // Guarda el libro en la base de datos MySQL
        Libro.create(libro).then(result => {
            res.status(200).json({
                message: "Libro creado exitosamente con id = " + result.id,
                libro: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fallo!",
            error: error.message
        });
    }
}

// Función para obtener todos los libros
exports.retrieveAllLibros = (req, res) => {
    Libro.findAll()
        .then(libros => {
            res.status(200).json({
                message: "Obtenido todos los libros con éxito!",
                libros: libros
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error.message
            });
        });
}

// Función para obtener un libro por su ID
exports.getLibroById = (req, res) => {
    let libroId = req.params.id;
    Libro.findByPk(libroId)
        .then(libro => {
            if (libro) {
                res.status(200).json({
                    message: "Libro obtenido con éxito con id = " + libroId,
                    libro: libro
                });
            } else {
                res.status(404).json({
                    message: "Libro no encontrado con id = " + libroId,
                    libro: null
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error.message
            });
        });
}

// Función para actualizar un libro por su ID
exports.updateById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No se encontró el libro para actualizar con id = " + libroId,
                libro: null,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombreLibro: req.body.nombreLibro,
                editorial: req.body.editorial,
                autor: req.body.autor,
                genero: req.body.genero,
                paisAutor: req.body.paisAutor,
                numeroPaginas: req.body.numeroPaginas,
                anoEdicion: req.body.anoEdicion,
                precioLibro: req.body.precioLibro
            };
            let result = await Libro.update(updatedObject, { returning: true, where: { id: libroId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar el libro con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Libro actualizado exitosamente con id = " + libroId,
                libro: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar el libro con id = " + req.params.id,
            error: error.message
        });
    }
}

// Función para eliminar un libro por su ID
exports.deleteById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No existe un libro con id = " + libroId,
                error: "404",
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Libro eliminado exitosamente con id = " + libroId,
                libro: libro,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el libro con id = " + req.params.id,
            error: error.message,
        });
    }
}
