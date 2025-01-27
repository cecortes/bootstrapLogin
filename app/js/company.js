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
  // Create session object
  const session = new Jarvis.Session();
  let file = "";
  /*
   ******************************************************
   */

  /*
   * Functions
   */

  /* --> OpenSession() */
  /* @params: none
   * @return: none
   * @description: Create session object and check if user is logged
   *               If is not logged, Redirect to login page.
   * @throws: none
   */
  async function OpenSession() {
    session.CheckSession();
    // Validate session
    await session.ValidateSession();
  }

  function CleanAddCompanyModal() {
    inputName.val("");
    inputRFC.val("");
    inputLogo.val("");
    inputAddress.val("");
    inputPhone.val("");
    inputMail.val("");
    selectGiro.val("");
    selectEmpleados.val("");

    // Hide modal
    $addCompanyModal.modal("hide");
  }
  /*
   ****************************************************
   */

  /*
   * Event handlers
   */

  // When document is loaded
  try {
    OpenSession();
    // Get all companies
    Jarvis.GetDataCompanies(session.token);
  } catch (error) {
    console.error(error);
  }

  // Add company button
  $addCompanyBtn.click(function () {
    $addCompanyModal.modal("show");
  });

  // File input change
  inputLogo.change(function (e) {
    // Get file
    file = e.target.files[0];
  });

  // Save company button
  $btnSave.click(async function (e) {
    e.preventDefault();

    // Create company object
    const company = new Jarvis.Company(
      session.token,
      inputName.val(),
      inputRFC.val(),
      file,
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
      if (await company.SaveEmpresa(company)) {
        CleanAddCompanyModal();
      } else {
        CleanAddCompanyModal();
      }
    }

    // Get all companies
    await Jarvis.GetDataCompanies(session.token);
  });

  /*  --> Delete company button on table <-- !!!!IMPORTANT!!!! */
  $("#company-table").on("click", ".btn-danger", async function (e) {
    e.preventDefault();

    // Get name of the company from the row where the button was clicked
    const id = $(this).closest("tr").find("td:eq(0)").text();
    const name = $(this).closest("tr").find("th:eq(0)").text();
    console.log(id);
    console.log(name);

    // Delete company
    if (await Jarvis.DeleteEmpresa(id)) {
      // Get all companies
      await Jarvis.GetDataCompanies(session.token);
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
