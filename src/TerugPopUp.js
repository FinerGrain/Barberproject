
document.getElementById("PopUpLocatieTerug").onclick = LocatieTerug;
document.getElementById("PopUpServiceTerug").onclick = ServiceTerug;
document.getElementById("PopUpKapperTerug").onclick = KapperTerug;
document.getElementById("PopUpDatumTerug").onclick = DatumTerug;
document.getElementById("PopUpTijdTerug").onclick = TijdTerug;
document.getElementById("PopUpGegevensTerug").onclick = GegevensTerug;
document.getElementById("PopUpTotaalTerug").onclick = TotaalTerug;

function LocatieTerug()
{
    Locatie.classList.remove("Show");
    PopUp.classList.remove("Show");
}

function ServiceTerug()
{
    Service.classList.remove("Show");
    Locatie.classList.add("Show");
}

function KapperTerug()
{
    Kapper.classList.remove("Show");
    Service.classList.add("Show");
}

function DatumTerug()
{
    Datum.classList.remove("Show");
    Kapper.classList.add("Show");
}

function TijdTerug()
{
    Tijd.classList.remove("Show");
    Datum.classList.add("Show");
}

function GegevensTerug()
{
    Gegevens.classList.remove("Show");
    Tijd.classList.add("Show");
}

function TotaalTerug()
{
    Totaal.classList.remove("Show");
    Gegevens.classList.add("Show");
}