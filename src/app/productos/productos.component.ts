import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TotalService } from '../total.service';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  template: `
    <app-pago [childMessage]="parentMessage"></app-pago>
  `,
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  totalDinero = 0;
  totalCarrito = 0;
  hola = ['hola','como'];
  clave = new FormControl('');
  cantidad = new FormControl();
  productosCarrito: any[] = []; // Array para el carrito
  productosCantidad = [{
                        codigo: 0,
                        cant: 0,
                      }
  ];
  productos: any[] = [];
  productosActual1 = [   // Array para items en stock
    {
      codigo: 211763, nombre: 'Pedal de efecto Boss DD-8 ', precio: 179.900,
      descripcion: 'Delay digital boss DD-8', img: '../../assets/tarjetas/boss1.jpg',
      tags : "pedal"
    },
    {
      codigo: 207467, nombre: 'Roland AC60 ', precio: 519.900,
      descripcion: 'Este amplificador estéreo acústico (30w x 2) ofrece un chorus estéreo / multibanda', img: '../../assets/tarjetas/amp1.jpg',
      tags : "nvidia, msi, gtx"
    },
    {
      codigo: 1105866, nombre: 'Guitarra eléctrica Ltd EC401', precio: 390.000,
      descripcion: 'GTR negra capsulas activas', img: '../../assets/tarjetas/gt1.jpg',
      tags : "guitarra"
    },
    {
      codigo: 1108058, nombre: 'Ernie Ball', precio: 12000,
      descripcion: 'Cuerdas', img: '../../assets/tarjetas/cuerdas1.jpg',
      tags : "guitarra, cuerdas"
    },
    {
      codigo: 1097512, nombre: 'Guitarra electroacústica Takamine', precio: 130.000,
      descripcion: 'Guitarra electro acustica', img: '../../assets/tarjetas/gt2.jpg',
      tags : "guitarra"
    },
    {
      codigo: 211479, nombre: 'Guitarra electroacústica ', precio: 85.990,
      descripcion: 'GTR acustica', img: '../../assets/tarjetas/gt3.jpg',
      tags : "guitarra"
    },

    {
      codigo: 210109, nombre: 'Secuenciador de bajo Roland TB-3 ', precio: 334.900,
      descripcion: 'LA MAGIA DEL TB-303 CON NUEVOS SONIDOS Y CARACTERÍSTICAS MODERNAS', img: '../../assets/tarjetas/tc1.jpg',
      tags : "Teclado"
    },
    {
      codigo: 1096284, nombre: 'Mini atril para guitarra', precio: 29.990,
      descripcion: 'El GS402BB es un mini stand para guitarra eléctrica', img: '../../assets/tarjetas/atril1.jpg',
      tags : "atril"
    },
  ];

  productosActual = [   // Array para items en stock
    {
      codigo: 211763, nombre: 'Pedal de efecto Boss DD-8 ', precio: 179900,
      descripcion: 'Delay digital boss DD-8', img: '../../assets/tarjetas/boss1.jpg',
      tags : "pedal"
    },
    {
      codigo: 207467, nombre: 'Roland AC60 ', precio: 519.900,
      descripcion: 'Este amplificador estéreo acústico (30w x 2) ofrece un chorus estéreo / multibanda', img: '../../assets/tarjetas/amp1.jpg',
      tags : "nvidia, msi, gtx"
    },
    {
      codigo: 1105866, nombre: 'Guitarra eléctrica Ltd EC401', precio: 390.000,
      descripcion: 'GTR negra capsulas activas', img: '../../assets/tarjetas/gt1.jpg',
      tags : "guitarra"
    },
    {
      codigo: 1108058, nombre: 'Ernie Ball', precio: 12000,
      descripcion: 'Cuerdas', img: '../../assets/tarjetas/cuerdas1.jpg',
      tags : "guitarra, cuerdas"
    },
    {
      codigo: 1097512, nombre: 'Guitarra electroacústica Takamine', precio: 130.000,
      descripcion: 'Guitarra electro acustica', img: '../../assets/tarjetas/gt2.jpg',
      tags : "guitarra"
    },
    {
      codigo: 211479, nombre: 'Guitarra electroacústica ', precio: 85.990,
      descripcion: 'GTR acustica', img: '../../assets/tarjetas/gt3.jpg',
      tags : "guitarra"
    },

    {
      codigo: 210109, nombre: 'Secuenciador de bajo Roland TB-3 ', precio: 334.900,
      descripcion: 'LA MAGIA DEL TB-303 CON NUEVOS SONIDOS Y CARACTERÍSTICAS MODERNAS', img: '../../assets/tarjetas/tc1.jpg',
      tags : "Teclado"
    },
    {
      codigo: 1096284, nombre: 'Mini atril para guitarra', precio: 29.990,
      descripcion: 'El GS402BB es un mini stand para guitarra eléctrica', img: '../../assets/tarjetas/atril1.jpg',
      tags : "atril"
    },
  ];
  productosCarritoActual: any;

  
  constructor(public serviceData: TotalService){
   
  }
  ngOnInit(){
  }

  productoSeleccionado:any[] = []

  productoModal(i: any){
      this.productoSeleccionado = []
      this.productoSeleccionado.push(this.productosActual[i])
  }

  agregarProducto(i: any){
    if(this.productosCarrito.includes(this.productosActual[i])){
      console.log("Ya tiene el producto")
      for(let j = 0;j<this.productosCantidad.length;j++){
        if(this.productosActual[i].codigo == this.productosCantidad[j].codigo){
          this.productosCantidad[j].cant+=1;
        }
      }
      this.totalDinero+=this.productosActual[i].precio;
      localStorage.setItem("total",JSON.stringify(this.totalDinero));
    }
    else{
      console.log("No tiene el producto");
      this.productosCarrito.push(this.productosActual[i]);
      this.productosCantidad.push({codigo: this.productosActual[i].codigo, cant: 1});
      this.totalDinero+=this.productosActual[i].precio;
      localStorage.setItem("total",JSON.stringify(this.totalDinero))
    }
    localStorage.setItem("carrito",JSON.stringify(this.productosCarrito));
    localStorage.setItem("cantidad",JSON.stringify(this.productosCantidad));
  }

  eliminarProducto(cod: any){
    for(let i = 0;i<this.productosCarrito.length;i++){
      if(this.productosCarrito[i].codigo == cod){
        this.totalDinero-=(this.productosCarrito[i].precio*this.productosCantidad[i+1].cant);
        localStorage.setItem("total",JSON.stringify(this.totalDinero))
        this.productosCarrito.splice(i,1);
        this.productosCantidad.splice(i+1,1);
      }
    }
    localStorage.setItem("carrito",JSON.stringify(this.productosCarrito));
    localStorage.setItem("cantidad",JSON.stringify(this.productosCantidad));
  }

  actualizarProducto(cod: any){
    for(let i = 0;i<this.productosCarrito.length;i++){
      if(this.productosCarrito[i].codigo == cod){
        this.totalDinero-=(this.productosCarrito[i].precio*this.productosCantidad[i+1].cant);
        this.productosCantidad[i+1].cant = this.cantidad.value;
        this.totalDinero+=(this.productosCarrito[i].precio*this.productosCantidad[i+1].cant);
        localStorage.setItem("total",JSON.stringify(this.totalDinero))
      }
    }
    localStorage.setItem("cantidad",JSON.stringify(this.productosCantidad));
  }

  busquedaClave(){
    let pos = [];
    for(let i=0;i<this.productosActual.length;i++){
      if(this.productosActual[i].tags.search(this.clave.value) == -1){
        pos.push(this.productosActual[i].codigo);
      }
      else{
        console.log('Encontrado');
      }
    }
    for(let j=0;j<pos.length;j++){
      for(let i=0;i<this.productosActual.length;i++){
        if(pos[j]==this.productosActual[i].codigo){
          this.productosActual.splice(i,1);
        }
      }
    }
    
  }

  quitarBusqueda(){
    this.productosActual = [];
    for(let i=0; i<this.productosActual1.length;i++){
      this.productosActual.push({codigo: this.productosActual1[i].codigo, nombre: this.productosActual1[i].nombre, precio: this.productosActual1[i].precio, 
        descripcion: this.productosActual1[i].descripcion, img: this.productosActual1[i].img, tags: this.productosActual1[i].tags});
    }
    this.productosActual = this.productosActual1;
  }

}
