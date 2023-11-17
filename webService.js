const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const port = 3000;

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "bicicentro"
});

connection.connect(function (err) {
    if (err)
        throw err;
    console.log("Conexion exitosa!");
});


app.get("/trabajadores",function (req, res){
    connection.query("SELECT * FROM trabajadores", function (err, result, fields) {
        if (err)
            throw err;
        res.json(result);
    });
});

app.get("/trabajadores/:dni", function (req, res) {
    let dni = req.params.dni;
    connection.query("SELECT trabajadores.*, sedes.nombreSede AS nombreSede FROM trabajadores INNER JOIN sedes ON trabajadores.idsede = sedes.idsede WHERE trabajadores.dni = ?", [dni], function (err, result, fields) {
        if (err)
            throw err;
        res.json(result);
    });
});

app.get("/trabajadores/ventas/:dni", function (req, res) {
    let dni = req.params.dni;
    connection.query("SELECT ventas.fecha, inventario.nombre, inventario.numeroserie, marcas.nombre AS marca FROM ventas INNER JOIN trabajadores ON ventas.dniTrabajador = trabajadores.dni INNER JOIN inventario ON ventas.id_inventario = inventario.idinventario INNER JOIN marcas ON inventario.idmarca = marcas.idmarca WHERE ventas.dniTrabajador = ?", [dni], function (err, result, fields) {
        if (err)
            throw err;
        res.json(result);
    });
});

app.get("/sedes", function (req, res) {
    connection.query("SELECT * FROM sedes", function (err, result, fields) {
        if (err)
            throw err;
        res.json(result);
    });
});

app.get("/sedes/:id", function (req, res) {
    let id = req.params.id;
    connection.query("SELECT * FROM sedes WHERE idsede = ?", [id], function (err, result, fields) {
        if (err)
            throw err;
        res.json(result);
    });
});

app.get("/sedes/trabajadores/:id", function (req, res) {
    let id = req.params.id;
    connection.query("SELECT trabajadores.* FROM trabajadores INNER JOIN sedes ON trabajadores.idsede = sedes.idsede WHERE sedes.idsede = ?", [id], function (err, result, fields) {
        if (err)
            throw err;
        res.json(result);
    });
});

