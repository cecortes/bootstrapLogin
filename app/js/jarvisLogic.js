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

/* --> ShowModal <-- */
/* @param {String} title - Modal title
 * @param {String} error - Modal text
 */
function ShowModal(title, error) {
  $("#modal-title").text(title);
  $("#modal-text").text(error);
  $("#modalError").modal("show");
}
