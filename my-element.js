/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from 'lit';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 1300px;
        
      }
      .titulo{
        font-family: "Lucida Console", "Courier New", monospace;
        font-style: oblique;
        font-size: 70px;
        text-align: center;
        color:#57BED8 ;
        margin-top:10px ;
        margin-bottom:20px;
      }
      .inicio{
        text-align: center;
      }
      .letra{
        font-family: Arial, Helvetica, sans-serif;
        font-style: oblique;
        font-size: 15px;
      }
      button{
        font-family: Arial, Helvetica, sans-serif;
        font-style: oblique;
        font-weight: bold;
        background-color:#86ECEE;
      }
      .formulario{
        border: solid 5px #86ECEE;
      }
    `;
  }

  static get properties() {
    return {
      ID: { type: Number },
      Doc: { type: Number },
      data: { type: Array },
      dataa: { type: Array },
      TypeId: { type: String },
      NumId: { type: String },
      Name: { type: String },
      Fem:{ type: Number },
      Mas:{ type: Number },
    };
  }

  constructor() {
    super();
    this.ID= "";
    this.idInformacion= "";
    this.Doc= "";
    this.data = [];
    this.dataa = [];
    this.numId = "";
    this.typeId = "";
    this.name = "";
    this.lastname = "";
    this.birthDate = "";
    this.gender = "";
    this.adress = "";
    this.phone = "";
    this.occupation = "";
    this.salary = "";
    this.Fem= 0;
    this.Mas= 0;
    this.lista="";
  }

  render() {
    return html`
    
    <p class="titulo">Censo 2021 Argentina <img width=10% src="./argentina.png"/></p>
    <p class="letra">En el siguente formulario se mostrarar los datos de la busqueda realizada por el documento de identificacion, si se desea modificar una vez 
      relice los cambios darle click en actualizar, si se desea guardar datos de un nuevo ciudadano se llena el formulario y posteriormente 
      darle click en guardar y por ultimo si se desea eliminar un ciudadano de la lista, al realizar la busqueda por medio del documento de identificacion
    aparacera un digito unico (id), el cual puede digitar en el recuadro anterior del boton Eliminar y posteriormente darle click para hacer efectiva
  su eliminacion. </p>
    <div class="inicio">
    <p class="letra">Digite el numero de documento de la persona registrada para realizar busqueda y haga click en el boton buscar.</p>
    <input  @change=${this.getDoc}  placeholder="Documento persona" name="doc">
    <button @click=${this._get}>Buscar</button>
    </div>
    <div class="formulario">
      <label class="letra">Codigo unico generado automaticamente:</label>
    <input placeholder="id" name="idInformacion" .value="${this.idInformacion}" readonly> 
    <label class="letra">Cantidad de Mujeres de la poblacion:</label>
    <input placeholder="Mujeres" .value="${this.Fem.toString()}" readonly>  
    <label class="letra">Cantidad de Mujeres de la poblacion:</label>
    <input placeholder="id" .value="${this.Fem.toString()}" readonly>  
    <form action="http://localhost:8080/tp5Servlet/todos" method="POST">
      
      <select name="TypeId" .value="${this.typeId}">
                            <option value="C.C" selected>C.C</option>
                            <option value="T.I">T.I</option>
                            <option value="Pasaporte">Pasaporte</option>
                            </select>
      <input placeholder="Numero de identificacion" name="NumId" .value="${this.numId}" >
      <input placeholder="Nombres" name="Name"  .value="${this.name}" >
      <input placeholder="Apellidos" name="Lastname" .value="${this.lastname}" >
      <label >Fecha DE Nacimiento:</label>
      <input placeholder="AAAA/MM/DD" name="BirthDate" .value="${this.birthDate}" >
      <label for="Gender">Sexo:</label>
      <select  name="Gender"  .value="${this.gender}">
                            <option value="Masculino" selected>Masculino</option>
                            <option value="Femenino">Femenino</option>
                            </select>
      <input placeholder="Direccion" name="Adress" .value="${this.adress}">
      <input placeholder="Telefono" name="Phone" .value="${this.phone}">
      <input placeholder="Ocupacion" name="Occupation" .value="${this.occupation}">
      <input placeholder="Salario" name="Salary" .value="${this.salary}">
      <button type="submit">Guardar</button>
      <button @click=${this._update}>Actualizar</button> 
      </form>
  
    
      <input  @change=${this.getID} placeholder="id de la persona a eliminar" name="Id">
      <button @click=${this._delete}>Borrar</button>
      </div>
      <div>
      <label class="letra">Seleccione la opcion de visualizacion de la lista:</label>
      <select  name="lista" @change="${this._filtrar}" .value="${this.lista}">
                            <option value="1">De manera ascendente pro apellido</option>
                            <option value="2">Por mayoria de edad y desocupados</option>
                            <option value="3">Por debajo de linea de pobreza</option>
                            </select>
    <table >
    <tr>

<td>id</td>
<td>Tipo de identificacion</td>
<td>Numero de identificacion</td>
<td>Nombre</td>
<td>Apellido</td>
<td>Fecha de Nacimiento</td>
<td>Genero</td>
<td>Direccion</td>
<td>Telefono</td>
<td>Ocupacion</td>
<td>Salario</td>
    </tr>

    ${this.data.map(item => html`<tr><td>${item.idInformacion}</td>
     <td> ${item.typeId} </td> 
     <td>${item.numId}</td> 
     <td> ${item.name}  </td>
     <td>${item.lastname} </td>
     <td> ${item.birthDate} </td>
     <td> ${item.gender} </td>
     <td> ${item.adress}  </td>
     <td>${item.phone}  </td>
     <td>${item.occupation}  </td>
     <td>${item.salary}</td></tr>`)}
  
    
</table>
    
    </div>
      
    `;
  }
  getID(e) {
    this.ID = e.target.value;
  } 
  getDoc(f) {
    this.Doc = f.target.value;
  }

  _delete() {
    console.log(this.ID);
    fetch("http://localhost:8080/tp5Servlet/todos?idInformacion=" + this.ID, {
      method: 'DELETE', mode: 'cors', credentials: 'same-origin',
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }).then(() => alert("Se ah eliminado la persona con el documento No " + this.Doc));
   
  }/*
  _filtrar(e) {
    this.lista = e.target.value;
    console.log(this.lista);

    //console.log(this.typeId);
    fetch("http://localhost:8080/tp5Servlet/todos").then(res => res.json()).then(data => {
      //console.log(data)
      console.log("hola")
      switch (this.lista) {
        
        case "1":
          this.data =data.sort(function (a, b) {
            if (a.lastname.toLowerCase() > b.lastname.toLowerCase() ) {
              return 1;
            }
            if (a.lastname.toLowerCase()  < b.lastname.toLowerCase() ) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });
          break;

          case "2":

            this.data=data.filter(i=>(Date.now()-Date(i.birthDate)/31556900000)>18)
            console.log(this.data)
          
           break;
           case "3":
            this.data=data.filter(i =>(i.salary/1) < 5000 )
           break;
      
        default:
          console.log('Lo lamentamos, por el momento no disponemos de esa opcion.');
          break;
      }
    })
  }*/
 _get() {
   // console.log(this.Doc);
    fetch("http://localhost:8080/tp5Servlet/todos").then(res => res.json()).then( async data => {
      //console.log(dataa),
      this.search =data.filter(i =>i.numId == this.Doc )
      console.log(this.search)
      if(this.search.length != 0 ){
      this.idInformacion=this.search[0].idInformacion
      console.log(this.idInformacion)
      this.numId = this.search[0].numId
      this.typeId = this.search[0].typeId
      this.name = this.search[0].name
      this.lastname = this.search[0].lastname
      this.birthDate = this.search[0].birthDate
      this.gender = this.search[0].gender
      this.adress = this.search[0].adress
      this.phone = this.search[0].phone
      this.occupation = this.search[0].occupation
      this.salary = this.search[0].salary
      }else{
        window.alert("No existe registrado el documento digitado")}
        this.Mas=this.data.filter(item =>item.gender=="Masculino").length
    //console.log(this.Mas)
         this.Fem=this.data.filter(item =>item.gender=="Femenino").length
    //console.log(this.Fem)
    })
  
  }
  _update() {
    /* no se puede descomponer el body para que lo acepte 
    let bodyJson= {
      'TypeId': this.typeId,
      'NumId': this.numId,
      'Name' : this.name,
  };*/
    console.log(this.idInformacion);
    console.log('apedillo ',this.lastname);
    fetch("http://localhost:8080/tp5Servlet/todos?idInformacion=" + this.idInformacion + "&NumId=" + this.numId +"&TypeId=" + this.typeId +"&Name=" + this.name + "&Lastname=" + this.lastname + "&BirthDate=" + this.birthDate
      + "&Gender=" + this.gender + "&Adress=" + this.adress + "&Phone=" + this.phone + "&Occupation=" + this.occupation + "&Salary=" + this.salary, { method: 'PUT' })
      .then(() => alert("Modificacion"));
  }

}
window.customElements.define('my-element', MyElement);
