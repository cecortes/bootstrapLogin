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
