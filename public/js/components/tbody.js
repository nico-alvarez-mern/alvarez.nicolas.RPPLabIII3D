export const crearTBody = (listaAutos = [],selectedItem,filtros = null) => {
    const tbody = document.createElement('tbody');
    listaAutos.forEach( element => {
        const tr = document.createElement('tr');
        for (const key in element) {
            if(filtros){
                if(filtros[key]){
                    console.log(filtros[key]);
                }
            }
            const td = document.createElement('td');
            const txtNode = document.createTextNode(element[key]);
            td.appendChild(txtNode);
            tr.appendChild(td);
            tr.classList.add('darken-hover');
        }
        tr.addEventListener('click', () => {
            selectedItem(element);
        });
        tbody.appendChild(tr);
    });
    return tbody;
}

export const actualizarTBody = (tbody) => {
    const table = document.getElementById('myTable');
    //si no tiene tbody lo agrego directamente, sino elimino el anterior
    if(table.childElementCount === 1){
        table.appendChild(tbody);
        return;
    }
    const beforeTBody = table.lastElementChild;
    table.removeChild(beforeTBody);
    table.appendChild(tbody);
}