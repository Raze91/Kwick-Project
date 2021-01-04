const base_url = "http://greenvelvet.alwaysdata.net/kwick/api"
$.ajax({
    url: `${base_url}/talk/list/${sessionStorage.getItem("token")}/0`,
    dataType: "json"
})
    .then((res) => {
        console.log(res)

        res.result.talk.map((msg) => {
            $("section").append(`
            <div>
                <p class="small">${msg.user_name}</p>
                <p>${msg.content}</p>
            </div>`
            )
        })
    })

$.ajax({
    url: `${base_url}/user/logged/${sessionStorage.getItem("token")}`,
    dataType: "json"
})
    .then((res) => {
        console.log("logged users : ", res)

        res.result.user.map((user) => {
            $(".ctnr").append(`
            <p>${user}</p>
            `)
        })
    })

$("#logout").on("click", function (e) {
    e.preventDefault();

    $.ajax({
        url: `${base_url}/logout/${sessionStorage.getItem("token")}/${sessionStorage.getItem("id")}`,
        dataType: "json"
    })
        .then((res) => {
            console.log(res);

            if (res.result.status === "failure") {
                alert(res.result.message);
            } else {
                window.location.href = "../index.html";
            }
        })

})

$("form").on("submit", function (e) {
    e.preventDefault();

    const message = $("#message").val();

    console.log(message);

    $.ajax({
        url: `${base_url}/say/${sessionStorage.getItem("token")}/${sessionStorage.getItem("id")}/${message}`,
        dataType: "json"
    })
        .then((res) => {
            console.log(res);

            if (res.result.status === "failure") {
                alert(res.result.message);
            }
        })
})