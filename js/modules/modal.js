
const addButton = document.querySelector('#addButton');
const cancelButton = document.querySelector('#cancelButton');
const modalClose = document.querySelector('.modal__close');
const overlay = document.querySelector('.overlay');
const warning = document.querySelector('#warning');
const dropdownList = document.querySelector("#dropdown");
const form = document.querySelector("form");

const openModal = () => {
    overlay.style.display = 'block';
    document.body.style.overflow = "hidden";
    warning.classList.remove('show-warning');
    warning.classList.add('hide-warning');
    dropdownList.classList.remove("show");
};

export const closeModal = () => {
    overlay.style.display = 'none';
    document.body.style.overflow = "";
    const field = document.querySelector('.dropbtn');
    field.innerHTML = '...';
    form.reset();
};

export const modalFn = () => {
    addButton.addEventListener('click', () => openModal());
    modalClose.addEventListener('click', () => closeModal());
    cancelButton.addEventListener('click', () => closeModal());
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal()
    })
};
