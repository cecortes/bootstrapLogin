"use strict";

import * as DbLogin from "./dbLogin.js";

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
 *
 * Class Company
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
 * @method Save
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
  constructor(name, rfc, logo, address, phone, mail, giro, empleados) {
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
  }

  // Connect to database
  async Save(company) {
    const session = new Session();
    // We need to await the Promise and catch the error is mandatory.
    try {
      const result = await DbLogin.SaveCompany(company);
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

/* --> ShowModal <-- */
/* @param {String} title - Modal title
 * @param {String} error - Modal text
 */
function ShowModal(title, error) {
  $("#modal-title").text(title);
  $("#modal-text").text(error);
  $("#modalError").modal("show");
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
