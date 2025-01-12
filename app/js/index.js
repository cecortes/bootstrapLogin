"use strict";

import * as Jarvis from "./jarvisLogic.js";

// Ready function
$(function () {
  /*
   * DOM Elements
   */
  const $textMail = $("#mail"); // Input mail
  const $textPassword = $("#pass"); // Input password
  const $btnLogin = $("#login_button"); // Button login
  /*
   ******************************************************
   */

  /*
   * Global Variables
   */
  /*
   ******************************************************
   */

  /*
   * Event Listeners
   */
  // Submit form
  $btnLogin.click(function (e) {
    e.preventDefault();
    // Create user
    //const user = new Jarvis.User.init($textMail.val(), $textPassword.val());
    const user = new Jarvis.User($textMail.val(), $textPassword.val());
    const usuario = Jarvis.Usuario.init($textMail.val(), $textPassword.val());
    //Validate user
    user.Validate();
    //usuario.Validar();
    //Login user
    if (user.validation) {
      console.log("Login");
      console.log(user.validation);
    }
    if (usuario.validation) {
      console.log("Login");
      console.log(usuario.validation);
    }
  });

  // Remove error text from inputs
  $textMail.focus(function () {
    $textMail.removeClass("input-alert");
    $textMail.val("");
  });

  $textPassword.focus(function () {
    $textPassword.removeClass("input-alert");
  });
  /*
   ******************************************************
   */
});
