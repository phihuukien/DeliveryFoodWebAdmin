import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from 'src/apiGlobal';
import { ReviewService } from 'src/app/services/review/review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  reviewId: string = '';
  allReviews: any;
  fromDate: string = '';
  toDate: string = '';
  sort_orderBy: string = '';
  sort_order: string = '';
  total_pages: number = 0;
  page: number = 1;
  imagesApiUrl = GlobalVariable.IMAGES_API_URL;
  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.getAllReviews(
      this.page,
      this.sort_orderBy,
      this.sort_order,
      this.fromDate,
      this.toDate
    );
  }

  getAllReviews(
    page: number,
    sort_orderBy: string,
    sort_order: string,
    fromDate: string,
    toDate: string
  ) {
    this.reviewService
      .getAllReviews(page, sort_orderBy, sort_order, fromDate, toDate)
      .subscribe({
        next: (response: any) => {
          console.log(`adu`, response);
          if (response.status) {
            this.allReviews = response.data;
            this.total_pages = response.total_Page;
            this.page = response.page;
            this.sort_orderBy = response.sort_orderBy;
            this.sort_order = response.sort_order;
            this.fromDate = fromDate;
            this.toDate = toDate;
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteReview(reviewId: string) {
    Swal.fire({
      title: 'Do you want to delete ?',
      text: 'You will not be able to recover this review !',
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#198754',
      cancelButtonColor: '#dc3545',
    }).then((result) => {
      if (result.value) {
        this.reviewService.deleteReview(reviewId).subscribe({
          next: (response: any) => {
            if (response.status) {
              Swal.fire('Deleted !', 'Your review has been deleted', 'success');
              this.getAllReviews(
                this.page,
                this.sort_orderBy,
                this.sort_order,
                this.fromDate,
                this.toDate
              );
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
      } else if (result.dismiss == Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled!',
          text: 'Your review is safe :)',
          icon: 'error',
          confirmButtonColor: '#198754',
        });
        this.getAllReviews(
          this.page,
          this.sort_orderBy,
          this.sort_order,
          this.fromDate,
          this.toDate
        );
      }
    });
  }
}
