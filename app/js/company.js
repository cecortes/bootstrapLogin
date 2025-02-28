"use strict";

import * as Jarvis from "./jarvisLogic.js";

// Ready function
$(function () {
  /*
   * Dom elements
   */
  var $logoMain = $("#logoMain");
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
  var $inputEditId = $("#idEdit");
  var $inputEditName = $("#nameEdit");
  var $inputEditRFC = $("#rfcEdit");
  var $imageEditLogo = $("#logoEdit");
  var $inputEditLogo = $("#logoEd");
  var $inputEditAddress = $("#addressEdit");
  var $inputEditTel = $("#telEdit");
  var $inputEditMail = $("#mailEdit");
  var $selectEditGiro = $("#giroEdit");
  var $inputEditEmpleados = $("#noEmpleadosEdit");
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

  $inputEditLogo.change(function (e) {
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

    // Delete company
    if (await Jarvis.DeleteEmpresa(id)) {
      // Get all companies
      await Jarvis.GetDataCompanies(session.token);
    }
  });

  /* --> Edit company button on table <-- !!!!IMPORTANT!!!! */
  $("#company-table").on("click", ".btn-editar", function (e) {
    e.preventDefault();

    // Get name of the company from the row where the button was clicked
    const id = $(this).closest("tr").find("td:eq(0)").text();
    const name = $(this).closest("tr").find("th:eq(0)").text();
    const rfc = $(this).closest("tr").find("td:eq(1)").text();
    const address = $(this).closest("tr").find("td:eq(2)").text();
    const phone = $(this).closest("tr").find("td:eq(3)").text();
    const mail = $(this).closest("tr").find("td:eq(4)").text();
    const giro = $(this).closest("tr").find("td:eq(5)").text();
    const empleados = $(this).closest("tr").find("td:eq(6)").text();
    const logoUrl = $(this).closest("tr").find("td:eq(7)").text();

    // Create company object and set values
    const companyEdit = new Jarvis.Company(
      id,
      name,
      rfc,
      logoUrl,
      address,
      phone,
      mail,
      giro,
      empleados
    );

    // Pass company object to modal
    $inputEditId.val(companyEdit.userid);
    $inputEditName.val(companyEdit.name);
    $inputEditRFC.val(companyEdit.rfc);
    $imageEditLogo.attr("src", companyEdit.logo); // <-- Set image src
    $inputEditAddress.val(companyEdit.address);
    $inputEditTel.val(companyEdit.phone);
    $inputEditMail.val(companyEdit.mail);
    $selectEditGiro.val(companyEdit.giro).change(); // <-- Set selected option
    $inputEditEmpleados.val(companyEdit.empleados).change(); // <-- Set selected option

    // Show modal
    $editCompanyModal.modal("show");
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
  $editCompanyBtn.click(async function () {
    // Create company object with values from modal
    const companyEdited = new Jarvis.Company(
      $inputEditId.val(),
      $inputEditName.val(),
      $inputEditRFC.val(),
      "",
      $inputEditAddress.val(),
      $inputEditTel.val(),
      $inputEditMail.val(),
      $selectEditGiro.val(),
      $inputEditEmpleados.val()
    );

    // Check if logo changed or empty
    if ($inputEditLogo.val() !== "") {
      companyEdited.logo = file;
    } else {
      companyEdited.logo = $imageEditLogo.attr("src");
    }

    // Update company
    if (await Jarvis.EditEmpresa(companyEdited)) {
      // Get all companies
      await Jarvis.GetDataCompanies(session.token);
      // Hide edit modal
      $editCompanyModal.modal("hide");
    }
  });
  /*
   ******************************************************
   */
});
