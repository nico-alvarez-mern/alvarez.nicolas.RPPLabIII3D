const crearSpinner = ()=>{
    const span = document.getElementById('spinner');
    const img = document.createElement('img');
    img.setAttribute('src', '/assets/rueda.gif');
    img.setAttribute('alt', 'imagen spinner');
    img.setAttribute('width', '100');
    span.appendChild(img);
}
const quitarSpinner = ()=>{
    const span = document.getElementById('spinner');
    span.innerHTML = "";
}

export {
    crearSpinner,
    quitarSpinner
}