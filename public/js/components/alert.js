export const createAlert = (text,type) => {
    const containerAlert = document.getElementById('c-alert');
    containerAlert.classList.remove('d-none');
    const alert = document.getElementById('alert');
    const typeAlert = (type === 'error') ? 'alert-danger' : 'alert-primary';
    alert.classList.add(typeAlert);
    const textNode = document.createTextNode(text);
    alert.appendChild(textNode);
}

export const deleteAlert = () => {
    const containerAlert = document.getElementById('c-alert');
    containerAlert.classList.add('d-none');
    const alert = document.getElementById('alert');
    alert.classList.remove('alert-danger');
    alert.classList.remove('alert-primary');
    alert.innerHTML = "";
}