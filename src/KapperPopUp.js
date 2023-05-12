const KapperHolder = document.getElementById("PopUpKapperHolder");

var Current = null;
var kap = null;

function Kappers() {
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
        if (this.readyState != 4) return;

        if (this.status == 200) {
            console.log(this.responseText);
            let l = JSON.parse(this.responseText);

            let html = "";

            for (let i = 0; i < l.length; i++) {
                let Kapper = l[i];
                console.log(Kapper);
                html += `><label class="PopUpKapperContainer">
                <img src="http://145.89.192.242:26903/KapperFoto/${Kapper.ImageUrl}"><h4>${Kapper.Name}</h4>
                <input type="radio" name="Kapper" value="${i + 1}">
            </label\n`;
            }

            //http://145.89.192.242:26903/ dit moet voor online inladen op de plek tussen <img src=" en images/Kappers/ inclusief de /.

            html = html.slice(1, -1);
            html += ">"

            console.log(html);
            KapperHolder.innerHTML = html;

            let kapper = document.getElementsByClassName("PopUpKapperContainer");
            for (var i = 0; i < kapper.length; i++) {
                let item = kapper.item(i);

                console.log(item.childNodes)

                item.childNodes.item(4).addEventListener("change", function () {
                    (Current) ? console.log(Current.value) : null;
                    if (this !== Current) {
                        console.log("New");
                        (Current) ? Current.parentElement.classList.remove("checked") : null;
                        Current = this;
                        Current.parentElement.classList.add("checked");
                    }
                    console.log(this.value);
                })
            }
        }
        else if(this.status == 404)
        {
            console.log("Geen Kappers");
            KapperTerug();
        }
    }

    xml.open("POST", 'http://145.89.192.242:26903/Kappers');
    xml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    let urlEncodedData = "", urlEncodedDataPairs = [], name;
    for (name in serv) {
        urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(serv[name]));
    }
    console.log(urlEncodedData = urlEncodedDataPairs.join("&"));
    xml.send(urlEncodedData);
}

function KapperValue() {
    kap = Current.parentElement.innerText;
}
