import sumValue from "./sumValue.js";
import { modalFn, closeModal } from "./modal.js";
import dropdownFn from "./dropdown.js";

window.addEventListener('DOMContentLoaded', () => {

    const table = document.getElementById('table').getElementsByTagName('tbody')[0];
    const tableBody = document.querySelector('.table__body').getElementsByTagName("tr");
    const warning = document.querySelector('#warning');

    const form = document.querySelector("form");
    const emptyMessage = 'There is no products yet';
    const defaultRow = `<td colspan="6" class="table__default">${emptyMessage}</td>`;

    modalFn();
    dropdownFn();

    const removeDefaultRow = () => {
        if (tableBody[0] && tableBody[0].innerText === emptyMessage) {
            tableBody[0].remove()
        }
    };

    const deleteRow = () => {
        for (let i = 0; i < tableBody.length; i++) {
            const td = tableBody[i].getElementsByTagName("td")[5];
            td && td.addEventListener('click', () => {
                const deletedProductName = td.closest('tr').innerText.split('\t')[0];
                td.closest('tr').remove();
                const localStorageData = localStorage.getItem('tableData');
                const dataArray = JSON.parse(localStorageData);
                if (dataArray) {
                    sumValue();
                    const newArray = dataArray.filter(item => item.name !== deletedProductName);
                    localStorage.setItem('tableData', JSON.stringify(newArray));
                }
                if (tableBody.length === 0) {
                    const newRow = table.insertRow(table.rows.length);
                    newRow.innerHTML = defaultRow;
                    localStorage.removeItem('tableData');
                }
            })
        }
    };

    const formData = (data) => {
        const myHtmlContent = `
            <td>${data.name}</td>
            <td>${data.country}</td>
            <td>${data.quantity}</td>
            <td>${data.price}</td>
            <td>${+data.quantity * +data.price * 1.25}</td>
            <td><button class='deleteButton'>Delete</button></td>
        `;
        return myHtmlContent;
    };

    const addRow = (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const quantity = document.getElementById("quantity").value;
        const price = document.getElementById("price").value;
        const country = document.querySelector('.dropbtn').innerHTML;
        if (country === '...') {
            warning.classList.remove('hide-warning')
            warning.classList.add('show-warning')
            return
        };
        const newData = {
            name,
            country,
            quantity,
            price,
        };
        const myHtmlContent = formData(newData);
        removeDefaultRow();
        const newRow = table.insertRow(table.rows.length);
        newRow.innerHTML = myHtmlContent;

        const localStorageData = localStorage.getItem('tableData');
        if (localStorageData) {
            const dataArray = JSON.parse(localStorageData);
            dataArray.push(newData);
            localStorage.setItem('tableData', JSON.stringify(dataArray));
        } else {
            localStorage.setItem('tableData', JSON.stringify([newData]));
        };
        sumValue();
        deleteRow();
        closeModal()
    }
    form.addEventListener("submit", addRow);

    const localStorageData = localStorage.getItem('tableData');
    const dataArray = JSON.parse(localStorageData);
    if (dataArray && dataArray.length) {
        removeDefaultRow();
        dataArray.forEach(element => {
            const newRow = table.insertRow(table.rows.length);
            newRow.innerHTML = formData(element);
        });
        sumValue();
        deleteRow();
    } else {
        const newRow = table.insertRow(table.rows.length);
        newRow.innerHTML = defaultRow;
    };
});
