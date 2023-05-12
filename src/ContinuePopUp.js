const PopUp = document.getElementById("PopUp");
const Locatie = document.getElementById("PopUpLocatie");
const Service = document.getElementById("PopUpService");
const Kapper = document.getElementById("PopUpKapper");
const Datum = document.getElementById("PopUpDatum");
const Tijd = document.getElementById("PopUpTijd");
const Gegevens = document.getElementById("PopUpGegevens");
const Totaal = document.getElementById("PopUpTotaal");

document.getElementById("PopUpLocatieNext").onclick = LocatieNext;
document.getElementById("PopUpServiceNext").onclick = ServiceNext;
document.getElementById("PopUpKapperNext").onclick = KapperNext;
document.getElementById("PopUpAfspraakBox").onclick = ShowPopUp;

function ShowPopUp()
{
    closeChat();
    PopUp.classList.add("Show");
    Locatie.classList.add("Show");
}

function LocatieNext()
{
    if(ChosenLocatie < 0 || ChosenLocatie > locations.length)
    {
        return;
    }

    Locatie.classList.remove("Show");
    Service.classList.add("Show");
}

function ServiceNext()
{
    ServiceValues();
    if(Object.keys(serv).length <= 0)
        return;

    Kappers();

    Service.classList.remove("Show");
    Kapper.classList.add("Show");
}

function KapperNext()
{
    if(!Current)
        return;

    KapperValue()
    Dates();
    Kapper.classList.remove("Show");
    Datum.classList.add("Show");
}

function DatumNext()
{
    Times();

    Datum.classList.remove("Show");
    Tijd.classList.add("Show");
}

function TijdNext()
{
    Tijd.classList.remove("Show");
    Gegevens.classList.add("Show");
}

function GetValues()
{
    var values = {
        Locatie:null,
        Service:null,
        Kapper:null,
        Tijd:-1,
        Gegevens:null,
    }

    values.Locatie = ChosenLocatie;
    values.Service = serv;
    values.Kapper = kap;
    values.Tijd = TijdValue();
    values.Gegevens = GegevensValues();

    console.log("Values");

    Gegevens.classList.remove("Show");
    Totaal.classList.add("Show");

    SetTotaal(values);
}

//ShowPopUp();