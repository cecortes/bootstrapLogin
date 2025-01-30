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
  const $selectEmpresa = $("#in_empresa");
  const $inputName = $("#in_name");
  const $inputClave = $("#in_clave");
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

  $addUserBtn.on("click", async () => {
    // Get Companies by User
    await Jarvis.GetEmpresasByUser(session.token);
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
  /*
   ******************************************************
   */
});
