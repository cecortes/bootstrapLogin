"use strict";

// Ready function
$(function () {
  /*
   * Dom elements
   */
  var $addCompanyModal = $("#modalAddCompany");
  var $addCompanyBtn = $("#add-btn");

  /*
   * Event handlers
   */
  // Add company button
  $addCompanyBtn.click(function () {
    console.log("Add company button clicked");
    $addCompanyModal.modal("show");
  });
});
