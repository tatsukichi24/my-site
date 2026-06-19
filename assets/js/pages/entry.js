(function () {
  var form = document.getElementById("jgs-entry-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    var action = form.getAttribute("action");
    if (!action || action === "#") {
      e.preventDefault();
      window.alert(
        "現在は送信先が未設定です。WordPress 等と接続したあと、フォームの action を設定してください。"
      );
    }
  });
})();
