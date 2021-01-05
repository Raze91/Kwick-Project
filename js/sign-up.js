$("form").on("submit", function (e) {
    e.preventDefault();

    // Champs Nom d'utilisateur et Mot de passe 
    const $user = $("#user");
    const $password = $("#password");

    // Requête d'inscription de l'utilisateur
    $.ajax({
        url: `http://greenvelvet.alwaysdata.net/kwick/api/signup/${$user.val()}/${$password.val()}`,
        dataType: "json"
    })
        .then((res) => {

            // Affiche un message d'erreur en cas d'échec de l'api
            if(res.result.status === "failure") {
                alert(res.result.message);
            // Redirige vers la page de connexion en cas de réussite
            } else {
                window.location.href = "login.html"
            }
        })
})