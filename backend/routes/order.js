// const dotenv = require('dotenv').config();
const express = require("express");
const router = express.Router();
const {
  CreateOrder,
  GetShippingDetails,
  UpdateShippingDetails,
  DaleteShippingDetails,
} = require("../dataAccessLayer/order-controller");

//create order
router.post("/submitOrder", CreateOrder);
//get  getShippDetailbyEmail

router.post("/getShippDetailbyEmail", GetShippingDetails);
//  DaleteShippingDetails

router.post("/DaleteShippingDetails", DaleteShippingDetails);
// UpdateShippingDetails

router.post("/UpdateShippingDetails", UpdateShippingDetails);
module.exports = router;
