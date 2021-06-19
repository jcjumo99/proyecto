const servicesControllers = {};
const multer = require('../lib/images');
const mysql = require('../config/database');


servicesControllers.create = async (req, res) => {
    multer(req, res, (err) => {
        const title = (req.body.title === undefined) ? "" : req.body.title;
        const description = (req.body.description === undefined) ? "" : req.body.description;
        const price = (req.body.price === undefined) ? "" : req.body.price;
        const clothingId = (req.body.clothingId === undefined) ? "" : req.body.clothingId;
        if(title === "" || description === "" || price === "" || clothingId === ""){
            res.json({ status : "error", message : "Fields required" });
        }else{
            const nameFile = req.file.filename;
            const name_image = nameFile;
            const sql = "INSERT INTO services (title, description, price, clothingId, image) VALUES (?,?,?,?,?)";
            const data = [ title, description, price, clothingId, name_image ];
            mysql.query(sql, data, (err, result) => {
                if( err ){
                    res.json({ status : "error", message : "Error in the query: "+err });
                }else{
                    res.json({ status : "success", message : "Services created successfully" });
                }
            });
        }
    });
}

servicesControllers.updateImageServices = async (req, res) => {
    multer(req, res, (err) => {
        const title = (req.body.title === undefined) ? "" : req.body.title;
        const description = (req.body.description === undefined) ? "" : req.body.description;
        const price = (req.body.price === undefined) ? "" : req.body.price;
        const clothingId = (req.body.clothingId === undefined) ? "" : req.body.clothingId;
        const servicesId = (req.body.servicesId === undefined) ? "" : req.body.servicesId;
        if(title === "" || description === "" || price === "" || clothingId === ""){
            res.json({ status : "error", message : "Fields required" });
        }else{
            const nameFile = req.file.filename;
            const name_image = nameFile;
            const sql = "UPDATE services SET title = ?, description = ?, price = ?, clothingId = ?, image = ? WHERE servicesId = ?";
            const data = [ title, description, price, clothingId, name_image, servicesId ];
            mysql.query(sql, data, (err, result) => {
                if( err ){
                    res.json({ status : "error", message : "Error in the query: "+err });
                }else{
                    res.json({ status : "success", message : "Services update successfully" });
                }
            });
        }
    });
}

servicesControllers.update = async (req, res) => {
    const title = (req.body.title === undefined) ? "" : req.body.title;
    const description = (req.body.description === undefined) ? "" : req.body.description;
    const price = (req.body.price === undefined) ? "" : req.body.price;
    const clothingId = (req.body.clothingId === undefined) ? "" : req.body.clothingId;
    const servicesId = (req.body.servicesId === undefined) ? "" : req.body.servicesId;
    if(title === "" || description === "" || price === "" || clothingId === ""){
        res.json({ status : "error", message : "Fields required" });
    }else{
        const sql = "UPDATE services SET title = ?, description = ?, price = ?, clothingId = ? WHERE servicesId = ?";
        const data = [ title, description, price, clothingId, servicesId ];
        mysql.query(sql, data, (err, result) => {
            if( err ){
                res.json({ status : "error", message : "Error in the query: "+err });
            }else{
                res.json({ status : "success", message : "Services update successfully" });
            }
        });
    }
}

servicesControllers.delete = async (req, res) => {
    const { servicesId } = req.params;
    const sql = "UPDATE services SET state = '0' WHERE servicesId = ?";
    mysql.query(sql, servicesId, (err, result) => {
        if( err ){
            res.json({ status : "error", message : "Error in the query: "+err });
        }else{
            res.json({ status : "success", message : "Delete successfully" });
        }
    })
}

servicesControllers.list = async (req, res) => {
    const sql = "SELECT * FROM services WHERE state = '1'";
    mysql.query(sql, (err, result) => {
        if(err){
            res.json({ status : "error", message : "Error in the query: "+err });
        }else{
            res.json({ status: 'success', message: 'Query successfully', data: result });
        }
    });
}

servicesControllers.getId = async (req, res) => {
    const { servicesId } = req.params;
    const sql = "SELECT * FROM services WHERE servicesId = ?";
    mysql.query(sql, servicesId, (err, result) => {
        if(err){
            res.json({ status : "error", message : "Error in the query: "+err });
        }else{
            res.json({ status: 'success', message: 'Query successfully', data: result });
        }
    });
}

module.exports = servicesControllers;