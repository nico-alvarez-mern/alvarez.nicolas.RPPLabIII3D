import {
  crearTable,
  guardarPublicacion,
  handleCancelar,
  handleEliminar,
  getItemsDB,
  handleSelect,
  handleBoxes,
  selectedItem
} from "./helpers/helper.js";

const btnGuardar = document.getElementById("btnGuardar");
btnGuardar.addEventListener("click", guardarPublicacion);
const btnCancelar = document.getElementById("btnCancelar");
btnCancelar.addEventListener("click", handleCancelar);
const btnEliminar = document.getElementById("btnEliminar");
btnEliminar.addEventListener("click", handleEliminar);
const select = document.getElementById("select");
select.addEventListener("change",  handleSelect);
const ventaBox = document.getElementById('boxVenta');
ventaBox.addEventListener('change', handleBoxes );
const alquilerBox = document.getElementById('boxAlquiler');
alquilerBox.addEventListener('change', handleBoxes );

getItemsDB().then((lista) => crearTable(lista));
if( localStorage.getItem('selected')){
  selectedItem( JSON.parse(localStorage.getItem('selected')) );
}