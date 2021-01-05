const base_url = "http://greenvelvet.alwaysdata.net/kwick/api"
const user_data = JSON.parse(sessionStorage.user_data);

$.ajax({
    url: `${base_url}/talk/list/${user_data.token}/0`,
    dataType: "json"
})
    .then((res) => {
        console.log(res)

        res.result.talk.map((msg) => {

            const date = new Date(msg.timestamp * 1000);

            const DMY = `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;

            const HMS = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;

            $("section").append(`
            <div>
                <p class="small">${msg.user_name}</p>
                <p>${msg.content}</p>
            </div>
            <p class="timestamp"><small>${DMY} ${HMS}</small></p>
                `
            )
        })
    })

$.ajax({
    url: `${base_url}/user/logged/${user_data.token}`,
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
        url: `${base_url}/logout/${user_data.token}/${user_data.id}`,
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
        url: `${base_url}/say/${user_data.token}/${user_data.id}/${encodeURI(message)}`,
        dataType: "json"
    })
        .then((res) => {
            console.log(res);

            if (res.result.status === "failure") {
                alert(res.result.message);
            }

            window.location.reload();
        })
})