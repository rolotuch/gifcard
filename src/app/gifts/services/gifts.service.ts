import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifts';

@Injectable({
  providedIn: 'root',
})
export class GiftsService {
  public giftList: Gif[] = [];
  //para manejar api
  private apiKey: string = 'TTnP3rhI00OA2oHco8V6KcSQnIiya54z';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  private _tagsHistory: string[] = []; //usamos private para poder construir un getter, esto con el fin de asegurar que nadie puede alterar el arreglo, es decir

  //que nadie puede mutar mi arreglo o que el ciclo de cambios de angular no detecte ese cambio.
  //el getter me sirve para pasar solo lo que yo quiero

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  constructor(private http: HttpClient) {}
  //creamos un metodo para organizar los tags
  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this._tagsHistory = this._tagsHistory.map((tag) => tag.toLowerCase());
  }

  //reamos un nuevo metodo para
  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    // 'fetch('https://api.giphy.com/v1/gifs/search?api_key=TTnP3rhI00OA2oHco8V6KcSQnIiya54z&q=' + tag + '&limit=10')
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=TTnP3rhI00OA2oHco8V6KcSQnIiya54z&q=valorant&limit=10')
    // .then((res) => res.json())
    // .then((data) => {
    //   console.log(data);

    // this.http.get<any>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${tag}&limit=10`).subscribe((resp) => {
    //   console.log(resp.data);

    // });
    // esta es la mejor forma de realizarla.

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', '10');

    //this.http.get(`${this.serviceUrl}/search`, { params }).subscribe((resp) => {
      this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params }).subscribe(resp => {
      //console.log(resp.data);
      this.giftList = resp.data;
        //console.log({gifts: this.giftList});
    });
  }
}
