module.exports = app => {
    const karyawan = require("../controllers/karyawan.controller.js");
    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", karyawan.create);

    // Retrieve all Tutorials
    router.get("/", karyawan.findAll);

    // Retrieve a single Tutorial with id
    // router.get("/:id", karyawan.findOne);

    // Update a Tutorial with id
    router.put("/", karyawan.update);

    // Delete a Tutorial with id
    router.delete("/", karyawan.delete);
    
    app.use('/karyawan-rest-server-express/api/karyawan', router);
};