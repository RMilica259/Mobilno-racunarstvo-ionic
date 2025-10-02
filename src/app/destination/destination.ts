import { Injectable } from '@angular/core';
import { DestinationModel } from './destination.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth';


export interface DestinationData {
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private _destination = new BehaviorSubject<DestinationModel[]>([]);
  /*
  destination: DestinationModel[] = [
    {id: 'd1', name: 'Rome', country: 'Italy', description: 'It’s easy to see why Rome’s one of the most-visited places on the planet: There’s history everywhere (the Pantheon, the Colosseum, the list goes on), sculptural masterpieces in almost every piazza, and—of course—ridiculously good food. Every trip could feel like a whirlwind, but slow down and you’ll discover lots of surprises. Spend a Sunday morning in Trastevere and hunt for vintage finds at Porta Portese flea market. Or hit San Lorenzo—a student neighborhood with an edgy-but-charming vibe—for trendy shops, galleries, and street art. Dinner’s not ‘til late here, so grab an aperitivo in Prati—it’s walkable from the Vatican and packed with quirky sidestreet bars.Yes, the energy’s next-level, so if you need a break, head for the hills (literally) and check out Aventine Hill, a leafy-green suburb with peaceful gardens and some of the best views of the city. There’s always something to do', imageUrl: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg'}, 
    {id: 'd2', name: 'Paris', country: 'France', description: 'Paris has a reputation for being the ultimate romantic getaway. But what visitors really swoon over is the city itself. Those grand stone and wrought-iron buildings, the sidewalks brimming with cozy cafés, and the Seine’s curving riverbanks are downright cinematic. But the city’s charms go beyond looks. The culinary scene creates an endless list of must-eat French dishes—rich and hearty coq au vin, golden buttery croissants. It’s also worth trying modern fusion and inventive international food here. (Trust us, the city’s falafel is outstanding.) And the spirit of Paris invites ducking down side streets, lingering in museums, and exploring mazes of shops. At the end of the day, head to the Champ-de-Mars to get uninterrupted views of the Eiffel Tower as it glitters into the night.', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34'},
    {id: 'd3', name: 'Barcelona', country: 'Spain', description: 'Barcelona bursts with color, creativity, and energy. From Gaudí’s whimsical Sagrada Família and Park Güell to the lively streets of La Rambla, every corner is full of art and life. Beaches invite relaxation, while the Gothic Quarter winds through narrow medieval lanes, revealing hidden squares, cafes, and artisan shops. Tapas bars, seafood markets, and vibrant nightlife keep the city buzzing well into the night. With a mix of culture, history, and Mediterranean charm, Barcelona is a city that captivates every visitor.', imageUrl: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg'},
    {id: 'd4', name: 'Oslo', country: 'Norway', description: 'Oslo combines sleek modern architecture with stunning natural surroundings. The Norwegian capital sits between fjords and forests, so in a single day you can visit the Viking Ship Museum, climb the futuristic Opera House roof, and then escape into the Nordmarka woods. Trendy neighborhoods are full of cafés, galleries, and seafood markets. In winter you can ski almost straight from the city center, while in summer ferries take you to islands perfect for swimming. Oslo feels calm and quiet, but always offers surprises around every corner.', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Operahuset.jpg'},  
    {id: 'd5', name: 'Prague', country: 'Czechia', description: 'Prague feels like a fairytale with its spires, bridges, and cobblestone lanes. Walking across Charles Bridge at dawn, with the mist floating over the Vltava, is unforgettable. The city brims with castles, churches, and hidden art, while beer halls are legendary—here, beer is a cultural treasure. Each district has a different spirit: Malá Strana is romantic, Žižkov rebellious and bohemian, and the Old Town is history itself. Prague is a city where you might get lost, but in doing so, you often find yourself.', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Prague_charles_bridge.jpg'},  
    {id: 'd6', name: 'Milan', country: 'Italy', description: 'Milan is Italy’s fashion and design capital, but it’s also a city of energy and contrasts. Beneath the shadow of the Duomo, you’ll find buzzing streets, elegant cafés, and treasures like the Galleria Vittorio Emanuele II and Pinacoteca di Brera. The Milanese embrace aperitivo—the early evening ritual when bars come alive with small bites and cocktails. And just beyond the city, northern Italy’s stunning lakes await, making Milan both cosmopolitan and the perfect gateway to natural beauty.', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Milan_duomo.JPG'},  
    {id: 'd7', name: 'Istanbul', country: 'Turkey', description: 'Istanbul bridges two continents, and you feel it in every step. The call to prayer echoes over bustling bazaars, while ferries cross the Bosphorus between Europe and Asia. Visit Hagia Sophia, the Blue Mosque, and Topkapi Palace to glimpse centuries of history, then lose yourself in the colors and scents of the Grand Bazaar. Street food—from simit to fresh fish sandwiches—keeps the city moving. Istanbul is chaotic, magical, and endlessly fascinating, a city that never lets you forget its unique position in the world.', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Istanbul.Hagia_Sophia009.jpg'},  
    {id: 'd8', name: 'Amsterdam', country: 'Netherlands', description: 'Amsterdam is as charming as it is lively. The canals lined with narrow houses feel straight out of a painting, while bicycles set the pace of daily life. Art lovers can explore masterpieces at the Van Gogh Museum or Rijksmuseum, and those seeking atmosphere will find it in cozy brown cafés or vibrant markets. Each neighborhood tells a different story—Jordaan is full of boutique shops, while De Pijp buzzes with energy and international flavors. Amsterdam is a city that mixes history, art, and a free-spirited soul.', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Amsterdam_-_canal_houses_%283415391411%29.jpg'},  
    {id: 'd9', name: 'Vienna', country: 'Austria', description: 'Vienna blends imperial grandeur with artistic flair. The elegant Ringstrasse is lined with palaces, opera houses, and museums that showcase the city’s rich cultural past. Music is everywhere, from classical concerts honoring Mozart and Strauss to lively coffeehouse debates that inspired great thinkers. Viennese cafés serve more than coffee—they are institutions of conversation and reflection. Beyond the historic center, vineyards and green hills offer a slower rhythm. Vienna is sophisticated yet welcoming, with a timeless charm.', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Wien_Stephansdom.jpg'},  
    {id: 'd10', name: 'Budapest', country: 'Hungary', description: 'Budapest is a city of duality, split by the Danube into historic Buda and vibrant Pest. The Parliament building and Chain Bridge dazzle by day, but the city truly shines at night when monuments are lit against the river. Thermal baths like Széchenyi and Gellért offer relaxation in grand surroundings, while ruin pubs hidden in old courtyards bring a bohemian nightlife scene. From hilltop views at the Fisherman’s Bastion to lively markets, Budapest mixes old-world charm with youthful energy.', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Budapest_Parliament.JPG'}

  ];
*/
  constructor(private http: HttpClient, private authService: AuthService){ }

  get destination() {
    return this._destination.asObservable();
  }

  addDestination(name:string,country:string, description: string){
    let generatedId: string;
    let newDestination: DestinationModel;
    let fetchedUserId: string;

    return this.authService.userId.pipe(take(1), switchMap(userId => {
      if (!userId) {
        throw new Error('No user id found!');
      }
      fetchedUserId = userId;
      return this.authService.token;
    }),  
    take(1),
    switchMap((token) => {
      newDestination = new DestinationModel(
        '',
        name,
        country,
        description,
        'https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg',
        fetchedUserId
      );
      return this.http.post<{name: string}>(`https://ionic-app-mm-default-rtdb.europe-west1.firebasedatabase.app/destination.json?auth=${token}`, newDestination);
    }),
    take(1),
    switchMap((resData) => {
        generatedId = resData.name;
        return this.destination;
      }),
      take(1),
      tap((destinations: DestinationModel[]) => {
        newDestination.id = generatedId;
        this._destination.next(destinations.concat(newDestination));
      })
    );
  }

  getDestinations(){

    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{[key: string]: DestinationData}>(`https://ionic-app-mm-default-rtdb.europe-west1.firebasedatabase.app/destination.json?auth=${token}`);
      }),
      map((destinationData) => {
      const destinations: DestinationModel[] = [];

        for(const key in destinationData){
          if(destinationData.hasOwnProperty(key)){
            destinations.push(new DestinationModel(key, destinationData[key].name, destinationData[key].country, destinationData[key].description, destinationData[key].imageUrl, destinationData[key].userId)
              );
          }
        }
        return destinations;
      }),
      tap(destinations => {
        this._destination.next(destinations);
      })
    )
  }

  updateDestination(
  id: string,
  name: string,
  country: string,
  description: string,
  imageUrl: string,
  userId: string
) {
  return this.authService.token.pipe(
    take(1),
    switchMap(token => {
      if (!token) throw new Error('No token found');
      return this.http.put(
        `https://ionic-app-mm-default-rtdb.europe-west1.firebasedatabase.app/destination/${id}.json?auth=${token}`,
        { name, country, description, imageUrl, userId }  // ✅ šalješ sve
      );
    }),
    tap(() => {
      this._destination.pipe(take(1)).subscribe(destinations => {
        const updatedDestIndex = destinations.findIndex(d => d.id === id);
        const updatedDest = {
          ...destinations[updatedDestIndex],
          name,
          country,
          description,
          imageUrl,
          userId
        };
        const updatedDestinations = [...destinations];
        updatedDestinations[updatedDestIndex] = updatedDest;
        this._destination.next(updatedDestinations);
      });
    })
  );
}



  deleteDestination(id: string) {
  return this.authService.token.pipe(
    take(1),
    switchMap(token => {
      if (!token) throw new Error('No token found');
      return this.http.delete(
        `https://ionic-app-mm-default-rtdb.europe-west1.firebasedatabase.app/destination/${id}.json?auth=${token}`
      );
    }),
    tap(() => {
      this._destination.pipe(take(1)).subscribe(destinations => {
        this._destination.next(destinations.filter(d => d.id !== id));
      });
    })
  );
}


  getDestination(id: string) {
  return this.authService.token.pipe(
    take(1),
    switchMap(token => {
      if (!token) throw new Error('No token found');
      return this.http.get<DestinationData>(
        `https://ionic-app-mm-default-rtdb.europe-west1.firebasedatabase.app/destination/${id}.json?auth=${token}`
      );
    }),
    map(destData => {
      if (!destData) {
        throw new Error('Destination not found!');
      }
      return new DestinationModel(
        id,
        destData.name,
        destData.country,
        destData.description,
        destData.imageUrl,
        destData.userId
      );
    })
  );
}

}
