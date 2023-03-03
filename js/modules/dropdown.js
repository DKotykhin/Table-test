import { countries } from '/api/countryList.js';

const dropdownButton = document.querySelector("#country");
const search = document.querySelector("#search");
const dropwownItems = document.querySelectorAll("#dropdown");
const dropdownList = document.querySelector("#dropdown");
const field = document.querySelector('.dropbtn');
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
    const filter = search.value.toUpperCase();
    const p = dropdownList.getElementsByTagName("p");
    for (let i = 0; i < p.length; i++) {
        const txtValue = p[i].textContent || p[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            p[i].style.display = "";
        } else {
            p[i].style.display = "none";
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




