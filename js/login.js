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

                const user_data = {
                    id: res.result.id,
                    token: res.result.token,
                    user_name: $user.val()
                }

                sessionStorage.setItem("user_data", JSON.stringify(user_data));

                window.location.replace("chat.html")
            }
        })
        .catch((err) => {
            alert(err);
        })
})