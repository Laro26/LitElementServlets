import {html, LitElement, css} from "lit";
export class CensoForm extends LitElement {

    static get properties (){
        return {
            tipoDoc : {type: String, value: 'C.C'},
            documento : {type: String},
            nombre : {type: String},
            apellido : {type: String},
            fechaNacimiento : {type: String},
            sexo : {type: String},
            direccion : {type: String},
            telefono : {type: String},
            ocupacion : {type: String},
            ingreso : {type: String},
        };
    }


    static get styles () {
        return css `
        form { background-color: white; padding: 10px;}

        .card {
            /* Add shadows to create the "card" effect */
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
            border: 2px;
            border-radius: 10px;
            width: 100%;
          }
          
          /* On mouse-over, add a deeper shadow */
          .card:hover {
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
          }
          
          /* Add some padding inside the card container */
          .container {
            padding: 10px;
            border: 2px;
            border-radius: 5px;
            font-family: Calibri;
          }
          .card-title{
              color: white;
              font-weight: bold; 
          }

          .fila{
            display: flex;  
            flex-direction:column;
            padding: 2pt;
          }
          
          .myButton {
            box-shadow: 0px 0px 0px 2px #e4ff19;
            background:linear-gradient(to bottom, #7892c2 5%, #476e9e 100%);
            background-color:#7892c2;
            border-radius:10px;
            border:1px solid #4e6096;
            display:inline-block;
            cursor:pointer;
            color:#ffffff;
            font-family:Arial;
            font-size:12px;
            padding: 5px;
            text-decoration:none;
            text-shadow:0px 1px 0px #283966;
        }
        .myButton:hover {
            background:linear-gradient(to bottom, #476e9e 5%, #7892c2 100%);
            background-color:#476e9e;
        }
        .myButton:active {
            position:relative;
            top:1px;
        }
        form{
            border: 2px;
            border-radius: 5px;
        }
        `;
    }

    constructor(){
        super();
        this.sexo="M";
        this.tipoDoc = "C.C";
    }

    render(){
        return html`
            <div class="card">
                <div class="container">
                <h2 class="card-title">Agrega un ciudadano</h2>
                    <div class="form">
                        <div class="fila">
                            <label for="tipoDoc">Selecciona el tipo de documento:</label>
                            <select name="tipoDoc" id="tipoDoc" value="${this.tipoDoc}" @change=${e => this.tipoDoc = e.target.value}>
                                <option value="C.C">C.C</option>
                                <option value="T.I">T.I</option>
                                <option value="Pasaporte">Pasaporte</option>
                                <option value="VISA">Visa</option>
                            </select>
                        </div>
                        <div class="fila">
                            <input name="documento" type="text" @input="${e=> this.documento= e.target.value}" value= "${this.documento}" placeholder="Número de documento" />
                        </div>
                        <div class="fila">
                            <input name="nombre" type="text" value="${this.nombre}" @input= "${e=> this.nombre= e.target.value}" placeholder="Nombre completo" />
                        </div>
                        <div class="fila">
                            <input name="apellido" type="text" value="${this.apellido}" @input= "${e=> this.apellido= e.target.value}" placeholder="Apellido" />
                        </div>
                        <div class="fila">
                            <input name="fechaNacimiento" placeholder="yyyy-mm-dd" type="text" value="${this.fechaNacimiento}" @input= "${e=> this.fechaNacimiento = e.target.value}" placeholder="Fecha de nacimiento" />
                        </div>
                        <div class="fila">
                            <label for="sexo">Sexo:</label>
                            <select name="sexo" id="sexo" @change=${e => this.sexo = e.target.value}>
                            <option value="M">M</option>
                            <option value="F">F</option>
                            </select>
                        </div>
                        <div class="fila">
                            <input name="direccion" type="text" value="${this.direccion}" @input= "${e=> this.direccion= e.target.value}" placeholder="Direccion" />
                        </div>
                        <div class="fila">
                            <input name="telefono" type="text" value="${this.telefono}" @input="${e=> this.telefono= e.target.value}" placeholder="Telefono" />
                        </div>
                        <div class="fila">
                            <input name="ocupacion" type="text" value="${this.ocupacion}" @input= "${e=> this.ocupacion = e.target.value}" placeholder="Ocupacion" />
                        </div>
                        <div class="fila">
                            <input name="ingreso" type="number" value="${this.ingreso}" @input= "${e=> this.ingreso = e.target.value}" placeholder="Ingreso" />
                        </div>
                        <div class="fila">
                            <button class="myButton" @click="${this.handleClick}">GUARDAR DATOS</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        `;
    }
    handleClick(){
        console.log(typeof(this.fechaNacimiento));
        let bodyJson= {
            'tipoDoc': this.tipoDoc,
            'documento': this.documento,
            'nombre' : this.nombre,
            'apellido' : this.apellido,
            'fechaNacimiento': this.fechaNacimiento,
            'sexo' : this.sexo,
            'direccion' : this.direccion,
            'telefono' : this.telefono,
            'ocupacion' : this.ocupacion,
            'ingreso' : this.ingreso
        };
        
        console.log( JSON.stringify(bodyJson));
        fetch(`http://localhost:8080/TPCENSOARGENTINO/ServletCenso`, { method: 'PUT' ,body: bodyJson})
        .then(() => alert("Insercción exitosa"));
    }
    /*
    connectedCallback(){

    }

    disconnectedCallback(){

    }
    attributeChangedCallback(name , oldValue, newValue){

    }
    */
}
window.customElements.define("censo-form",CensoForm);