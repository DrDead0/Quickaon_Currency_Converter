const countryList = {
    AED: "AE",
    AFN: "AF",
    // ... (rest of the countries from c_list.js)
  };
  
  // Populate Dropdowns with Country Flags and Names
  const populateDropdowns = () => {
    const fromDropdown = document.getElementById("from");
    const toDropdown = document.getElementById("to");
  
    Object.keys(countryList).forEach((currency) => {
      const countryCode = countryList[currency];
      const option = document.createElement("option");
      option.value = currency;
      option.innerHTML = `
        <img src="https://flagcdn.com/w40/${countryCode.toLowerCase()}.png" alt="${currency}" />
        ${currency}
      `;
      fromDropdown.appendChild(option);
      toDropdown.appendChild(option.cloneNode(true));
    });
  };
  
  // Handle Conversion Logic
  const handleConversion = async (event) => {
    event.preventDefault();
    const amount = document.getElementById("amount").value;
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const resultBox = document.getElementById("result-box");
  
    if (!amount || !from || !to) {
      alert("Please fill in all fields!");
      return;
    }
  
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
      const data = await response.json();
      const rate = data.rates[to];
      const result = (amount * rate).toFixed(2);
  
      resultBox.style.display = "block";
      resultBox.textContent = `${amount} ${from} = ${result} ${to}`;
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };
  
  document.getElementById("converter-form").addEventListener("submit", handleConversion);
  populateDropdowns();
  