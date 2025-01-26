"use strict";

import * as Jarvis from "./jarvisLogic.js";

// Ready function
$(function () {
  /*
   * Dom elements
   */
  var $addCompanyModal = $("#modalAddCompany");
  var inputName = $("#in_name");
  var inputRFC = $("#in_rfc");
  var inputLogo = $("#in_logo");
  var inputAddress = $("#in_address");
  var inputPhone = $("#in_phone");
  var inputMail = $("#in_email");
  var selectGiro = $("#in_giro");
  var selectEmpleados = $("#in_noEmpleados");
  var $btnClean = $("#clean-btn");
  var $btnSave = $("#save-btn");
  var $editCompanyModal = $("#modalEditCompany");
  var $addCompanyBtn = $("#add-btn");
  var $editCompanyBtn = $("#edit-btn");
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
  /*
   ****************************************************
   */

  /*
   * Event handlers
   */
  // Add company button
  $addCompanyBtn.click(function () {
    $addCompanyModal.modal("show");
  });

  // Save company button
  $btnSave.click(async function (e) {
    e.preventDefault();

    // Create company object
    const company = new Jarvis.Company(
      inputName.val(),
      inputRFC.val(),
      inputLogo.val(),
      inputAddress.val(),
      inputPhone.val(),
      inputMail.val(),
      selectGiro.val(),
      selectEmpleados.val()
    );

    // Validate company
    company.Validate();

    // Save company
    if (company.validation) {
      console.log(company);
      console.log("Company saved");
      return;
      company.Save();
      $addCompanyModal.modal("hide");
    } else {
      ShowModal("Error", "Faltan campos por llenar");
    }
  });

  // Remove error class on input focus
  inputName.focus(function () {
    // Check if input has error class
    if (inputName.hasClass("input-alert")) {
      // Remove error class
      inputName.removeClass("input-alert");
      // Clear input value
      inputName.val("");
    }
  });

  inputRFC.focus(function () {
    // Check if input has error class
    if (inputRFC.hasClass("input-alert")) {
      // Remove error class
      inputRFC.removeClass("input-alert");
      // Clear input value
      inputRFC.val("");
    }
  });

  inputLogo.focus(function () {
    // Check if input has error class
    if (inputLogo.hasClass("input-alert")) {
      // Remove error class
      inputLogo.removeClass("input-alert");
      // Clear input value
      inputLogo.val("");
    }
  });

  inputAddress.focus(function () {
    // Check if input has error class
    if (inputAddress.hasClass("input-alert")) {
      // Remove error class
      inputAddress.removeClass("input-alert");
      // Clear input value
      inputAddress.val("");
    }
  });

  inputPhone.focus(function () {
    // Check if input has error class
    if (inputPhone.hasClass("input-alert")) {
      // Remove error class
      inputPhone.removeClass("input-alert");
      // Clear input value
      inputPhone.val("");
    }
  });

  inputMail.focus(function () {
    // Check if input has error class
    if (inputMail.hasClass("input-alert")) {
      // Remove error class
      inputMail.removeClass("input-alert");
      // Clear input value
      inputMail.val("");
    }
  });

  // Edit company button
  $editCompanyBtn.click(function () {
    $editCompanyModal.modal("show");
  });
  /*
   ******************************************************
   */
});
