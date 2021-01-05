$("form").on("submit", function (e) {
    e.preventDefault();

    const $user = $("#user");
    const $password = $("#password");

    $.ajax({
        url: `http://greenvelvet.alwaysdata.net/kwick/api/signup/${$user.val()}/${$password.val()}`,
        dataType: "json"
    })
        .then((res) => {
            console.log(res)

            if(res.result.status === "failure") {
                alert(res.result.message);
            } else {
                window.location.replace("pages/login.html")
            }
        })
})