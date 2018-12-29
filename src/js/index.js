"use strict";

var list = document.querySelector(".list");
var xhr = new XMLHttpRequest();
xhr.open("post", "/api/list");
xhr.onload = function (res) {
    // console.log(JSON.parse(res.target.responseText));
    var data = JSON.parse(res.target.responseText);
    var dl = '';
    data.data.map(function (item, index) {
        dl += "\n                        <dl>\n                            <dt>\n                                <img src=\"" + item.img + "\" alt=\"\">\n                            </dt>\n                            <dd>\n                                <p>" + item.info + "</p>\n                                <p>\u89C4\u683C\uFF1A" + item.num + "</p>\n                                <p>\uFFE5" + item.price + "</p>\n                            </dd>\n                        </dl>";
    });
    list.innerHTML = dl;
};
xhr.setRequestHeader("content-type", "application/json");
xhr.send();