import { constants } from "./_constants.js";

const formRowData = (data) => {
    const rowContent = `
        <td>
            ${data.name}
            ${constants.editIcon}
        </td>
        <td>${data.country}</td>
        <td>
            ${data.quantity}
            ${constants.editIcon}
        </td>
        <td>
            ${+data.price}
            ${constants.editIcon}
        </td>
        <td>${+data.quantity * +data.price * 1.25}</td>
        <td>
            <button class='tableButton deleteButton'>Delete</button>
        </td>
    `;
    return rowContent;
};

export default formRowData;