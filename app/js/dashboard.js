"use strict";

// Ready function jQuery new version
$(function () {
  /* --> Dom Elements <-- */
  const $toggleBtn = $("#toggle-btn");

  /* --> Event Listeners <-- */
  $toggleBtn.click(function () {
    $("#sidebar").toggleClass("expand");
  });
});
