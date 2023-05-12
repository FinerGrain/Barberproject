var TotaalGegevens;
document.getElementById("PopUpTotaalNext").onclick = SendAfspraak;

function SetTotaal(gegevens){
    TotaalGegevens = gegevens;
    document.getElementById("PopUpTotaalLocatie").innerText = locations[gegevens.Locatie].Locatie;

    let servi = "\n";

    for(let x in gegevens.Service)
    {
        let value = gegevens.Service[x];
        if(value)
        {
            servi += "- " + x + "\n";
        }
    }

    document.getElementById("PopUpTotaalServices").innerText = servi;
    document.getElementById("PopUpTotaalKapper").innerText = gegevens.Kapper;
    document.getElementById("PopUpTotaalDatum").innerText = `${gegevens.Tijd.getDate()} ${MonthsTotal   [gegevens.Tijd.getMonth()]}`;
    let t = `${gegevens.Tijd.getHours()}:${gegevens.Tijd.getMinutes() == 0 ? "00" : gegevens.Tijd.getMinutes()} - ${gegevens.Tijd.getMinutes() == 30 ? gegevens.Tijd.getHours() + 1 : gegevens.Tijd.getHours()}:${gegevens.Tijd.getMinutes() == 30 ? "00" : 30}`
    document.getElementById("PopUpTotaalTijd").innerText = t;

    let gegev = "\n";

    for(let x in gegevens.Gegevens)
    {
        let value = gegevens.Gegevens[x];
        gegev += x +": "+ value + "\n";
    }

    document.getElementById("PopUpTotaalGegevens").innerText = gegev;
    console.log(gegevens);
}

function SendAfspraak()
{
    document.getElementById("PopUpTotaalNext").onclick = null;
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
        if (this.readyState != 4) return;

        if (this.status == 200) {
            console.log("Returned 200");
            console.log(this.responseText);
            document.getElementById("PopUpTotaal").classList.remove("Show");
            document.getElementById("PopUp").classList.remove("Show");
        }
        document.getElementById("PopUpTotaalNext").onclick = SendAfspraak;
    }

    TotaalGegevens.Service = JSON.stringify(TotaalGegevens.Service);
    TotaalGegevens.Gegevens = JSON.stringify(TotaalGegevens.Gegevens);

    xml.open("POST", 'http://145.89.192.242:26903/AfspraakMaken');
    xml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    console.log(TotaalGegevens);
    let urlEncodedData = "", urlEncodedDataPairs = [], name;
    for (name in TotaalGegevens) {
        urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(TotaalGegevens[name]));
    }
    console.log(urlEncodedData = urlEncodedDataPairs.join("&"));
    xml.send(urlEncodedData);

    TotaalGegevens = null;
}

const MonthsTotal = [
    "Januari",
    "Februari",
    "Maart",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Augustus",
    "September",
    "Oktober",
    "November",
    "December"
]