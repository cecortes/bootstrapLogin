"use strict";

// Ready function jQuery new version
$(function () {
  const $toggleBtn = $("#toggle-btn");

  $toggleBtn.click(function () {
    console.log("clicked");
    $("#sidebar").toggleClass("expand");
  });
});
