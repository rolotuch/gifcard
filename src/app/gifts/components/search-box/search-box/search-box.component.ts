import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { GiftsService } from '../../../services/gifts.service';

@Component({
  selector: 'gifts-search-box',
  template: `
    <h5>Search Box Component</h5>
    <Input
      class="form-control"
      type="text"
      placeholder="Search gifts..."
      (keyup.enter)="searchTag()"
      #txttagInput
    />
  `,
  styleUrl: './search-box.component.css',
})
export class SearchBoxComponent {
  @ViewChild('txttagInput')
  public txttagInput!: ElementRef<HTMLInputElement>;

  ///una vez creado el servicio en services lo inyectamos en el constructor
  constructor(private giftsService: GiftsService) {}

  // searchTag(txtTag: HTMLElement) {
  //   const inputElement = txtTag as HTMLInputElement;
  //   const value = inputElement.value;
  //   console.log(value);
  //    Tu lógica de búsqueda aquí
  //  }

  searchTag() {
    const newTag = this.txttagInput.nativeElement.value;
    console.log(newTag);
    //trabajos el servicio aca
    this.giftsService.searchTag(newTag)
    this.txttagInput.nativeElement.value = '';
  }


  //hay otra forma utilizano @viewchild
}
