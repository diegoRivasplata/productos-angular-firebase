export class Producto{
    constructor(
        public nombre: string,
        public precioVenta: number,
        public categoria: string,
        public precioCompra?: number,
        public unidadesPorPaquete?: number,
        public id?: string,
        ){}
    
}
/*
public precioVentaSugerido: number,
public precioCompraUnitario: number,
public porcentajeGanancia: number,
*/