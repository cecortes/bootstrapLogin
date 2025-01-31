"use strict";

import * as DbLogin from "./dbLogin.js";
import * as DbCompany from "./dbCompany.js";
import * as DbWorker from "./dbWorker.js";

/*
 * Global Variables
 *
 * Class User
 * @param {String} mail
 * @param {String} password
 * @param {Boolean} validation
 * @method Validate
 * @return {Boolean}
 *
 * Class Session
 * @param {String} token
 * @param {Boolean} logged
 * @method CheckSession
 * @method async ValidateSession
 *
 * Class Company
 * @param {String} userId
 * @param {String} name
 * @param {String} rfc
 * @param {String} logo
 * @param {String} address
 * @param {String} phone
 * @param {String} mail
 * @param {String} giro
 * @param {String} empleados
 * @param {Boolean} validation
 * @method Validate
 * @method async SaveEmpresa
 */

export class Session {
  // Constructor
  constructor() {
    this.token = "";
    this.logged = false;
    this.msg = "";
  }

  // Check session
  CheckSession() {
    // Check if user is logged
    if (Parse.User.current()) {
      this.logged = true;
      this.token = Parse.User.current().id;
    } else {
      this.logged = false;
      this.token = "";
    }
  }

  // Validate session
  async ValidateSession() {
    if (Parse.User.current()) {
      this.logged = true;
      this.token = Parse.User.current().id;
    } else {
      this.logged = false;
      this.token = "";
      // Redirect to login page
      window.location.href = "../../../index.html";
    }
  }
}

export class User {
  // Constructor
  constructor(mail, password) {
    this.mail = mail;
    this.password = password;
    this.validation = false;
  }

  // Validate user
  Validate() {
    // Check if inputs are empty
    if (this.mail === "" || this.password === "") {
      this.validation = false;
      // Add error class to inputs
      $("#mail").addClass("input-alert");
      $("#pass").addClass("input-alert");
      // Add error message
      $("#mail").val("Por favor, complete los campos");
    } else if (this.mail === "" && this.password !== "") {
      this.validation = false;
      // Add error class to inputs
      $("#mail").addClass("input-alert");
      // Add error message
      $("#mail").val("Por favor, complete los campos");
    } else if (this.mail !== "" && this.password === "") {
      this.validation = false;
      // Add error class to inputs
      $("#pass").addClass("input-alert");
    } else if (
      this.mail === "Por favor, complete los campos" &&
      this.password !== ""
    ) {
      this.validation = false;
      $("#pass").removeClass("input-alert");
    } else {
      this.validation = true;
    }

    //Check if user is valid mail with regex
    if (
      this.validation &&
      !this.mail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    ) {
      this.validation = false;
      // Add error class to input
      $("#mail").addClass("input-alert");
      // Add error message
      $("#mail").val("Por favor, ingrese un mail válido");
    }
  }

  // Connect to database
  async Connect(user) {
    const session = new Session();
    // We need to await the Promise and catch the error is mandatory.
    try {
      const result = await DbLogin.Login(user);
      session.token = result;
      session.logged = true;
      session.msg = "Successful login";
    } catch (error) {
      session.token = "";
      session.logged = false;
      session.msg = error;
    } finally {
      return session;
    }
  }
}

export class Company {
  // Constructor
  constructor(userid, name, rfc, logo, address, phone, mail, giro, empleados) {
    this.userid = userid;
    this.name = name;
    this.rfc = rfc;
    this.logo = logo;
    this.address = address;
    this.phone = phone;
    this.mail = mail;
    this.giro = giro;
    this.empleados = empleados;
    this.validation = false;
  }

  // Validate company
  Validate() {
    // Check if inputs are empty
    if (
      this.name === "" &&
      this.rfc === "" &&
      this.address === "" &&
      this.phone === "" &&
      this.mail === ""
    ) {
      this.validation = false;
      // Add error class to inputs
      $("#in_name").addClass("input-alert");
      $("#in_rfc").addClass("input-alert");
      $("#in_address").addClass("input-alert");
      $("#in_phone").addClass("input-alert");
      $("#in_email").addClass("input-alert");
      // Add error message
      $("#in_name").val("Por favor, complete los campos");
      $("#in_rfc").val("Por favor, complete los campos");
      $("#in_address").val("Por favor, complete los campos");
      $("#in_phone").val("Por favor, complete los campos");
      $("#in_email").val("Por favor, complete los campos");
    } else if (this.name === "") {
      this.validation = false;
      // Add error class to input
      $("#in_name").addClass("input-alert");
      // Add error message
      $("#in_name").val("Por favor, complete los campos");
    } else if (this.rfc === "") {
      this.validation = false;
      // Add error class to input
      $("#in_rfc").addClass("input-alert");
      // Add error message
      $("#in_rfc").val("Por favor, complete los campos");
    } else if (this.address === "") {
      this.validation = false;
      // Add error class to input
      $("#in_address").addClass("input-alert");
      // Add error message
      $("#in_address").val("Por favor, complete los campos");
    } else if (this.phone === "") {
      this.validation = false;
      // Add error class to input
      $("#in_phone").addClass("input-alert");
      // Add error message
      $("#in_phone").val("Por favor, complete los campos");
    } else if (this.mail === "") {
      this.validation = false;
      // Add error class to input
      $("#in_email").addClass("input-alert");
      // Add error message
      $("#in_email").val("Por favor, complete los campos");
    } else {
      this.validation = true;
    }

    //Check if email is valid mail with regex
    if (
      this.validation &&
      !this.mail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    ) {
      this.validation = false;
      // Add error class to input
      $("#in_email").addClass("input-alert");
      // Add error message
      $("#in_email").val("Por favor, ingrese un mail válido");
    }

    // Check if userid is empty
    if (this.userid === "") {
      this.validation = false;
    }

    // Check if logo is empty
    if (this.logo === "") {
      this.logo = "../assets/noimg.png";
    }
  }

  // Save to database
  async SaveEmpresa(Empresa) {
    // We need to await the Promise and catch the error is mandatory.
    try {
      const result = await DbCompany.Save(Empresa);
      ShowModalOk("Agregar Empresa:", "Empresa registrada con éxito");
      return true;
    } catch (error) {
      ShowModalError("Error " + error.code, error.message);
      return false;
    }
  }
}

export class Worker {
  // Constructor
  constructor(iduser, name, clave, idworker, empresa, idempresa) {
    this.iduser = iduser;
    this.name = name;
    this.clave = clave;
    this.idworker = idworker;
    this.empresa = empresa;
    this.idempresa = idempresa;
    this.validation = false;
  }

  // Validate worker
  Validate() {
    // Check if inputs are empty
    if (this.name === "" && this.clave === "") {
      this.validation = false;
      // Add error class to inputs
      $("#in_name").addClass("input-alert");
      $("#in_clave").addClass("input-alert");
      // Add error message
      $("#in_name").val("Por favor, complete los campos");
      $("#in_clave").val("Por favor, complete los campos");
    } else if (
      this.name === "" ||
      this.name === "Por favor, complete los campos"
    ) {
      this.validation = false;
      // Add error class to input
      $("#in_name").addClass("input-alert");
      // Add error message
      $("#in_name").val("Por favor, complete los campos");
    } else if (
      this.clave === "" ||
      this.clave === "Por favor, complete los campos"
    ) {
      this.validation = false;
      // Add error class to input
      $("#in_clave").addClass("input-alert");
      // Add error message
      $("#in_clave").val("Por favor, complete los campos");
    } else {
      this.validation = true;
    }
  }

  // Save to database
  async SaveWorker(worker) {
    // We need to await the Promise and catch the error is mandatory.
    try {
      const result = await DbWorker.Save(worker);
      ShowModalOk("Agregar Usuario:", "Usuario registrado con éxito");
      return true;
    } catch (error) {
      ShowModalError("Error " + error.code, error.message);
      return false;
    }
  }
}

/* --> Routing <-- */
/* @param {String} Name of the route, same as sidebar links
 * @actions: Check if user is logged.
 *           Redirect to the route depending on the parameter passed.
 * @return none
 */
export function Routing(route) {
  const session = new Session();
  session.CheckSession();

  if (session.logged) {
    switch (route) {
      case "Main":
        window.location.href = "../html/main.html";
        break;
      case "Dashboard":
        window.location.href = "../html/dashboard.html";
        break;
      case "Productos":
        window.location.href = "../html/products.html";
        break;
      case "EntradasSalidas":
        window.location.href = "../html/movements.html";
        break;
      case "Reportes":
        window.location.href = "../html/reports.html";
        break;
      case "Empresa":
        window.location.href = "../html/company.html";
        break;
      case "Usuarios":
        window.location.href = "../html/users.html";
        break;
      case "Almacen":
        window.location.href = "../html/almacen.html";
        break;
      case "Logout":
        Parse.User.logOut().then(() => {
          window.location.href = "../../../index.html";
        });
        break;
      default:
        window.location.href = "../../../index.html";
        break;
    }
  } else {
    window.location.href = "../../../index.html";
  }
}

/* --> ShowModal <-- */
/* @param {String} title - Modal title
 * @param {String} error - Modal text
 */
function ShowModalError(title, error) {
  $("#modal-title").text(title);
  $("#modal-text").text(error);
  $("#modalError").modal("show");
}

/* --> ShowModalOk <-- */
/* @param {String} title - Modal title
 * @param {String} error - Modal text
 */
function ShowModalOk(title, error) {
  $("#modal-titleOk").text(title);
  $("#modal-textOk").text(error);
  $("#modalSuccess").modal("show");
}

/* --> GetDataCompanies <-- */
/* @param {String} id - User id
 * @actions: Get all companies from the user
 *           Show the companies in the table
 * @return none
 */
export async function GetDataCompanies(id) {
  // We need to await the Promise and catch the error is mandatory.
  try {
    // Clear table
    $("#company-table").empty();
    const result = await DbCompany.GetCompanies(id);
    // Trough the result array to show the companies
    for (let i = 0; i < result.length; i++) {
      // Get image URL
      const logo = result[i].get("logoEmpresa");
      // Add data to the table
      $("#company-table").append(
        '<tr><th scope="row" id="name">' +
          result[i].get("nombreEmpresa") +
          '</th><td id="obj" class="ocultar">' +
          result[i].id +
          '</td><td id="rfc">' +
          result[i].get("rfcEmpresa") +
          '</td><td id="address">' +
          result[i].get("dirEmpresa") +
          '</td><td id="phone">' +
          result[i].get("telEmpresa") +
          '</td><td id="email">' +
          result[i].get("mailEmpresa") +
          '</td><td id="giro" class="ocultar">' +
          result[i].get("giroEmpresa") +
          '</td><td id="empleados" class="ocultar">' +
          result[i].get("noEmpleadosEmpresa") +
          '</td><td id="logo" class="ocultar">' +
          logo.url() +
          '</td><td><button class="btn btn-editar" id="edit-btn">' +
          "Editar" +
          '</button></td><td><button class="btn btn-danger" id="del-btn">' +
          "Borrar" +
          "</button></td></tr>"
      );

      // Load first company logo to main logo
      let logoMain = result[0].get("logoEmpresa");
      $("#logoMain").attr("src", logoMain.url());
    }
  } catch (error) {
    ShowModalError("Error " + error.code, error.message);
  }
}

/* --> DeleteEmpresa <-- */
/* @param {String} id - User id
 * @actions: Delete company from the user
 *           Show the companies in the table
 * @return none
 */
export async function DeleteEmpresa(id) {
  // We need to await the Promise and catch the error is mandatory.
  try {
    const result = await DbCompany.DeleteCompanyById(id);
    ShowModalOk("Eliminar Empresa:", "Empresa eliminada con éxito");
    return true;
  } catch (error) {
    ShowModalError("Error " + error.code, error.message);
    return false;
  }
}

export async function EditEmpresa(empresa) {
  // We need to await the Promise and catch the error is mandatory.
  try {
    const result = await DbCompany.UpdateCompany(empresa);
    ShowModalOk("Editar Empresa:", "Empresa editada con éxito !!!");
    return true;
  } catch (error) {
    ShowModalError("Error " + error.code, error.message);
    return false;
  }
}

/* --> GetEmpresasByUser <-- */
/* @param {String} id - User id
 * @actions: Get all companies from the user
 *           Fill the select with the companies
 * @return none
 */
export async function GetEmpresasByUser(id) {
  // We need to await the Promise and catch the error is mandatory.
  try {
    const result = await DbCompany.GetCompanies(id);
    // Trough the result array to show the companies
    for (let i = 0; i < result.length; i++) {
      // Add data to the select
      $("#in_empresa").append(
        '<option value="' +
          result[i].id +
          '">' +
          result[i].get("nombreEmpresa") +
          "</option>"
      );
    }
  } catch (error) {
    ShowModalError("Error " + error.code, error.message);
  }
}

/* --> GetWorkers <-- */
/* @param {String} id - User id
 * @actions: Get all workers from the user
 *           Show the workers in the table
 * @return none
 */
export async function GetWorkers(id) {
  // We need to await the Promise and catch the error is mandatory.
  try {
    // Clear table
    $("#worker-table").empty();
    const result = await DbWorker.GetWorkers(id);
    // Trough the result array to show the workers
    for (let i = 0; i < result.length; i++) {
      // Add data to the table
      $("#worker-table").append(
        '<tr><th scope="row" id="name">' +
          result[i].get("nombreWorker") +
          '</th><td id="clave">' +
          result[i].get("claveWorker") +
          '</td><td id="empresa">' +
          result[i].get("empresaWorker") +
          '</td><td id="objId" class="ocultar">' +
          result[i].get("idempresaWorker") +
          '</td><td id="workId" class="ocultar">' +
          result[i].id +
          '</td><td id="token" class="ocultar">' +
          result[i].get("userId") +
          '</td><td><button class="btn btn-editar" id="edit-btn">' +
          "Editar" +
          '</button></td><td><button class="btn btn-danger" id="del-btn">' +
          "Borrar" +
          "</button></td></tr>"
      );
    }
  } catch (error) {
    ShowModalError("Error " + error.code, error.message);
  }
}
