import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, deleteDoc } from '@angular/fire/firestore';
import { addDoc, doc, updateDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  constructor(private firestore:Firestore) { }

  findAll(): Observable<Producto[]>{
    const placeRef = collection(this.firestore,'producto');
    return collectionData(placeRef,{idField:'id'}) as Observable<Producto[]>;
  }
  save(producto: Producto) {
    const placeRef = collection(this.firestore,'producto');
    return addDoc(placeRef,{
      nombre: producto.nombre,
      precioVenta: producto.precioVenta,
      categoria: producto.categoria,
      precioCompra: producto.precioCompra,
      unidadesPorPaquete: producto.unidadesPorPaquete
    });
  }
  delete(id: string){
    const placeDocRef = doc(this.firestore,`producto/${id}`);
    return deleteDoc(placeDocRef);
  }

  update(producto: Producto){
    const placeDocRef = doc(this.firestore,`producto/${producto.id}`)
    return updateDoc(placeDocRef,{
      nombre: producto.nombre,
      precioVenta: producto.precioVenta,
      categoria: producto.categoria,
      precioCompra: producto.precioCompra,
      unidadesPorPaquete: producto.unidadesPorPaquete
    });
  }
}
