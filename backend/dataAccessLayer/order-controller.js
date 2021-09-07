const nodemailer = require("nodemailer");

const CreateOrder = (request, response) => {
  try {
    const user = request.body.User;
    const cart = request.body.Cart;
    const remark = request.body.Remarks;
    const Shipping_id=request.body.Shipping_id;
    const totalAmount = request.body.TotalAmount;
    console.log(user);
    console.log(totalAmount);
    console.log(remark);

    let query = `INSERT INTO orders
    (total_amount,created_on,shipped_on,status,comments,customer_id)
VALUES
(
    ${totalAmount}, 
    CURDATE(), 
    CURDATE(), 
    1, 
    '${remark}', 
    ${user.CustomerId}
);`; //query database to get all the departments

    // execute query
    db.query(query, (err, result) => {
      console.log(err)

      console.log(result)
      if (err != null) response.status(500).send({ error: err.message });
      let values = [];

      //  if (result != undefined) {
      cart.forEach((element) => {
        let row = "";
        row = `(
  ${result.insertId},
  ${element.ProductId},
  '',
  '',
  ${element.Quantity},
  ${element.Price}
)`;
        values.push(row);
      });

      let rows = values.toString();

      let subQuery = `INSERT INTO order_detail
              (order_id, product_id, attributes, product_name, quantity, unit_cost)
          values ${rows};`; //query database to get all the departments

      db.query(subQuery, (err, resits) => {
        if (err != null) response.status(500).send({ error: err.message });

        if(resits){
          if (result) {
            let query = `INSERT INTO shipping_order
            (shipping_id,oder_id)
            values
            (
            '${Shipping_id}', 
            '${result.insertId}');`; // query database to get all the  Shipping Regions

            // execute query
            db.query(query, (err, results) => {
              console.log(err);

              if (err != null)
                response.status(500).send({ error: err.message });
              if (results) {
                return response.json(results);
              }
            });
          }
        }
      });
      // }

      //return response.json(result);
    });
  } catch (error) {
    if (error != null) response.status(500).send({ error: error.message });
  }
};

const GetShippingDetails = (request, response) => {
  try {
    const user = request.body.Customer;

    let query = `SELECT *
    FROM  shipping
    WHERE email = '${user.Email}';`; //query database to get all the departments

    // execute query
    db.query(query, (err, result) => {
      if (err != null) response.status(500).send({ error: err.message });
      if (result) {
        return response.json(result);
      }

      //return response.json(result);
    });
  } catch (error) {
    if (error != null) response.status(500).send({ error: error.message });
  }
};

const UpdateShippingDetails = (request, response) => {
  try {
    const user = request.body.Customer;

    let query = `UPDATE  shipping
    SET address_1='${user.address_1}',address_2 ='${user.address_2}', city='${user.city}',
    country='${user.country}', postal_code='${user.postal_code}'
    WHERE email= '${user.email}';`; //query database to get all the departments,oder_id='${user.oder_id}'

    // execute query
    db.query(query, (err, result) => {
      if (err != null) response.status(500).send({ error: err.message });
      if (result) {
        return response.json(result);
      }

      //return response.json(result);
    });
  } catch (error) {
    if (error != null) response.status(500).send({ error: error.message });
  }
};

const DaleteShippingDetails = (request, response) => {
  try {
    const user = request.body.Customer;

    let query = `DELETE FROM  shipping
    WHERE email= '${user.email}';`; //query database to get all the departments

    // execute query
    db.query(query, (err, result) => {
      if (err != null) response.status(500).send({ error: err.message });
      if (result) {
        return response.json(result);
      }

      //return response.json(result);
    });
  } catch (error) {
    if (error != null) response.status(500).send({ error: error.message });
  }
};
const order = {
  CreateOrder,
  GetShippingDetails,
  UpdateShippingDetails,
  DaleteShippingDetails,
};

module.exports = order;
