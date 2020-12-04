import {crearTBody,actualizarTBody} from '../components/tbody.js';
import {crearSpinner,quitarSpinner} from '../components/spinner.js';
import {getDatosForm,validarForm,vaciarForm,llenarForm} from '../components/form.js';
import {get,post,put,remove} from '../api/xhr.js';
import {createAlert,deleteAlert} from '../components/alert.js';
import { getMaxPrecio, getMinPrecio, getPromedioPotencia } from '../components/filtros.js';
export let listaAutomoviles = [];
export let selected = null;

export const getItemsDB = () => {
    return new Promise( (res,rej)=>{
        crearSpinner();
        get()
        .then( datos => {
            listaAutomoviles = datos;
            res(listaAutomoviles);
        })
        .catch( err => console.log(err) )
        .finally( ()=> quitarSpinner() );
    });
}

export const crearTable = (list)=>{
    addMaxPrecio(list);
    addPromedioPotencia(list);
    addMinPrecio(list);
    const tbody = crearTBody( list, selectedItem );
    actualizarTBody( tbody );
}

export const guardarPublicacion = () => {
    
    if(!validarForm()){
        deleteAlert();
        createAlert('todos los campos son obligatorios','error');
        return;
    }
    crearSpinner();
    if(selected){
        put({id: null, ...getDatosForm()}, selected.id)
        .then( ()=> {
            deleteAlert();
            createAlert('Publicacion modificada','success');
        })
        .catch( err => {
            console.log(err);
            deleteAlert();
            createAlert('ocurrio un error, intentelo mas tarde', 'error');
        })
        .finally( () => {
            quitarSpinner();
            getItemsDB().then( lista => crearTable(lista) );
        });
        handleCancelar();
        vaciarForm();
        return;
    }
    post({ id: null, ...getDatosForm()} )
    .then( ()=> {
        deleteAlert();
        createAlert('Publicacion añadida con exito','success');
    })
    .catch( err => {
        console.log(err);
        deleteAlert();
        createAlert('ocurrio un error, intentelo mas tarde', 'error');
    })
    .finally( () => {
        quitarSpinner();
        getItemsDB().then( lista => crearTable(lista) );
    });
    vaciarForm();
}

export const selectedItem = (element) => {
    localStorage.setItem('selected', JSON.stringify(element) );
    selected = element;
    llenarForm(selected);
    const btnCancelar = document.getElementById('btnCancelar');
    const btnEliminar = document.getElementById('btnEliminar');
    btnCancelar.classList.remove('hidden');
    btnEliminar.classList.remove('hidden');
}

export const handleCancelar = () => {
    selected = null;
    const btnCancelar = document.getElementById('btnCancelar');
    const btnEliminar = document.getElementById('btnEliminar');
    btnCancelar.classList.add('hidden');
    btnEliminar.classList.add('hidden');
    vaciarForm();
    localStorage.removeItem('selected');
}

export const handleEliminar = () => {
    if(selected){
        crearSpinner();
        remove(selected.id)
        .then( () => {
            deleteAlert();
            createAlert('publicacion eliminada con exito', 'success');
        })
        .catch( err => {
            console.log(err);
            deleteAlert();
            createAlert('ocurrio un error, intentelo mas tarde', 'error');
        })
        .finally( () => {
            quitarSpinner();
            getItemsDB().then( lista => crearTable(lista) );
            handleCancelar();
        });
    }
}

export const handleSelect = (e) => {
    const { value } = e.target;
    const promedio = document.getElementById('promedio');
    if(value === 'venta' || value === 'alquiler'){
        promedio.value = sacarPromedio(value);
    }else{
        promedio.value = '';
    }
}

const sacarPromedio = (transaccion) => {
    let retorno = 0;
    const items = listaAutomoviles.filter( element => transaccion === element.transaccion );
    items.forEach( element => retorno += parseInt(element.precio));
    return retorno / (items.length || 1);
}

export const handleBoxes = () => {
    const venta = document.getElementById('boxVenta');
    const alquiler = document.getElementById('boxAlquiler');
    let nuevaLista = [...listaAutomoviles];
    if(!venta.checked){
        nuevaLista = nuevaLista.filter( element => element.transaccion !== 'venta' );
        crearTable( nuevaLista );
    }else{
        crearTable( nuevaLista );
    }
    if(!alquiler.checked){
        nuevaLista = nuevaLista.filter( element => element.transaccion !== 'alquiler' );
        crearTable( nuevaLista );
    }else{
        crearTable( nuevaLista );
    }
}

const addPromedioPotencia = (list = []) => {
    const promPotencia = document.getElementById('promPotencia');
    promPotencia.value = getPromedioPotencia(list);
}

const addMaxPrecio = (list = []) => {
    const maxPrecio = document.getElementById('maxPrecio');
    maxPrecio.value = getMaxPrecio(list);
}

const addMinPrecio = (list = []) => {
    const minPrecio = document.getElementById('minPrecio');
    minPrecio.value = getMinPrecio(list);
}