export const getPromedioPotencia = (list = []) => {
    const reducer = (acumulador ,valorActual ) => {
        return acumulador + parseInt(valorActual.potencia);
    }
    return list.reduce( reducer, 0 ) / list.length; 
}

export const getMaxPrecio = (list = []) => {
    const valorInicial = list.length ? list[0].precio : 0;
    const reducer = (retorno, valorActual ) => {
        return (retorno <= valorActual.precio) ? retorno : valorActual.precio;
    }
    return list.reduce( reducer, valorInicial );
}

export const getMinPrecio = (list = []) => {
    const valorInicial = list.length ? list[0].precio : 0;
    const reducer = (retorno, valorActual ) => {
        return (retorno >= valorActual.precio) ? retorno : valorActual.precio;
    }
    return list.reduce( reducer, valorInicial );
}


