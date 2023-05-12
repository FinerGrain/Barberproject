var Time = new Date(2022,12,1);
var Month;

function Dates(huidigeMaand)
{
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function() {
        if(this.readyState != 4) return;

        if(this.status == 200){


            
            let day = new Date();
            let l = JSON.parse(this.responseText);
            l.sort(compareFn);
            console.log(l);

            let html = "";

            let d = new Date(day.getFullYear(), l[0].Maand-1, l[0].Dag).getDay() - 1;
            if(d<0)
                d = 6;
            for(let i = 0; i < d; i++)
            {
                html+=`><li><span class="PopUpNotActive">ㅤ</span></li\n`;
            }

            for (let i = 0; i < l.length; i++)
            {
                let item = l[i];
                let canchoose = day > new Date(day.getFullYear(), item.Maand-1, item.Dag+1) || item.Volgeboekt === "true" || !item.Mogelijk;

                html+=`><li><span class=\"${canchoose ? "PopUpNotActive":"PopUpActive"}\">${item.Dag}</span></li\n`;
            }

            html = html.slice(1,-1);
            html+=">";

            document.getElementById("PopUpDays").innerHTML = html;

            Month = l[0].Maand-1;
            document.getElementById("PopUpCurrentMonth").innerText = MonthsTotal[l[0].Maand-1];

            let DateElement = document.getElementById("PopUpDays").children;
            console.log(DateElement);
            for(var i = 0; i < DateElement.length; i++)
            {
                let item = DateElement.item(i);
            
                item.addEventListener("click", function() {
                    if(this.innerHTML.includes("PopUpNotActive"))
                    {
                        return;
                    }
                
                    try {
                        Time = new Date(day.getFullYear(),Month,parseInt(this.innerText));
                        console.log(Month);
                        console.log(Time);
                        DatumNext();
                    } catch (error) {
                        console.error(error);
                    }
                });
            }

        }
    }
    xml.open("POST", 'http://145.89.192.242:26903/Datums');
    xml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    xml.send(`${encodeURIComponent("Kapper")}=${encodeURIComponent(kap)}&${encodeURIComponent("HuidigeMaand")}=${encodeURIComponent(huidigeMaand)}`);
}

function Times()
{

    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function() {
        if(this.readyState != 4) return;

        if(this.status == 200){

            console.log(this.responseText);
            let l = JSON.parse(this.responseText);
            console.log(l);

            let html = ""

            for (let i = 0; i < l.length; i++) {
                let item = l[i];
                html+=`><li>${GetHours(item.Tijd)}:${GetMinutes(item.Tijd) == 0 ? "00" : GetMinutes(item.Tijd)} - ${GetMinutes(item.Tijd) == 30 ? GetHours(item.Tijd) + 1 : GetHours(item.Tijd)}:${GetMinutes(item.Tijd) == 30 ? "00" : 30}</li\n`
            }

            html = html.slice(1,-1);
            html+=">";
            console.log(html);
            document.getElementById("PopUpTijden").innerHTML = html;

            let TimeElement = document.getElementById("PopUpTijden").children;
            console.log(TimeElement);
            for(var i = 0; i < TimeElement.length; i++ )
            {
                let item = TimeElement.item(i);
            
                item.onclick = function() {
                    console.log(this);
                    try {
                        Time.setHours(GetHours(this.innerText));
                        Time.setMinutes(GetMinutes(this.innerText));
                        console.log(Time);
                        TijdNext();
                    } catch (error) {
                        console.error(error);
                    }
                };
            }
        }
    }

    xml.open("POST", 'http://145.89.192.242:26903/Tijden');
    xml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xml.send(`${encodeURIComponent("Kapper")}=${encodeURIComponent(kap)}&${encodeURIComponent("Maand")}=${encodeURIComponent(Time.getMonth()+1)}&${encodeURIComponent("Dag")}=${encodeURIComponent(Time.getDate())}`);
}

function GetHours(str)
{
    return parseInt(str.split(":")[0])
}

function GetMinutes(str)
{
    return parseInt(str.split(":")[1].slice(0,2))
}

function TijdValue()
{
    return Time;
}

const Months = {
    "Januari" : 0,
    "Februari" : 1,
    "Maart" : 2,
    "April" : 3,
    "Mei" : 4,
    "Juni" : 5,
    "Juli" : 6,
    "Augustus" : 7,
    "September" : 8,
    "Oktober" : 9,
    "November" : 10,
    "December" : 11,
}