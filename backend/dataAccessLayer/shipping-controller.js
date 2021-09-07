const GetShippingRegions = (request, response) => {
  try {
    let query = `SELECT 
                        A.shipping_region_id AS 'RegionId',
                        A.shipping_region AS 'Region'
                    FROM shipping_region A 
                    ORDER BY shipping_region_id ASC`; // query database to get all the  Shipping Regions

    // execute query
    db.query(query, (err, result) => {
      if (err != null) response.status(500).send({ error: error.message });

      return response.json(result);
    });
  } catch (error) {
    if (error != null) response.status(500).send({ error: error.message });
  }
};
const AddShippingDetails = (request, response) => {
  try {
    let params = request.body;
    console.log("params asdasd");

    let query = `INSERT INTO shipping
    (address_1,address_2,city,country,email,name,postal_code)
    values
    (
        '${params.AddressOne}', 
        '${params.AddressTwo}', 
        '${params.Town}', 
        '${params.Country}', 
        '${params.Email}', 
        '${params.FullName}', 
        '${params.ZipCode}',
        '');`; // query database to get all the  Shipping Regions

    // execute query
    db.query(query, (err, result) => {
      if (err != null) response.status(500).send({ error: err.message });

      return response.json(true);
    });
  } catch (error) {
    if (error != null) response.status(500).send({ error: error.message });
  }
};

const shipping = {
  GetShippingRegions,
  AddShippingDetails,
};

module.exports = shipping;
