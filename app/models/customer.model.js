module.exports = (sequelize, Sequelize) => {
    const Libro = sequelize.define('libro', {
        codigoLibro: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombreLibro: {
            type: Sequelize.STRING(60)
        },
        editorial: {
            type: Sequelize.STRING(25)
        },
        autor: {
            type: Sequelize.STRING(25)
        },
        genero: {
            type: Sequelize.STRING(20)
        },
        paisAutor: {
            type: Sequelize.STRING(20)
        },
        numeroPaginas: {
            type: Sequelize.INTEGER
        },
        anoEdicion: {
            type: Sequelize.DATE
        },
        precioLibro: {
            type: Sequelize.FLOAT 
        }
    });

    return Libro;
};