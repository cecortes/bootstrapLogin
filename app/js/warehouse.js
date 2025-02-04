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
  const $editWarehouseModal = $("#modalEditWarehouse");
  const $editBtn = $("#edit-btn");
  const $selectEditEmpresa = $("#edit_empresa");
  const $inputEditName = $("#edit_name");
  const $selectEditTipo = $("#edit_tipo");
  const $inputEditAddr = $("#edit_addr");
  const $inputEditId = $("#edit_id");
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

  /* --> Edit warehouse button on table <-- !!!!IMPORTANT!!!! */
  $("#warehouse-table").on("click", ".btn-editar", async function (e) {
    e.preventDefault();

    // Fill select with warehouses
    $selectEditEmpresa.empty();
    await Jarvis.GetEmpresasByUser(session.token, $selectEditEmpresa);

    // Get data of the warehouse from the row where the button was clicked
    const objectid = $(this).closest("tr").find("td:eq(0)").text();
    const userid = $(this).closest("tr").find("td:eq(1)").text();
    const empresa = $(this).closest("tr").find("td:eq(2)").text();
    const idempresa = $(this).closest("tr").find("td:eq(3)").text();
    const name = $(this).closest("tr").find("th:eq(0)").text();
    const tipo = $(this).closest("tr").find("td:eq(4)").text();
    const addr = $(this).closest("tr").find("td:eq(5)").text();

    // Create warehouse object and set values
    const warehouseEdit = new Jarvis.Warehouse(
      objectid,
      userid,
      empresa,
      idempresa,
      name,
      tipo,
      addr
    );

    // Pass warehouse object to modal
    //$("#edit_empresa option:selected").text(warehouseEdit.empresa); // Selected option
    $inputEditName.val(warehouseEdit.name);
    $inputEditAddr.val(warehouseEdit.address);
    $selectEditTipo.val(warehouseEdit.tipo); // Selected value
    $selectEditEmpresa.val(warehouseEdit.idempresa); // Selected value
    $inputEditId.val(warehouseEdit.id);

    // Show modal
    $editWarehouseModal.modal("show");
  });

  /*  --> Delete company button on table <-- !!!!IMPORTANT!!!! */
  $("#warehouse-table").on("click", ".btn-danger", async function (e) {
    e.preventDefault();

    // Get name of the warehouse from the row where the button was clicked
    const id = $(this).closest("tr").find("td:eq(0)").text();

    // Delete warehouse
    if (await Jarvis.DeleteWarehouse(id)) {
      // Get all warehouses
      await Jarvis.GetWarehouses(session.token);
    }
  });

  $addWarehouseBtn.on("click", async () => {
    // Get Companies by User
    $selectEmpresaAdd.empty();
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
      "",
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

  $editBtn.on("click", async (e) => {
    e.preventDefault();

    // New Warehouse object fill with form data
    const warehouse = new Jarvis.Warehouse(
      $inputEditId.val(),
      session.token,
      $("#edit_empresa option:selected").text(),
      $selectEditEmpresa.val(),
      $inputEditName.val(),
      $("#edit_tipo option:selected").text(),
      $inputEditAddr.val()
    );

    // Validate Warehouse
    warehouse.ValidateEdit();

    // Save Warehouse
    if (warehouse.validation) {
      try {
        if (await warehouse.UpdateWarehouse(warehouse)) {
          $editWarehouseModal.modal("hide");
        }
      } catch (error) {
        $editWarehouseModal.modal("hide");
      }
    }

    // Get all warehouses
    await Jarvis.GetWarehouses(session.token);
  });

  //Remove error class on input focus
  $inputName.on("focus", () => {
    // Check if input has error class
    if ($inputName.hasClass("input-alert")) {
      // Remove error class
      $inputName.removeClass("input-alert");
      // Clear input value
      $inputName.val("");
    }
  });

  $inputAddr.on("focus", () => {
    // Check if input has error class
    if ($inputAddr.hasClass("input-alert")) {
      // Remove error class
      $inputAddr.removeClass("input-alert");
      // Clear input value
      $inputAddr.val("");
    }
  });

  $inputEditName.on("focus", () => {
    // Check if input has error class
    if ($inputEditName.hasClass("input-alert")) {
      // Remove error class
      $inputEditName.removeClass("input-alert");
      // Clear input value
      $inputEditName.val("");
    }
  });

  $inputEditAddr.on("focus", () => {
    // Check if input has error class
    if ($inputEditAddr.hasClass("input-alert")) {
      // Remove error class
      $inputEditAddr.removeClass("input-alert");
      // Clear input value
      $inputEditAddr.val("");
    }
  });
  /*
   ******************************************************
   */
});
