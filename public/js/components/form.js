export const getDatosForm = ()=>{
    const form = document.getElementById('principalForm');
    const rdoCheked = form.ventaRdo.checked ? 'venta' : 'alquiler';
    return {
        titulo : form.titulo.value,
        transaccion : rdoCheked,
        descripcion : form.descripcion.value,
        precio : form.precio.value,
        puertas : form.puertas.value,
        kms : form.kms.value,
        potencia : form.potencia.value
    }
}

export const validarForm = () => {
    const datosForm = getDatosForm();
    for (const key in datosForm) {
        if( datosForm[key] === '' ){
            return false;
        }
    }
    return true;
}

export const vaciarForm = () => {
    const form = document.getElementById('principalForm');
    form.titulo.value = '';
    form.ventaRdo.checked = true;
    form.descripcion.value = '';
    form.precio.value = '';
    form.puertas.value = '';
    form.kms.value = '';
    form.potencia.value = '';
}

export const llenarForm = ({titulo,transaccion,descripcion,precio,puertas,kms,potencia}) => {
    const form = document.getElementById('principalForm');
    form.titulo.value = titulo;
    form.ventaRdo.checked = transaccion === 'venta';
    form.alquilerRdo.checked = transaccion === 'alquiler';
    form.descripcion.value = descripcion;
    form.precio.value = precio;
    form.puertas.value = puertas;
    form.kms.value = kms;
    form.potencia.value = potencia;
}