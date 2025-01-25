"use strict";

// Ready function
$(function () {
  /*
   * Dom elements
   */
  var $addCompanyModal = $("#modalAddCompany");
  var $editCompanyModal = $("#modalEditCompany");
  var $addCompanyBtn = $("#add-btn");
  var $editCompanyBtn = $("#edit-btn");

  /*
   * Event handlers
   */
  // Add company button
  $addCompanyBtn.click(function () {
    $addCompanyModal.modal("show");
  });

  // Edit company button
  $editCompanyBtn.click(function () {
    $editCompanyModal.modal("show");
  });
});
