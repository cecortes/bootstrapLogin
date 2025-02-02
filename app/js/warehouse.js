"use strict";

import * as Jarvis from "./jarvisLogic.js";

// Ready function
$(function () {
  /*
   * Dom elements
   */
  const $addWarehouseModal = $("#modalAddWareHouse");
  const $addWarehouseBtn = $("#add-btn");
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
    //Jarvis.GetWorkers(session.token);
  } catch (error) {
    console.error(error);
  }

  $addWarehouseBtn.on("click", async () => {
    // Get Companies by User
    //await Jarvis.GetEmpresasByUser(session.token, $selectEmpresa);
    $addWarehouseModal.modal("show");
  });
  /*
   ******************************************************
   */
});
