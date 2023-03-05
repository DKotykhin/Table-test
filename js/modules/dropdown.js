import { countries } from '/api/countryList.js';

const dropdownButton = document.querySelector("#country");
const dropdownList = document.querySelector("#dropdown");
const field = document.querySelector('.dropbtn');
const search = document.querySelector("#search");
const warning = document.querySelector('#warning');
const modal = document.querySelector(".modal");

countries.forEach(item => {
    let p = document.createElement("p");
    p.innerHTML = item;
    dropdownList.append(p);
});

modal.addEventListener('click', (e) => {
    if (!(e.target === field || e.target === search)) {
        if (dropdownList.classList.contains('show')) {
            dropdownList.classList.remove("show");
        }
    }
});

dropdownButton.addEventListener('click', () => {
    dropdownList.classList.toggle("show");
    warning.classList.remove('show-warning');
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

dropdownList.addEventListener('click', (e) => {
    if (e.target.closest('p')) {
        field.innerHTML = e.target.innerText;
    }
})
