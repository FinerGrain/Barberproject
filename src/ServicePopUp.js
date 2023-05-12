const ServiceHolder = document.getElementById("PopUpServiceHolder");

var services = [];
var serv = new Object();

function checkBoxes() 
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
                let Service = l[i];
                console.log(Service);
                html += `><label class="PopUpServiceContainer"><p>${Service.Name}</p>
                    <input type="checkbox">
                    </label\n`;
            }

            html = html.slice(1,-1);
            html+=">"

            console.log(html);
            ServiceHolder.innerHTML = html;

            let service = document.getElementsByClassName("PopUpServiceContainer");
            for(var i = 0; i < service.length; i++ )
            {
                let item = service.item(i);
                let id = i;

                item.childNodes.item(2).onclick = () => {
                    changedBox(id);
                }

                services.push(item)
            }
        }

    }
    
    xml.open("GET", 'http://145.89.192.242:26903/Services');
    xml.send(null);
}

function changedBox(id)
{
    let item = services[id];

    if(item.childNodes.item(2).checked && !item.classList.contains("checked"))
    {
        item.classList.add("checked");
    }
    else if(!item.childNodes.item(2).checked && item.classList.contains("checked"))
    {
        item.classList.remove("checked");
    }

}

function ServiceValues()
{
    let checked = {};
    let service = document.getElementsByClassName("PopUpServiceContainer");

    for(var i = 0; i < service.length; i++)
    {
        let item = service.item(i);

        if(item.childNodes.item(2).checked)
            checked[item.innerText] = true;
    }

    console.log(checked);
    serv = checked;
}

checkBoxes();