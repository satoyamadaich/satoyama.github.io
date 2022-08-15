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

    try {
	    document.getElementById("program-name").value = decodeURI(ps.title);
    	document.getElementById("program-date").value = decodeURI(ps.date);
    }catch(err){}

	try{
		document.getElementById("console").innerHTML=decodeURI(JSON.stringify(ps, null, 2));
	}catch(err){}

	if (ps.name) {
		Email.send({
		    Host : "smtp.yourisp.com",
		    Username : "username",
		    Password : "password",
		    To : 'satoyamadaich@gmail.com',
		    From : "you@isp.com",
		    Subject : "里山大地参加申し込み " + ps["program-name"],
		    Body : JSON.stringify(ps, null, 2)
		}).then(
  			message => alert(message)
		);
	}

    /*
    var templateEl = document.getElementById("mail-template");
    var mail_template_text = templateEl.innerHTML.replace("TITLE",decodeURI(ps.title)).replace("DATE", decodeURI(ps.date));
    templateEl.innerHTML = mail_template_text;
    document.querySelectorAll(".mailto-button").forEach((b)=>{
	b.href = "mailto:satoyamadaich@gmail.com?subject=" +
	    encodeURI("里山大地参加申込み") +
	    "&body=" +
	    encodeURI(mail_template_text);
    });
    */
});
