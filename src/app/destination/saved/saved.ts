import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DestinationModel } from '../destination.model';

@Injectable({
  providedIn: 'root'
})
export class SavedService {
  private _saved = new BehaviorSubject<DestinationModel[]>([]);

  get saved$() {
    return this._saved.asObservable();
  }

  addDestination(dest: DestinationModel) {
    const current = this._saved.value;
    this._saved.next([...current, dest]);
  }

  removeDestination(id: string) {
  const current = this._saved.value;
  this._saved.next(current.filter(dest => dest.id !== id));
}

isSaved(id: string): boolean {
  return this._saved.value.some(dest => dest.id === id);
}

}
