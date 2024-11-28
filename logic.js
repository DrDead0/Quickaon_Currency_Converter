const cchangeURL = "https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest";
const dropdowns = document.querySelectorAll(".dropdown select");
const formCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const butt = document.querySelector("form button");

// Populate dropdown menus with currency options
for (let dropdown of dropdowns) {
    for (let code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        //pre selected code 
        if (dropdown.name === "from" && code === "USD") {
            newOption.selected = "selected";
        } else if (dropdown.name === "to" && code === "INR") {
            newOption.selected = "selected";
        }
        dropdown.appendChild(newOption);
    }
    dropdown.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// contry flag 
const updateFlag = (element) => {
    let code = element.value;
    let countryCode = countryList[code];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    element.parentElement.querySelector("img").src = newSrc;
};

// Handle currency conversion 
butt.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amt input").value;
    let fromCur = formCurr.value;
    let toCur = toCurr.value;

    // Validate user input
    if (!amount || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    const URL = `${cchangeURL}/${fromCur}`; //api

    try {
        // Fetch exchange rates
        let response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        let data = await response.json();

        // Perform currency conversion
        let rate = data.conversion_rates[toCur];
        if (!rate) {
            throw new Error("Conversion rate not found.");
        }

        let convertedAmount = (amount * rate).toFixed(2);
        alert(`${amount} ${fromCur} is approximately ${convertedAmount} ${toCur}`);
    } catch (error) {
        console.error("Error:", error.message);
        alert("An error occurred while fetching currency conversion rates. Please try again.");
    }
});
