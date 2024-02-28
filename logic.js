const cchangeURL = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_FAdHQliAMx0DN6s1YFPRsfsgaoSIUJZiio5rf5aq";
const dropdowns = document.querySelectorAll(".dropdown select");
const formCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const butt = document.querySelector("form button");

for (let dropdown of dropdowns) {
    for (let code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if (dropdown.name === "from" && code === "USD") {
            newOption.selected = "selected";
        } else {
            if (dropdown.name === "to" && code === "INR") {
                newOption.selected = "selected";
            }
        }
        dropdown.appendChild(newOption);
    }
    dropdown.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let code = element.value;
    let countryCode = countryList[code];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    element.parentElement.querySelector("img").src = newSrc;
};

butt.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amt input").value;
    let fromCur = formCurr.value;
    let toCur = toCurr.value;
    const URL = `${cchangeURL}&=currencie${fromCur}&base_currency=${toCur}`; //currencies=INR&base_currency=BGN
    // full api =https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_FAdHQliAMx0DN6s1YFPRsfsgaoSIUJZiio5rf5aq
    //&currencies=INR&base_currency=BGN

    try {
        let response = await fetch(URL);

        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        let data = await response.json();

        // Perform currency conversion or other actions with the fetched data
        let convertedAmount = amount * data.rates[toCur];
        console.log(`${amount} ${fromCur} is approximately ${convertedAmount.toFixed(2)} ${toCur}`);
    } catch (error) {
        console.error("Error:", error.message);
    }
});
