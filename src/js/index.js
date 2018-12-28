"use strict";

var list = document.querySelector(".list");
var xhr = new XMLHttpRequest();
xhr.open("post", "/api/list");
xhr.onload = function(res) {
    // console.log(JSON.parse(res.target.responseText));
    var data = JSON.parse(res.target.responseText);
    var dl = '';
    data.data.map(function(item, index) {
        dl += `
                        <dl>
                            <dt>
                                <img src="${item.img}" alt="">
                            </dt>
                            <dd>
                                <p>${item.info}</p>
                                <p>规格：${item.num}</p>
                                <p>￥${item.price}</p>
                            </dd>
                        </dl>`;
    })
    list.innerHTML = dl;
};
xhr.setRequestHeader("content-type", "application/json");
xhr.send();