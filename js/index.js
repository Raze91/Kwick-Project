$("form").on("submit", function (e) {
    e.preventDefault();

    const user = $("#user").val();
    const password = $("#password").val();

    $.ajax({
        url: `http://greenvelvet.alwaysdata.net/kwick/api/signup/${user}/${password}`,
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