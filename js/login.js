$("form").on("submit", function (e) {
    e.preventDefault();

    // Champs Nom d'utilisateur et Mot de passe
    const $user = $("#user");
    const $password = $("#password");

    // Requête de connexion de l'utilsateur
    $.ajax({
        url: `http://greenvelvet.alwaysdata.net/kwick/api/login/${$user.val()}/${$password.val()}`,
        dataType: "json"
    })
        .then((res) => {

            // Affiche un message d'erreur en cas d'échec de l'api
            if (res.result.status === "failure") {
                alert(res.result.message);
            } else {

                // Données de l'utilisateur
                const user_data = {
                    id: res.result.id,
                    token: res.result.token,
                    user_name: $user.val()
                }

                // Stocke les données de l'utilisateur
                sessionStorage.setItem("user_data", JSON.stringify(user_data));

                // Redirige vers la page de chat
                window.location.replace("chat.html")
            }
        })
        // Affiche un message d'erreur en cas de problème indépendant de l'api
        .catch((err) => {
            alert(err);
        })
})