/* --> Back4App <-- */
let parse_app_id = "Vzf8GJiBbnLb3N1bd8rzUzjbGlqajTrXhmhenIHB";
let parse_js_key = "Vxxxrro3sSQ8ZilKtGRyxCLZaYDu9dV9LYbGRLzJ";
let parse_server_url = "https://parseapi.back4app.com/";

/* --> Parse Instance <-- */
Parse.initialize(parse_app_id, parse_js_key);
Parse.serverURL = parse_server_url;

/* --> ShowModal <-- */
function ShowModal(title, error) {
  $("#modal-title").text(title);
  $("#modal-text").text(error);
  $("#modalError").modal("show");
}

/* --> Login <-- */
export function Login(usr) {
  // Check if already logged
  if (Parse.User.current()) {
    // Logout
    Parse.User.logOut()
      .then(() => {
        // Do stuff after successful logout
        console.log("Logout");
      })
      .catch((error) => {
        // Show the error message somewhere
        console.log("Error: " + error.message);
      });
  }

  // Parse User
  Parse.User.logIn(usr.mail, usr.password)
    .then(function (user) {
      // Do stuff after successful login
      console.log("Login: " + user.id);
      console.log("User: " + user.get("username"));
      //res = 1;
    })
    .catch(function (error) {
      // The login failed. Check error to see why.
      //console.log("Error: " + error.message);
      ShowModal("Login Error", error.message);
      //Clear inputs
      $("#mail").val("");
      $("#pass").val("");
    });
}
