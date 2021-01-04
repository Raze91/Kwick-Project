$.ajax({
    url: `http://greenvelvet.alwaysdata.net/kwick/api/talk/list/${sessionStorage.getItem("token")}/0`,
    dataType: "json"
})
    .then((res) => {
        console.log(res)

        res.result.talk.map((msg) => {
            $("section").append(`
            <div>
                <p>${msg.user_name}</p>
                <p>${msg.content}</p>
            </div>`
            )
        })
    })

$.ajax({
    url: `http://greenvelvet.alwaysdata.net/kwick/api/user/logged/${sessionStorage.getItem("token")}`,
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