const DropDownContent = document.getElementById("PopUpLocatieHolder");
const DropDownButton = document.getElementById("PopUpDropDownButton");

var locations = [];
var ChosenLocatie=-1;

DropDownButton.onclick = ShowDropDown;

function ShowDropDown()
{
    DropDownContent.classList.toggle("Show");
}

function Locations()
{
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function() {
        if(this.readyState != 4) return;

        if(this.status == 200){

            console.log(this.responseText);
            let l = JSON.parse(JSON.parse(this.responseText));

            let html = "";

            for(let i = 0; i < l.length; i++)
            {
                let location = l[i];
                locations.push(location);
                console.log(location);
                html += `><div id="LocatieButton"><p>${location.Locatie}</p></div\n`;
            }

            html = html.slice(1,-1);
            html+=">"

            console.log(html);
            DropDownContent.innerHTML = html;

            for (let i = 0; i < DropDownContent.childNodes.length; i++) {
                const element = DropDownContent.childNodes[i];
                element.onclick =() => ChangeLocation(i)
            }
        }
    }

    xml.open("GET", 'http://145.89.192.242:26903/Locaties');
    xml.send(null);
}
// location.onclick = () => {ChangeLocation(id);}

function ChangeLocation(id)
{
    let location = locations[id];
    DropDownButton.innerHTML = "<p>"+location.Locatie+"</p>";
    ChosenLocatie = id;
    ShowDropDown();
}



Locations();