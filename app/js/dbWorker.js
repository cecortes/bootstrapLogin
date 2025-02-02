/* --> Back4App <-- */
let parse_app_id = "Vzf8GJiBbnLb3N1bd8rzUzjbGlqajTrXhmhenIHB";
let parse_js_key = "Vxxxrro3sSQ8ZilKtGRyxCLZaYDu9dV9LYbGRLzJ";
let parse_server_url = "https://parseapi.back4app.com/";

/* --> Parse Instance <-- */
Parse.initialize(parse_app_id, parse_js_key);
Parse.serverURL = parse_server_url;

export async function Save(worker) {
  // Worker
  let Worker = Parse.Object.extend("Worker");
  let newWorker = new Worker();

  // Set Worker
  newWorker.set("userId", worker.iduser);
  newWorker.set("nombreWorker", worker.name);
  newWorker.set("claveWorker", worker.clave);
  newWorker.set("empresaWorker", worker.empresa);
  newWorker.set("idempresaWorker", worker.idempresa);

  // New Promise
  return new Promise((resolve, reject) => {
    // Save Worker
    newWorker.save().then(
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

export async function GetWorkers(token) {
  // Worker
  let Worker = Parse.Object.extend("Worker");
  let query = new Parse.Query(Worker);

  // New Promise
  return new Promise((resolve, reject) => {
    // Find all workers with the user token
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

export async function Update(worker) {
  // Worker
  let Worker = Parse.Object.extend("Worker");
  let query = new Parse.Query(Worker);

  // New Promise
  return new Promise((resolve, reject) => {
    // Find Worker
    query.get(worker.idworker).then(
      (object) => {
        // Update Worker
        object.set("nombreWorker", worker.name);
        object.set("claveWorker", worker.clave);
        object.set("empresaWorker", worker.empresa);
        object.set("idempresaWorker", worker.idempresa);

        // Save Worker
        object.save().then(
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
