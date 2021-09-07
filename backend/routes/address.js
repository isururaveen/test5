const express = require('express');
const router = express.Router();
const { 
    createAddress,
    getAddress,
    editAddress,
    deleteAddress 
 } = require('../dataAccessLayer/address-controller');

//get all Vehicles
router.post('/createAddress', createAddress);
//viewVehicles
router.post('/getAddress/', getAddress);
// editVehicles
router.post('/editAddress', editAddress)
// deleteVehicles
router.post('/deleteAddress', deleteAddress)
module.exports = router;