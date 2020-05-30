const modulo=(()=>{

//Hacemos referencias a las etiqueas html

const carrito = document.querySelector('#lista-productos');
      listCurso = document.querySelector('#list-curso');
      frontCursos = document.querySelector('#cursos');
      btnVaciar=document.querySelector('#vaciar-carrito');
      
      
//Creacion de las clases
//Cracion de las funciones
const comprarCurso = (e)=>{
    e.preventDefault();
    if(e.target.classList.contains('agregarCarrito'))
    {
        const curso = e.target.parentElement.parentElement;
        leerDatos(curso);
    }
    
}

//Creamos la fucion la lectura de los datos
const leerDatos =(curso)=>{
  const infoCurso = {
      imagen:curso.querySelector('img').src,
      titulo:curso.querySelector('h4').textContent,
      precio:curso.querySelector('.precio span').textContent,
      id:curso.querySelector('a').getAttribute('data-id')   
  }
  insertarCarrito(infoCurso);
}

//muestra el curso seleccionado en el carrito
 const insertarCarrito=(curso)=>{
    const fila = document.createElement('tr');
    fila.innerHTML=`
    <td><img src="${curso.imagen}" width=100></td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td><a href="#" class="borrar-curso delete" data-id="${curso.id}">x</a></td>
    `;
    listCurso.appendChild(fila);
    guargarCursoLocalStore(curso);
 }

 const obtenerCurso=()=>{
     let cursoLS;
    //comprobamos si hay algo en el localStore
    if(localStorage.getItem('cursos')===null)
    {
        cursoLS = [];
    }else{
        cursoLS = JSON.parse(localStorage.getItem('cursos'));
    }
   return cursoLS; 
 }

 const guargarCursoLocalStore=(curso)=>{
    let cursos = obtenerCurso();
    cursos.push(curso);
   // El localStore solo entiende en string
   const stringCursos = JSON.stringify(cursos);
   localStorage.setItem('cursos',stringCursos);
 }


//Funcion que me permite eliminar un curso del carrito
const eliminarCurso=(e)=>{
 e.preventDefault();
 let curso;
 let cursoid;
 if(e.target.classList.contains('delete')){
    e.target.parentElement.parentElement.remove();
    curso = e.target.parentElement.parentElement;
    cursoid = curso.querySelector('a').getAttribute('data-id');
 }
eliminarCursoL(cursoid);
}

//Eliminar la curso del localStore
const eliminarCursoL=(id)=>{
    const cursos = obtenerCurso();
    cursos.forEach((curso,index) => {
        if(curso.id===id){
          cursos.splice(index,1);
        }
    });
    localStorage.setItem('cursos',JSON.stringify(cursos));
}

//Fucion el limpiado de todo el carrito
const vaciarCarrito =(e)=>{
    e.preventDefault();
    //listCurso.innerHTML=''; //Eliminación lenta
    console.log(listCurso.firstChild);
    while (listCurso.firstChild) {
       listCurso.removeChild(listCurso.firstChild);
    }   
    vaciarLocalStore();
    return false;
 
}

//Funcion que nos permita vaciar el localStore
const vaciarLocalStore=()=>{
    localStorage.clear();
}

//Hacemos la carga de los cursos almacenados en el locaStore
const mostrarCursos=()=>{
    const cursos = obtenerCurso()
    cursos.forEach(curso => {
        const fila = document.createElement('tr');
        fila.innerHTML=`
        <td><img src="${curso.imagen}" width=100></td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td><a href="#" class="borrar-curso delete" data-id="${curso.id}">x</a></td>
        `;
        listCurso.appendChild(fila);
    });
}
//Creaciones de los eventos
const cargarEventListeners =()=>{

    //Agregamos el evento de carga de los cursos
    document.addEventListener('DOMContentLoaded',mostrarCursos);
    //Se dispara cuando se presiona "Agregar Carrito"
    frontCursos.addEventListener('click', comprarCurso);
    //Cuando se elimina un curso del carrito
    carrito.addEventListener('click',eliminarCurso);
    //btn vaciar el carrito 
    btnVaciar.addEventListener('click',vaciarCarrito);
}
cargarEventListeners();
})();


