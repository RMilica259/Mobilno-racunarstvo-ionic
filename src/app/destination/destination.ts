import { Injectable } from '@angular/core';
import { DestinationModel } from './destination.model';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  
  destination: DestinationModel[] = [
    {id: 'd1', name: 'Rome', country: 'Italy', description: 'It’s easy to see why Rome’s one of the most-visited places on the planet: There’s history everywhere (the Pantheon, the Colosseum, the list goes on), sculptural masterpieces in almost every piazza, and—of course—ridiculously good food. Every trip could feel like a whirlwind, but slow down and you’ll discover lots of surprises. Spend a Sunday morning in Trastevere and hunt for vintage finds at Porta Portese flea market. Or hit San Lorenzo—a student neighborhood with an edgy-but-charming vibe—for trendy shops, galleries, and street art. Dinner’s not ‘til late here, so grab an aperitivo in Prati—it’s walkable from the Vatican and packed with quirky sidestreet bars.Yes, the energy’s next-level, so if you need a break, head for the hills (literally) and check out Aventine Hill, a leafy-green suburb with peaceful gardens and some of the best views of the city. There’s always something to do', imageUrl: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg'}, 
    {id: 'd2', name: 'Paris', country: 'France', description: 'Paris has a reputation for being the ultimate romantic getaway. But what visitors really swoon over is the city itself. Those grand stone and wrought-iron buildings, the sidewalks brimming with cozy cafés, and the Seine’s curving riverbanks are downright cinematic. But the city’s charms go beyond looks. The culinary scene creates an endless list of must-eat French dishes—rich and hearty coq au vin, golden buttery croissants. It’s also worth trying modern fusion and inventive international food here. (Trust us, the city’s falafel is outstanding.) And the spirit of Paris invites ducking down side streets, lingering in museums, and exploring mazes of shops. At the end of the day, head to the Champ-de-Mars to get uninterrupted views of the Eiffel Tower as it glitters into the night.', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34'}
  ];

  getDestination(id: string) {
    return this.destination.find((d: DestinationModel) => d.id === id);
  }
}
