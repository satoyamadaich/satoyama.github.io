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

    var templateEl = document.getElementById("mail-template");
    var mail_template_text = templateEl.innerHTML.replace("TITLE",decodeURI(ps.title)).replace("DATE", decodeURI(ps.date));
    templateEl.innerHTML = mail_template_text;

    document.querySelectorAll(".mailto-button").forEach((b)=>{
	b.href = "mailto:satoyamadaich@gmail.com?subject=" +
	    encodeURI("里山大地参加申込み") +
	    "&body=" +
	    encodeURI(mail_template_text);
    });
});
