window.addEventListener("DOMContentLoaded", function () {
    function params (searchstr) {
	return searchstr.substr(1)
	    .split("&")
	    .reduce((acc, cur) => {
		acc[cur.split("=")[0]] = cur.split("=")[1];
		return acc;
	    }, {});
    }

    var ps = params(location.search);

    document.querySelectorAll(".date").forEach((el)=>el.innerHTML = decodeURI(ps.date));
    document.querySelector("#in-date").value = decodeURI(ps.date);
    document.querySelectorAll(".title").forEach((el)=>el.innerHTML = decodeURI(ps.title));

    function make_row (label) {
        let tr  = document.createElement("tr");
        let td1 = document.createElement("th");
        let td2 = document.createElement("td");
        let input = document.getElementById(label.attributes.for.value);
        td1.appendChild(label);
        td2.appendChild(input);
        tr.appendChild(td1); tr.appendChild(td2);
        return tr;
    }

    let form = document.getElementById("signup-form");
    let tbl = document.createElement("table");
    form.appendChild(tbl);
    form.querySelectorAll("label").forEach((lbl)=>{
        tbl.appendChild(make_row(lbl));
    });

    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        let text = decodeURI(new URLSearchParams(new FormData(form)).toString().split(/[\?\&]/).join("\n\n"));

        let btn = form.querySelector("input[type=submit]");
        btn.value = "送信中";

        Email.send({
            SecureToken : "0f3f703e-d0d9-44b2-a4f5-75bbe1a4954a",
            To : 'satoyamadaich@gmail.com',
            From : "ympbyc@live.jp",
            ReplyTo: document.getElementById("in-email").value,
            Subject : "" + ps.date + " " + ps.title + " 参加申し込み",
            Body : text
        }).then(
            message => {
                alert(message);
                btn.value = "送信済み";
                btn.disabled= true;
            }
        );
    });

    document.querySelector("header").style.backgroundPosition = Math.floor(Math.random() * 100) + "% " + Math.floor(Math.random() * 100) + "%";


    /*document.querySelectorAll(".mailto-button").forEach((b)=>{
	b.href = "mailto:satoyamadaich@gmail.com?subject=" +
	    encodeURI("里山大地参加申込み") +
	    "&body=" +
	    encodeURI(mail_template_text);
    });*/
});
