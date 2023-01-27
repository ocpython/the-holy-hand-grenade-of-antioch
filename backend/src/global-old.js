function dismissSuccessAlertsAfter5Seconds() {
  let wait_time_in_milliseconds = 5000;
  setTimeout(function () {
    let animation_duration_in_milliseconds = 500;
    $(".alert.alert-success").slideUp(animation_duration_in_milliseconds);
  }, wait_time_in_milliseconds);
}

function initDemoJquery() {
  let $jqueryElement = $("#jquery-demo-click-me");
  $jqueryElement.on("click", function () {
    $jqueryElement.css("background-color", "red");
  });
}

function initDemoFlatpickr() {
  flatpickr(".flatpickr-demo");
}

function initDemoDataTables() {
  $("#datatables-demo").DataTable();
}

function initDemoJqueryUiSortable() {
  $("#jqueryui-sortable-demo").sortable();
}

function initDemoBootstrapTooltips() {
  $('[data-bs-toggle="tooltip"]').tooltip();
}

$(function () {
  console.log("global-old.js - page loaded!");

  initDemoBootstrapTooltips();
  initDemoJquery();
  initDemoFlatpickr();
  initDemoDataTables();
  initDemoJqueryUiSortable();

  dismissSuccessAlertsAfter5Seconds();
});
