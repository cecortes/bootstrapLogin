"use strict";

import * as Db from "./jarvisDb.js";

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
 * Object Usuario
 * @param {String} mail
 * @param {String} password
 * @param {Boolean} validation
 * @return {Boolean}
 * @method Validar
 */

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
  Connect(user) {
    Db.Login(user);
  }
}

// Object Usuario
export const Usuario = {
  // Constructor
  init: function (mail, password) {
    this.mail = mail;
    this.password = password;
    this.validation = false;
    this.Validar = Validar;
    return this;
  },
};

// Validate user method
function Validar() {
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
  if (this.validation && !this.mail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    this.validation = false;
    // Add error class to input
    $("#mail").addClass("input-alert");
    // Add error message
    $("#mail").val("Por favor, ingrese un mail válido");
  }
}
