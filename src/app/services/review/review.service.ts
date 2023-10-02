import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { GlobalVariable } from 'src/apiGlobal';
const api = GlobalVariable.BASE_API_URL + GlobalVariable.GET_REVIEW;
const api_delete = GlobalVariable.BASE_API_URL + GlobalVariable.DELETE_REVIEW;

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAllReviews(
    page: number,
    sort_orderBy: string,
    sort_order: string,
    fromDate: string,
    toDate: string
  ): Observable<Array<any>> {
    let customApi = api + this.cookieService.get('restaurantId') + '?';
    if (sort_orderBy != null && (sort_order == 'ASC' || sort_order == 'DESC')) {
      customApi +=
        'sort_orderBy=' + sort_orderBy + '&sort_order=' + sort_order + '&';
    }

    if (
      fromDate.length > 0 &&
      fromDate.length > 0 &&
      fromDate != null &&
      fromDate != null
    ) {
      customApi += 'from_date=' + fromDate + '&to_date=' + toDate + '&';
    }

    customApi += 'page=' + page;

    return this.http.get<Array<any>>(customApi);
  }

  deleteReview(reviewId: string): Observable<any> {
    return this.http.delete(api_delete + reviewId);
  }
}
