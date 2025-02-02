import { COUNTRY_NAMES } from "./data.js";

let selectfrom = document.querySelector(".selectFrom");
let imgfrom = document.querySelector(".imgfrom");
let selectTo = document.querySelector(".selectTo");
let imgTo = document.querySelector(".imgTo");
let convrtbtn = document.querySelector(".convertbtn");
let displayValue = document.querySelector(".valueFromTo");
let switchbtn = document.querySelector(".switchbtn");

let countryShort = Object.keys(COUNTRY_NAMES);
function changeLogo() {
  let selectedCountryfrom = selectfrom.value.slice(0, 2);
  let selectedCountryto = selectTo.value.slice(0, 2);
  imgfrom.src = `https://flagsapi.com/${selectedCountryfrom}/shiny/32.png`;
  imgTo.src = `https://flagsapi.com/${selectedCountryto}/shiny/32.png`;
}
/*
addEventListener("click", (e) => {
  console.log(e);
  });
  */
countryShort.map((country) => {
  selectfrom.innerHTML += `
   <option value="${country}">  ${country} || ${COUNTRY_NAMES[country]}</option>
   `;
  selectTo.innerHTML += `
   <option value="${country}">${country} || ${COUNTRY_NAMES[country]}</option>
   `;
});
changeLogo();
addEventListener("change", () => {
  changeLogo();
});

switchbtn.addEventListener("click", () => {
  let tmpImg = imgfrom.src;
  let tmpV = selectfrom.value;
  imgfrom.src = imgTo.src;
  selectfrom.value = selectTo.value;
  imgTo.src = tmpImg;
  selectTo.value = tmpV;
});

convrtbtn.addEventListener("click", () => {
  let selectedCountryfrom = selectfrom.value;
  let selectedCountryto = selectTo.value;
  let amountNumber = document.querySelector(".amountNumber").value;
  amountNumber = amountNumber ? amountNumber : 1;
  // console.log(selectedCountryfrom);

  fetch(
    `https://v6.exchangerate-api.com/v6/62ba4caf14ddd5e78378f511/latest/${selectedCountryfrom}`
  )
    .then((y) => {
      return y.json();
    })
    .then((data) => {
      let todata = data.conversion_rates[selectedCountryto] * amountNumber;
      // console.log(data.conversion_rates[data.base_code]);
      // console.log(data.conversion_rates[selectedCountryto]);
      displayValue.innerHTML = `${amountNumber} ${selectedCountryfrom} = ${
        Math.round(todata * 100) / 100
      } ${selectedCountryto}`;
    });
  // console.log(amountNumber);
});
