window.addEventListener("DOMContentLoaded", function () {
    document.querySelector("header").style.backgroundPosition = Math.floor(Math.random() * 100) + "% center";

    document.querySelectorAll(".pdflinks").forEach((bns)=>{
        let ul = document.createElement("ul");
        bns.appendChild(ul);
        bns.querySelectorAll("a").forEach((a)=>{
            let li = document.createElement("li");
            a.innerHTML = decodeURI(a.href).replace(/^.*pdf\//, "").replace("里山大地自然学校案内", "").replace(".pdf", "");
            li.appendChild(a);
            ul.appendChild(li);
        });
    });
});
