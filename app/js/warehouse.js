"use strict";

import * as Jarvis from "./jarvisLogic.js";

// Ready function
$(function () {
  /*
   * Dom elements
   */
  const $addWarehouseModal = $("#modalAddWareHouse");
  const $addWarehouseBtn = $("#add-btn");
  const $cleanBtn = $("#clean-btn");
  const $selectEmpresaAdd = $("#in_empresa");
  const $inputName = $("#in_name");
  const $selecTipoAdd = $("#in_tipo");
  const $inputAddr = $("#in_addr");
  const $saveBtn = $("#save-btn");
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

  function CleanAddWarehouseModal() {
    $inputName.val("");
    $inputAddr.val("");

    // Hide modal
    $addWarehouseModal.modal("hide");
  }
  /*
   ******************************************************
   */
  /*
   * Events
   */
  // When document is loaded
  try {
    OpenSession();
    // Get all warehouses
    Jarvis.GetWarehouses(session.token);
  } catch (error) {
    console.error(error);
  }

  $addWarehouseBtn.on("click", async () => {
    // Get Companies by User
    await Jarvis.GetEmpresasByUser(session.token, $selectEmpresaAdd);
    $addWarehouseModal.modal("show");
  });

  $cleanBtn.on("click", () => {
    $inputName.val("");
    $inputAddr.val("");
  });

  $saveBtn.on("click", async (e) => {
    e.preventDefault();

    // New Warehouse fill with form data
    const warehouse = new Jarvis.Warehouse(
      session.token,
      $("#in_empresa option:selected").text(),
      $selectEmpresaAdd.val(),
      $inputName.val(),
      $("#in_tipo option:selected").text(),
      $inputAddr.val()
    );

    // Validate Warehouse
    warehouse.Validate();

    // Save Warehouse
    if (warehouse.validation) {
      try {
        if (await warehouse.SaveWarehouse(warehouse)) {
          CleanAddWarehouseModal();
        }
      } catch (error) {
        CleanAddWarehouseModal();
      }
    }

    // Get all warehouses
    await Jarvis.GetWarehouses(session.token);
  });
  /*
   ******************************************************
   */
});
