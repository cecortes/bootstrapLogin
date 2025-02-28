/* --> Back4App <-- */
let parse_app_id = "Vzf8GJiBbnLb3N1bd8rzUzjbGlqajTrXhmhenIHB";
let parse_js_key = "Vxxxrro3sSQ8ZilKtGRyxCLZaYDu9dV9LYbGRLzJ";
let parse_server_url = "https://parseapi.back4app.com/";

/* --> Parse Instance <-- */
Parse.initialize(parse_app_id, parse_js_key);
Parse.serverURL = parse_server_url;

export async function Save(company) {
  // Parse Logo
  let parseLogo;

  // Check if company.logo is a file object or a string
  if (typeof company.logo === "string") {
    // Get image File from company.logo relative path with Fecth API
    const fileResponse = await fetch(company.logo);
    const blobFile = await fileResponse.blob();

    // Create a new Parse File for the image
    parseLogo = new Parse.File("logo.jpg", blobFile);
  } else {
    // Create a new Parse File for the image
    parseLogo = new Parse.File("logo.jpg", company.logo);
  }

  // Company
  let Empresa = Parse.Object.extend("Empresa");
  let newEmpresa = new Empresa();

  // Set Company
  newEmpresa.set("userId", company.userid);
  newEmpresa.set("nombreEmpresa", company.name);
  newEmpresa.set("rfcEmpresa", company.rfc);
  newEmpresa.set("logoEmpresa", parseLogo);
  newEmpresa.set("dirEmpresa", company.address);
  newEmpresa.set("telEmpresa", company.phone);
  newEmpresa.set("mailEmpresa", company.mail);
  newEmpresa.set("giroEmpresa", company.giro);
  newEmpresa.set("noEmpleadosEmpresa", company.empleados);

  // New Promise
  return new Promise((resolve, reject) => {
    // Save Company
    newEmpresa.save().then(
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

export async function GetCompanies(userid) {
  // Empresa
  let Empresa = Parse.Object.extend("Empresa");
  let query = new Parse.Query(Empresa);

  // New Promise
  return new Promise((resolve, reject) => {
    // Find Companies
    query.equalTo("userId", userid);

    // Ordenar los resultados por fecha de creación (más recientes ultimo)
    query.ascending("createdAt");

    query.find().then(
      (results) => {
        // Do something with the returned Parse.Object values
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

export async function DeleteCompanyById(id) {
  // Empresa
  let Empresa = Parse.Object.extend("Empresa");
  let query = new Parse.Query(Empresa);

  // New Promise
  return new Promise((resolve, reject) => {
    // Find Companies
    query.get(id).then(
      (result) => {
        // The object was retrieved successfully.
        result.destroy().then(
          (result) => {
            // The object was deleted from the Parse Cloud.
            resolve(result);
          },
          (error) => {
            // The delete failed.
            reject(error);
          }
        );
      },
      (error) => {
        // The object was not retrieved successfully.
        reject(error);
      }
    );
  });
}

export async function UpdateCompany(company) {
  // Parse Logo
  let parseLogo;

  // Check if company.logo is a file object or a string
  if (typeof company.logo === "string") {
    // Get image File from company.logo relative path with Fecth API
    const fileResponse = await fetch(company.logo);
    const blobFile = await fileResponse.blob();

    // Create a new Parse File for the image
    parseLogo = new Parse.File("logo.jpg", blobFile);
  } else {
    // Create a new Parse File for the image
    parseLogo = new Parse.File("logo.jpg", company.logo);
  }

  // Empresa
  let Empresa = Parse.Object.extend("Empresa");
  let query = new Parse.Query(Empresa);

  // New Promise
  return new Promise((resolve, reject) => {
    // Find Companies
    query.get(company.userid).then(
      (result) => {
        // The object was retrieved successfully.
        result.set("nombreEmpresa", company.name);
        result.set("rfcEmpresa", company.rfc);
        result.set("logoEmpresa", parseLogo);
        result.set("dirEmpresa", company.address);
        result.set("telEmpresa", company.phone);
        result.set("mailEmpresa", company.mail);
        result.set("giroEmpresa", company.giro);
        result.set("noEmpleadosEmpresa", company.empleados);

        result.save().then(
          (result) => {
            // The object was updated successfully.
            resolve(result);
          },
          (error) => {
            // The save failed.
            reject(error);
          }
        );
      },
      (error) => {
        // The object was not retrieved successfully.
        reject(error);
      }
    );
  });
}
