"use strict";

import * as Jarvis from "./jarvisLogic.js";

// Ready function jQuery new version
$(function () {
  /* --> Dom Elements <-- */
  const $toggleBtn = $("#toggle-btn");
  const $mainBtn = $("#main-link");
  const $dashBtn = $("#dash-link");
  const $productsBtn = $("#productos-link");
  const $movementsBtn = $("#movements-link");
  const $reportBtn = $("#report-link");
  const $empresaBtn = $("#empresa-link");
  const $usersBtn = $("#usuarios-link");
  const $almacenBtn = $("#almacen-link");
  const $logoutBtn = $("#logout-link");
  /*
   ******************************************************
   */

  /* --> Functions <-- */

  /* --> Redirect <-- */
  /* @param none
   * @actions: Redirect to company page
   * @return none
   */

  /*
   ******************************************************
   */

  /* --> Event Listeners <-- */
  $mainBtn.click(function () {
    Jarvis.Routing("Main");
  });

  $productsBtn.click(function () {
    Jarvis.Routing("Productos");
  });

  $movementsBtn.click(function () {
    Jarvis.Routing("EntradasSalidas");
  });

  $reportBtn.click(function () {
    Jarvis.Routing("Reportes");
  });

  $usersBtn.click(function () {
    Jarvis.Routing("Usuarios");
  });

  $almacenBtn.click(function () {
    Jarvis.Routing("Almacen");
  });

  $toggleBtn.click(function () {
    $("#sidebar").toggleClass("expand");
  });

  $empresaBtn.click(function () {
    Jarvis.Routing("Empresa");
  });

  $dashBtn.click(function () {
    Jarvis.Routing("Dashboard");
  });

  $logoutBtn.click(function () {
    Jarvis.Routing("Logout");
  });
});
