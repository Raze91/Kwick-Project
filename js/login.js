$("form").on("submit", function (e) {
    e.preventDefault();

    const $user = $("#user");
    const $password = $("#password");

    $.ajax({
        url: `http://greenvelvet.alwaysdata.net/kwick/api/login/${$user.val()}/${$password.val()}`,
        dataType: "json"
    })
        .then((res) => {
            console.log(res)

            if (res.result.status === "failure") {
                alert(res.result.message);
            } else {

                sessionStorage.setItem("id", res.result.id);
                sessionStorage.setItem("token", res.result.token);

                window.location.replace("chat.html")
            }
        })
})