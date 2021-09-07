var express = require('express');
var app = express();

const createAddress = (req, res) => {
    try {
        let data = {
            address_1: req.body.address_1, 
            address_2: req.body.address_2, 
            city: req.body.city,
            country: req.body.country,
            email : req.body.email,
            postal_code : req.body.postal_code
        };
    sql = "INSERT INTO shipping SET ?";
    query = db.query(sql, data,(err, results) => {
        if(err){
            res.send(err);
        }else{
            res.send({data:"Record has been Added..!!"});
        }
    });
   } catch (error) {
    if (error != null) res.status(500).send({ error: error.message });
  }
};

const editAddress = (req, res) => {
    try {
      id = req.body.shipping_id;
    let sql = "UPDATE shipping SET address_1='"+req.body.address_1+"',address_2='"+req.body.address_2+"', city='"+req.body.city+"', country='"+req.body.country+"',email='"+req.body.email+"',postal_code='"+req.body.postal_code+"'WHERE shipping_id ="+id;
    query = db.query(sql,(err, results) => {
      if (err != null) res.status(500).send({ error: error.message });
           return res.json(results);
    });
    } catch (error) {
        if (error != null) res.status(500).send({ error: error.message });
      } 
};

const getAddress = (req, res) => {
  try {
   email = req.body.email;
   console.log(email);
   let sql = "SELECT * FROM shipping WHERE email='"+req.body.email+"'";
   query = db.query(sql,(err, results) => {
    if(err){ 
       error ="Error ";
       return res.json(err); 
    } 
    else
    {
      success ="Successfully shown shipping";
      return res.json(results);
    }
  });


} catch (error) {
  if (error != null) res.status(500).send({ error: error.message });
} 
 /*try {
 
  query = db.query(sql,(err, results) => {
    if(err){ 
       error ="Error iccured while deleting shipping";
       return res.json(err); 
    } 
    else
    {
      success ="Successfully deleting shipping";
      return res.json(results);
    }
  });
} catch (error) {
  if (error != null) res.status(500).send({ error: error.message });
}  */

};

const deleteAddress = (req, res) => {

  try {
    let sql = "DELETE FROM shipping WHERE shipping_id="+req.body.id+"";
    query = db.query(sql,(err, results) => {
      if(err){ 
         error ="Error iccured while deleting shipping";
         return res.json(error); 
      } 
      else
      {
        success ="Successfully deleting shipping";
         return res.json(success);
      }
    });
} catch (error) {
    if (error != null) res.status(500).send({ error: error.message });
  } 
};
  
const addresses = {
    createAddress,
    getAddress,
    editAddress,
    deleteAddress 
  };
  
  module.exports = addresses;