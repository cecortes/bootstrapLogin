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
  const $modalId = $("#modalError"); // Modal error
  const $modalTitle = $("#modal-title"); // Modal title
  const $modalText = $("#modal-text"); // Modal text
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
   * Functions
   */

  /* --> ShowModal <-- */
  /* @param {String} title - Modal title
   * @param {String} error - Modal text
   */
  function ShowModal(title, error) {
    $modalTitle.text(title);
    $modalText.text(error);
    $modalId.modal("show");
  }

  /* --> ClearFields <-- */
  /* @param none
   *  @actions: Clear text inputs
   *  @return none
   */
  function ClearFields() {
    $textMail.val("");
    $textPassword.val("");
  }

  /*
   ******************************************************
   */

  /*
   * Event Listeners
   */
  // Submit form
  $btnLogin.click(async function (e) {
    e.preventDefault();
    // Create user
    const user = new Jarvis.User($textMail.val(), $textPassword.val());
    //Validate user
    user.Validate();
    //Login user
    if (user.validation) {
      // Connect to database
      const session = await user.Connect(user);

      // Check if user is logged
      if (session.logged) {
        // Redirect to home
        window.location.href = "./app/html/dashboard.html";
        //console.log("Login: " + session.token);
        ClearFields();
      } else {
        // Show error
        ShowModal("Login Error", session.msg);
        // Clear inputs
        ClearFields();
      }
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
