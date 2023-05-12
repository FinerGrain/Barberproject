const OpeningsTijdenElement = document.getElementsByClassName("footer-openingstijden")[0];

const dagen = ["MA","DI","WO","DO","VR","ZA","ZO"]

function loadTimes()
{
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function() {
        if(this.readyState != 4) return;

        if(this.status == 200){

            console.log(this.responseText);
            let l = JSON.parse(JSON.parse(this.responseText));
            l.sort(compareFn);
            console.log(l);

            let html = "";

            for(let i = 0; i < l.length; i++)
            {
                let element = l[i];
                let op = time(element.OpeningsTijd);
                let sl = time(element.SluitingsTijd);

                let vandaag = isDag(element.Dag);

                if(op===sl)
                {
                    html+=`<p>${vandaag?"<span id=\"footer-vandaag\">":""}${dagen[element.Dag-1]}: GESLOTEN${vandaag?"</span>":""}</p>\n`
                }
                else
                {
                    html+=`<p>${vandaag?"<span id=\"footer-vandaag\">":""}${dagen[element.Dag-1]}: ${op} - ${sl}${vandaag?"</span>":""}</p>\n`
                }
            }

            console.log(html);
            OpeningsTijdenElement.innerHTML = html;
        }
    }

    xml.open("GET", "http://145.89.192.242:26903/OpeningsTijden")
    xml.send(null);
}

function compareFn(a, b)
{
    return a.Dag - b.Dag;
}

function time(t)
{
    let components = t.split(":");
    return `${components[0]}:${components[1]}`;
}

function isDag(d)
{
    let day = d;
    if(day == 7)
        day = 0;

    return new Date().getDay() == d;
}

loadTimes();