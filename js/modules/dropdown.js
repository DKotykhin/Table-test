import { countries } from '/api/countryList.js';

const dropdownButton = document.querySelector("#country");
const dropwownItems = document.querySelectorAll("#dropdown");
const dropdownList = document.querySelector("#dropdown");
const field = document.querySelector('.dropbtn');
const search = document.querySelector("#search");
const warning = document.querySelector('#warning');

dropdownButton.addEventListener('click', () => {
    dropdownList.classList.toggle("show");
    warning.classList.remove('show-warning');
    warning.classList.add('hide-warning');
});

countries.forEach(item => {
    let p = document.createElement("p");
    p.innerHTML = item;
    dropdownList.append(p);

});

search.addEventListener('keyup', () => {
    const filter = search.value;
    search.defaultValue = filter;
    const pTags = dropdownList.getElementsByTagName("p");
    for (const p of pTags) {
        const txtValue = p.textContent || p.innerText;
        if (txtValue.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
            p.style.display = "";
        } else {
            p.style.display = "none";
        }
    }
});

dropwownItems.forEach(element => {
    element.addEventListener('click', (e) => {
        if (e.target.innerText) {
            dropdownList.classList.toggle("show");
            field.innerHTML = e.target.innerText;
        }
    })
});
