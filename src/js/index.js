var xhr = new XMLHttpRequest;
xhr.open("post", "/api/list")
xhr.onload = function(res) {
    console.log(JSON.parse(res.target.responseText))
}
xhr.setRequestHeader("content-type", "application/json");
xhr.send();