/* --> Back4App <-- */
let parse_app_id = "Vzf8GJiBbnLb3N1bd8rzUzjbGlqajTrXhmhenIHB";
let parse_js_key = "Vxxxrro3sSQ8ZilKtGRyxCLZaYDu9dV9LYbGRLzJ";
let parse_server_url = "https://parseapi.back4app.com/";

/* --> Parse Instance <-- */
Parse.initialize(parse_app_id, parse_js_key);
Parse.serverURL = parse_server_url;

export async function Save(warehouse) {
  // Warehouse
  let Warehouse = Parse.Object.extend("Warehouses");
  let newWarehouse = new Warehouse();

  // Set Warehouse
  newWarehouse.set("userId", warehouse.userid);
  newWarehouse.set("nombreEmpresa", warehouse.empresa);
  newWarehouse.set("idEmpresa", warehouse.idempresa);
  newWarehouse.set("nombreWarehouse", warehouse.name);
  newWarehouse.set("catWareHouse", warehouse.tipo);
  newWarehouse.set("addrWarehouse", warehouse.address);

  // New Promise
  return new Promise((resolve, reject) => {
    // Save Warehouse
    newWarehouse.save().then(
      (result) => {
        // Execute any logic that should take place after the object is saved.
        resolve(result);
      },
      (error) => {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        reject(error);
      }
    );
  });
}

export async function GetWarehouse(token) {
  // Warehouse
  let Warehouse = Parse.Object.extend("Warehouses");
  let query = new Parse.Query(Warehouse);

  // New Promise
  return new Promise((resolve, reject) => {
    // Find all warehouses with the user token
    query.equalTo("userId", token);

    // Sort by createdAt
    query.ascending("createdAt");

    // Execute the query
    query.find().then(
      (results) => {
        // Execute any logic that should take place after the object is saved.
        resolve(results);
      },
      (error) => {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        reject(error);
      }
    );
  });
}

export async function Update(warehouse) {
  // Warehouse
  let Warehouse = Parse.Object.extend("Warehouses");
  let query = new Parse.Query(Warehouse);

  // New Promise
  return new Promise((resolve, reject) => {
    // Find warehouse by id
    query.get(warehouse.id).then(
      (result) => {
        // Update warehouse
        result.set("nombreEmpresa", warehouse.empresa);
        result.set("idEmpresa", warehouse.idempresa);
        result.set("nombreWarehouse", warehouse.name);
        result.set("catWareHouse", warehouse.tipo);
        result.set("addrWarehouse", warehouse.address);

        // Save warehouse
        result.save().then(
          (result) => {
            // Execute any logic that should take place after the object is saved.
            resolve(result);
          },
          (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            reject(error);
          }
        );
      },
      (error) => {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        reject(error);
      }
    );
  });
}

export async function DeleteWarehouseById(id) {
  // Warehouse
  let Warehouse = Parse.Object.extend("Warehouses");
  let query = new Parse.Query(Warehouse);

  // New Promise
  return new Promise((resolve, reject) => {
    // Find warehouse by id
    query.get(id).then(
      (result) => {
        // Delete warehouse
        result.destroy().then(
          (result) => {
            // The object was deleted from the Parse Cloud.
            resolve(result);
          },
          (error) => {
            // The delete failed.
            // error is a Parse.Error with an error code and message.
            reject(error);
          }
        );
      },
      (error) => {
        // The delete failed.
        // error is a Parse.Error with an error code and message.
        reject(error);
      }
    );
  });
}
