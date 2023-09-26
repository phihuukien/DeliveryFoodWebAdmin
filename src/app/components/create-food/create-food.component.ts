import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-food',
  templateUrl: './create-food.component.html',
  styleUrls: ['./create-food.component.css']
})
export class CreateFoodComponent implements  OnInit{

  ngOnInit(): void {
    const img: HTMLInputElement | null = document.querySelector<HTMLInputElement>('#image');
    const showimg: HTMLImageElement | null = document.querySelector<HTMLImageElement>('.imgNews img');
    
    if (img && showimg) {
      img.addEventListener('change', function () {
        const file = img.files?.[0];
        if (file) {
          showimg.src = URL.createObjectURL(file);
        }
      });
    }
  }
}
