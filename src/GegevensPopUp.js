document.getElementById("PopUpForm").onsubmit = (e) => GegevensSubmit(e);

function GegevensSubmit(e)
{
    GetValues();
    e.preventDefault();
}

function GegevensValues()
{
    return {
        VoorNaam: document.getElementById("fname").value,
        AchterNaam: document.getElementById("lname").value,
        Email: document.getElementById("mail").value,
        Telefoon: document.getElementById("phone").value,
    }
}

console.log("here");