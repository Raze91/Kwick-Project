const base_url = "https://greenvelvet.alwaysdata.net/kwick/api"
// Données de l'utilisateur stockées dans le sessionStorage
let user_data;

if (sessionStorage.user_data) {
    user_data = JSON.parse(sessionStorage.user_data);
} else {
    $("section").append(`<div class="notAuthorized">
        <h2>Vous n'êtes pas autorisé à accéder à cette page.</h2>
        <p>Retour à la page d'accueil...</p>
    </div>`)
    setTimeout(() => {
        window.location.href = "../index.html"
    }, 3000);
}

// Requête de récupération des messages
$.ajax({
    url: `${base_url}/talk/list/${user_data.token}/0`,
    dataType: "json"
})
    .then((res) => {
        // Parcourt chaque message 
        res.result.talk.map((msg) => {
            const date = new Date(msg.timestamp * 1000);
            // Jour / Mois / Année
            const DMY = `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
            // Heure / Minute / Secondes
            const HMS = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
            // Affiche les messages
            $("section").append(`
            <div class="${user_data.user_name === msg.user_name ? "currentUser" : "notUser"}">
                <p class="small">${msg.user_name}</p>
                <p>${msg.content}</p>
            </div>
            <p class="timestamp ${user_data.user_name === msg.user_name ? "currentUserT" : "notUserT"}"><small>${DMY} ${HMS}</small></p>
                `
            )
        })
        $("section").scrollTop($("section")[0].scrollHeight);
    })
    // Redirige vers la page d'accueil en cas d'erreur
    .catch(() => {
        window.location.href = "../index.html"
    })

// Requête de récupération des utilisateurs connectés 
$.ajax({
    url: `${base_url}/user/logged/${user_data.token}`,
    dataType: "json"
})
    .then((res) => {
        // Parcourt la liste des utilisateurs et les affiches
        res.result.user.map((user) => $(".ctnr").append(`<p>${user}</p>`))
    })
    .catch(error => console.error(error))

// Event de click sur le bouton de déconnexion
$("#logout").on("click", function (e) {
    // Empêche le rechargement de la page
    e.preventDefault();
    // Requête de déconnexion de l'utlisateur
    $.ajax({
        url: `${base_url}/logout/${user_data.token}/${user_data.id}`,
        dataType: "json"
    })
        .then((res) => {
            // Redirige vers la page d'accueil
            sessionStorage.removeItem("user_data");
            window.location.href = "../index.html";
        })
        .catch(error => console.error(error))
})
// Event de validation de formulaire
$("form").on("submit", function (e) {
    // Empêche le rechargement de la page
    e.preventDefault();
    // Contenu du champ message de l'utilisateur
    const message = $("#message").val();
    // 
    if (message.trim().length) {
        // Requête d'envoie de message de l'utilisateur
        $.ajax({
            url: `${base_url}/say/${user_data.token}/${user_data.id}/${encodeURI(message)}`,
            dataType: "json"
        })
            .then((res) => {
                // Recharge la page afin d'afficher le message envoyé
                window.location.reload();
            })
            .catch(error => console.log(error))
    }
})
// Event de click sur le bouton d'affichage des utilisateurs connectés
$("#accordeon").on("click", function () {
    // Affiche / Cache la partie de la page contenant la liste des utilisateurs
    $("aside").toggleClass("opened");
});
