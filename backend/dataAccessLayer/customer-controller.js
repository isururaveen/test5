const RegisterCustomer = (request, response) => {
  try {
    //getiing data from body
    console.log(request.body)
    let params = request.body;

    let query = `INSERT INTO customer
                        ( email,mob_phone, name, password)
                        values
                        (
                            '${params.Email}', 
                            '${params.Mobile}', 
                            '${params.FirstName}', 
                            '${params.Password}'
                            );`; // query database to get all the  Shipping Regions

    // execute query
    db.query(query, (err, result) => {
      if (err != null) return response.status(500).send({ error: err.message });

      return response.json(true);
    });
  } catch (error) {
    if (error != null) response.status(500).send({ error: error.message });
  }
};

// validate login details and sign in
const AuthenticateLogin = (request, response) => {
  try {
    let params = request.body;

    let query = `SELECT 
                    A.email AS 'Email',
                    A.password AS 'Password',
                    A.mob_phone AS 'Mobile',
                    A.name AS 'FullName',
                    A.customer_id AS 'CustomerId'
                    FROM  customer A
                    WHERE A.email = '${params.Username}';`; // query database to get all the  Shipping Regions

    // execute query
    db.query(query, (err, result) => {
      //returning error

      if (err != null) response.status(500).send({ error: err.message });
      //returning result
      return response.json(result);
    });
    //catch error
  } catch (error) {
    //returning error

    if (error != null) response.status(500).send({ error: error.message });
  }
};

// sign in using firebase authentication
const SignInRegular = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

const customer = {
  RegisterCustomer,
  AuthenticateLogin,
};

module.exports = customer;
