const Karyawan = require("../models/karyawan.model.js");

// Create and save a new Karyawan
exports.create = (req, res) => {
    // Valudate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Karyawan
    const karyawan = new Karyawan({
        emp_no: req.body.emp_no,
        birth_date: req.body.birth_date,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        hire_date: req.body.hire_date,
    });

    // Save Karyawan in the database
    Karyawan.create(karyawan, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occored while creating the Karyawan."
            });
        else res.json({
            "status" : true,
            "data" : data
        });
    });
};

// Retrieve all Karyawans from the database (with condition).
exports.findAll = (req, res) => {
    const emp_no =  req.query.emp_no;
    Karyawan.getAll(emp_no, (err, data) => {
        if (err)
        {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status : false,
                    message: `Data Karyawan Tidak Ditemukan`
                });
            } else {
                res.status(500).send({
                    status : false,
                    message: `Error retrieving Karyawan with emp_no ${emp_no}.`
                });
            }
        } 
        else res.json({
            "status" : true,
            "data" : data
        });    
    });
};

// Updated a Karyawan identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // console.log(req.body);
    Karyawan.updateById(
        req.body.emp_no,
        new Karyawan(req.body),
        (err, data) => {
            if (err) {
                if(err.kind === "not_found") {
                    res.status(404).send({
                        message: `Data Karyawan Tidak Ditemukan`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Karyawan witd emp_no " + req.body.emp_no
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Karyawan with the specified id in the request
exports.delete = (req, res) => {
    if (!req.body.emp_no) {
        res.status(400).send({
            message: "ID can not be empty!"
        });
    } else {
        Karyawan.remove(req.body.emp_no, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Data Karyawan Tidak Ditemukan`
                    });
                } else {
                    res.status(500).send({
                        message: "Could not delete Karyawan with emp_no " + req.body.emp_no
                    });
                }
            } else res.send({ message: `Karyawan was deleted successfully!` });
        });
    }
    
};
