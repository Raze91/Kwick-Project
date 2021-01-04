$("form").on("submit", function (e) {
    e.preventDefault();

    const user = $("#user").val();
    const password = $("#password").val();

    $.ajax({
        url: `http://greenvelvet.alwaysdata.net/kwick/api/login/${user}/${password}`,
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