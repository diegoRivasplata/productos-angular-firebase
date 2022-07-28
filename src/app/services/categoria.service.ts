import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, deleteDoc } from '@angular/fire/firestore';
import { addDoc, doc, updateDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private firestore: Firestore) { 
  }

  findAll(): Observable<Categoria[]>{
    const placeRef = collection(this.firestore,'categorias');
    return collectionData(placeRef,{idField: 'id'}) as Observable<Categoria[]>;
  }

  save(categoria: Categoria){
    const placeRef = collection(this.firestore,'categorias');
    return addDoc(placeRef,{nombre: categoria.nombre});
  }

  update(categoria: Categoria){
    const placeDocRef = doc(this.firestore,`categorias/${categoria.id}`);
    return updateDoc(placeDocRef,{
        nombre: categoria.nombre
      }
    );
  }

  delete(id: string) {
    const placeDocRef = doc(this.firestore,`categorias/${id}`);
    return deleteDoc(placeDocRef);
  }
}
