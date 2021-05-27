import { LitElement, html , css } from "lit";

export class TableForm extends LitElement{
    constructor(){
        super();
    }

    static get properties (){
        return {
            documento : {type: String},
            nombre : {type: String},
            apellido : {type: String},
            direccion : {type: String},
            telefono : {type: String},
            ocupacion : {type: String},
            ingreso : {type: String},
        };
    }


    static get styles () {
        return css `
        span{
            font-family: Calibri;
        }
        td {
            text-align: center;
            vertical-align: middle;
            padding: 8px;
        }
        .mytable{
            padding: 6px;
            font-family: Calibri;
        }
        .mytablethead{
            background-color : black;
        }
    
        .card {
            /* Add shadows to create the "card" effect */
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
            border: 2px;
            border-radius: 10px;
            width: 100%;
            margin-top: 10px;
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
              color: black;
              font-weight: bold; 
          }

          .fila{
            display: flex;  
            flex-direction:column;
            padding: 2pt;
          }
          form{
            border: 2px;
            border-radius: 5px;
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
        `;
    }



    render(){
        return html`
        <img width=25% src="https://i.pinimg.com/originals/31/82/14/318214df9baa4f17246abedf11556063.png"/><br>
        <span>Censo 2021</span> 
        <br/>
        <div style="display: inline">
            <input style="width: 400px"  @input= "${e=> this.documento= e.target.value}" /> 
            <button class="myButton" style="width: 100px" @click="${() => this.handleClick(this.documento)}">BUSCAR</button>
            <button class="myButton" style="width: 100px" @click="${() => this.handleDClick(this.documento)}">ELIMINAR</button>
        </div>

        <form action="http://localhost:8080/TPCENSOARGENTINO/ServletCenso" method="POST">
           
            <div class="fila">
                <input name="documento" type="hidden" value="${this.documento}" placeholder="Nombre completo" />
                <input name="nombre" type="text" value="${this.nombre}" @input= "${e=> this.nombre= e.target.value}" placeholder="Nombre completo" />
            </div>
            <div class="fila">
                <input name="apellido" type="text" value="${this.apellido}" @input= "${e=> this.apellido= e.target.value}" placeholder="Apellido" />
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
                <input class="myButton" type="submit" value="ACTUALIZAR DATOS"/>
            </div>
        
        </form>

        <form action="http://localhost:8080/TPCENSOARGENTINO/ServletCenso" method="GET">
        <div class="fila">
            <label for="opcion">Seleccione una opción para descargar la información:</label>
            <select name="opcion" id="opcion">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <br/>
            <input class="myButton" type="submit" value="DESCARGAR"/>
            </div>
        </form>
        `;
    }
    handleClick(doc){
        fetch(`http://localhost:8080/TPCENSOARGENTINO/ServletCenso?documento=${doc}`, {method: 'GET' })
        .then(response =>  response.json())
        .then(data => {
            console.log(data);
            data = data[0];
            this.nombre= data['nombre'];
            this.apellido = data['apellido'];
            this.direccion = data["direccion"];
            this.telefono = data["telefono"];
            this.ocupacion = data["ocupacion"];
            this.ingreso = data["ingreso"];
        });
    }
    handleDClick(doc){
        fetch(`http://localhost:8080/TPCENSOARGENTINO/ServletCenso?documento=${doc}`, { method: 'DELETE'})
        .then(() => alert("Eliminación exitosa"));
    }
} 

window.customElements.define("table-form" , TableForm);