"use strict";

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
  // User Object
  let user = {
    mail: "",
    password: "",
  };
  /*
   ******************************************************
   */

  /*
   * Event Listeners
   */
  // Submit form
  $btnLogin.click(function (e) {
    e.preventDefault();
    user.mail = $textMail.val();
    user.password = $textPassword.val();
    //Validate user
    console.log(user);
  });
  /*
   ******************************************************
   */
});
