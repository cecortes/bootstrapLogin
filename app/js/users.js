"use strict";

import * as Jarvis from "./jarvisLogic.js";

// Ready function
$(function () {
  /*
   * Dom elements
   */
  const $addUserModal = $("#modalAddUser");
  const $addUserBtn = $("#add-btn");
  const $cleanBtn = $("#clean-btn");
  const $saveBtn = $("#save-btn");
  const $editBtn = $("#edit-btn");
  const $selectEmpresa = $("#in_empresa");
  const $inputName = $("#in_name");
  const $inputClave = $("#in_clave");
  const $editCompanyModal = $("#modalEditCompany");
  const $inputEditId = $("#idEdit");
  const $inputEditName = $("#nameEdit");
  const $inputEditClave = $("#claveEdit");
  const $selectEditEmpresa = $("#empresaEdit");
  /*
   ******************************************************
   */

  /*
   * Global Variables
   */
  // Create session object
  const session = new Jarvis.Session();
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

  function CleanAddUserModal() {
    $inputName.val("");
    $inputClave.val("");

    // Hide modal
    $addUserModal.modal("hide");
  }
  /*
   ******************************************************
   */

  /*
   * Event Listeners
   */
  // When document is loaded
  try {
    OpenSession();
    // Get all workers
    Jarvis.GetWorkers(session.token);
  } catch (error) {
    console.error(error);
  }

  /* --> Edit company button on table <-- !!!!IMPORTANT!!!! */
  $("#worker-table").on("click", ".btn-editar", async function (e) {
    e.preventDefault();

    // Fill select with companies
    $selectEditEmpresa.empty();
    await Jarvis.GetEmpresasByUser(session.token, $selectEditEmpresa);

    // Get name of the company from the row where the button was clicked
    const name = $(this).closest("tr").find("th:eq(0)").text();
    const clave = $(this).closest("tr").find("td:eq(0)").text();
    const empresa = $(this).closest("tr").find("td:eq(1)").text();
    const idEmpresa = $(this).closest("tr").find("td:eq(2)").text();
    const idWorker = $(this).closest("tr").find("td:eq(3)").text();
    const token = $(this).closest("tr").find("td:eq(4)").text();

    // Create worker object and set values
    const workerEdit = new Jarvis.Worker(
      token,
      name,
      clave,
      idWorker,
      empresa,
      idEmpresa
    );

    // Pass company object to modal
    $inputEditId.val(workerEdit.idworker); // object id
    $inputEditName.val(workerEdit.name);
    $inputEditClave.val(workerEdit.clave);
    //$("#empresaEdit option:selected").text(workerEdit.empresa); // Selected option
    $selectEditEmpresa.val(workerEdit.idempresa); // Selected value

    // Show modal
    $editCompanyModal.modal("show");
  });

  $addUserBtn.on("click", async () => {
    // Get Companies by User
    await Jarvis.GetEmpresasByUser(session.token, $selectEmpresa);
    $addUserModal.modal("show");
  });

  $cleanBtn.on("click", () => {
    $inputName.val("");
    $inputClave.val("");
  });

  $saveBtn.on("click", async (e) => {
    e.preventDefault();

    // New Worker object fill with form data
    const worker = new Jarvis.Worker(
      session.token,
      $inputName.val(),
      $inputClave.val(),
      "",
      $("#in_empresa option:selected").text(),
      $selectEmpresa.val()
    );

    // Validate Worker
    worker.Validate();

    // Check if worker is valid
    if (worker.validation) {
      console.log(worker);
      // Save Worker
      if (await worker.SaveWorker(worker)) {
        // Clean modal
        CleanAddUserModal();
      } else {
        CleanAddUserModal();
      }
    }

    // Get all workers
    await Jarvis.GetWorkers(session.token);
  });

  $editBtn.on("click", async (e) => {
    e.preventDefault();

    // New Worker object fill with form data
    const worker = new Jarvis.Worker(
      session.token,
      $inputEditName.val(),
      $inputEditClave.val(),
      $inputEditId.val(),
      $("#empresaEdit option:selected").text(),
      $selectEditEmpresa.val()
    );

    // Validate Worker
    worker.ValidateEdit();

    // Check if worker is valid
    if (worker.validation) {
      // Save Worker
      if (await worker.UpdateWorker(worker)) {
        // Clean modal
        $editCompanyModal.modal("hide");
      } else {
        $editCompanyModal.modal("hide");
      }
    }

    // Get all workers
    await Jarvis.GetWorkers(session.token);
  });

  // Remove error class on input focus
  $inputName.focus(function () {
    // Check if input has error class
    if ($inputName.hasClass("input-alert")) {
      // Remove error class
      $inputName.removeClass("input-alert");
      // Clear input value
      $inputName.val("");
    }
  });

  $inputClave.focus(function () {
    // Check if input has error class
    if ($inputClave.hasClass("input-alert")) {
      // Remove error class
      $inputClave.removeClass("input-alert");
      // Clear input value
      $inputClave.val("");
    }
  });

  $inputEditName.focus(function () {
    // Check if input has error class
    if ($inputEditName.hasClass("input-alert")) {
      // Remove error class
      $inputEditName.removeClass("input-alert");
      // Clear input value
      $inputEditName.val("");
    }
  });

  $inputEditClave.focus(function () {
    // Check if input has error class
    if ($inputEditClave.hasClass("input-alert")) {
      // Remove error class
      $inputEditClave.removeClass("input-alert");
      // Clear input value
      $inputEditClave.val("");
    }
  });
  /*
   ******************************************************
   */
});
