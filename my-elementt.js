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
         max-width: 800px;
       }
     `;
   }
 
   static get properties() {
     return {
       ID: { type: Number },
       data: { type: Array },
       search:{type: Object},
     };
   }
 
   constructor() {
     super();
     this.ID;
     this.data = [];
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
     <div>
     <h1>Agrega un Ciudadano al Censo 2021 Argentina</h1>
     <input placeholder="id" name="idInformacion" .value="${this.idInformacion}"  @input="${(e) => this.idInformacion = e.target.value}" readonly> 
       <form action="http://localhost:8080/tp5Servlet/todos" method="POST">
       <input placeholder="Numero de identificacion" name="NumId" .value="${this.numId}" @input="${(e) => this.numId = e.target.value}">
       <input placeholder="Tipo de identificacion" name="TypeId" .value="${this.typeId}"  @input="${(e) => this.typeId = e.target.value}" >
       <input placeholder="Nombres" name="Name"  .value="${this.name}"  @input="${(e) => this.name = e.target.value}" >
       <input placeholder="Apellidos" name="Lastname" .value="${this.lastname}" @input="${(e) => this.lastname = e.target.value}"  >
       <input placeholder="Fecha de nacimiento" name="BirthDate" .value="${this.birthDate}"  @input="${(e) => this.birthDate = e.target.value}" >
       <select  name="Gender"  .value="${this.gender}" @input="${(e) => this.gender = e.target.value}">
                            <option value="Masculino" selected>Masculino</option>
                            <option value="Femenino">Femenino</option>
                            </select>
       <input placeholder="Direccion" name="Adress"  .value="${this.adress}"  @input="${(e) => this.adress = e.target.value}">
       <input placeholder="Telefono" name="Phone" .value="${this.phone}"  @input="${(e) => this.phone = e.target.value}">
       <input placeholder="Ocupacion" name="Occupation"  .value="${this.occupation}"  @input="${(e) => this.occupation = e.target.value}">
       <input placeholder="Salario" name="Salary" .value="${this.salary}"  @input="${(e) => this.salary = e.target.value}" >
       <button type="submit">Guardar</button>
       </form>
       <button @click=${this._update}>Actualizar</button>
       
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
     <button @click=${this._onClick}>Traer Informacion</button>
     </div>
     <input value="${this.ID}" @change=${this.getID} placeholder="id de la persona" name="Id">
       
       <button @click=${this._delete}>Borrar</button>
     `;
   }
   getID(e) {
     this.ID = e.target.value;
  
   }
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
                
            this.data=data.filter(i=>((Date.now()-Date.parse(i.birthDate))/31556900000)>18)
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
  }
   _delete() {
     console.log(this.ID);
     fetch("http://localhost:8080/tp5Servlet/todos?idInformacion=" + this.idI, {
       method: 'DELETE', mode: 'cors', credentials: 'same-origin',
       redirect: 'follow', // manual, *follow, error
       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
     }).then(() => alert("Se ah eliminado la persona con el id" + this.ID));
   }
   _onClick() {
 
     fetch("http://localhost:8080/tp5Servlet/todos").then(res => res.json()).then(data => {
      // console.log(data)
       this.data = data
       this.search= this.data.filter(i =>i.numId==this.ID)
       //console.log(this.search)
       if(this.search.length != 0 ){
        this.idInformacion=this.search[0].idInformacion
        //console.log(this.idInformacion)
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
          console.log(this.Fem)
     })
 
   }
   _update() {
     
    // console.log(this.ID);
     console.log(this.idInformacion);
     console.log(this.name);
     console.log(this.lastname);
     fetch("http://localhost:8080/tp5Servlet/todos?idInformacion=" + this.idInformacion + "&NumId=" + this.numId +"&TypeId=" + this.typeId +"&Name=" + this.name + "&Lastname=" + this.lastname + "&BirthDate=" + this.birthDate
     + "&Gender=" + this.gender + "&Adress=" + this.adress + "&Phone=" + this.phone + "&Occupation=" + this.occupation + "&Salary=" + this.salary,{ method: 'PUT' })
     .then(() => alert("Insercción exitosa"));
   }
   
 }
 window.customElements.define('my-elementt', MyElement);