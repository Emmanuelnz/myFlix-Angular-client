import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Api url that will provide the data for the client app
const apiUrl = 'https://myflixfr.herokuapp.com/';

// Get token 
const token = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // Provides HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {

    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails)
    .pipe(catchError(this.handleError));
  }

  // Api call for user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails)
    .pipe(catchError(this.handleError));
  }

  // GET - Api call to show all movies endpoint 
  getAllMovies(): Observable<any> {
    
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData),
        catchError(this.handleError));
  }
    
  // GET - Api call to specific movie endpoint
  getSingleMovie(title: any): Observable<any> {

    return this.http.get(apiUrl + `movies/${title}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token }),
    })
    .pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  // GET - Api call to directors details endpoint 
  getDirectors(name: any): Observable<any> {
    
    return this.http.get(apiUrl + `movies/directors/${name}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token }),
    })
    .pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  // GET - Api call to genre details endpoint 
  getGenre(name: any): Observable<any> {

    return this.http.get(apiUrl + `movies/genre/${name}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token }),
    })
    .pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  // GET - Api call to users profile endpoint 
  getUser(): Observable<any> {

    const user = localStorage.getItem('user');

    return this.http.get(apiUrl + 'users/' + user, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token }),
    })
    .pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  // GET - Api call to get users favorite movies
  getFavoriteMovies(): Observable<any> {
    
    const user = localStorage.getItem('user');

    return this.http.get(apiUrl + `users/${user}`,  {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token }),
    })
    .pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  // POST - Api call to add movie to users favorites list
  addFavoriteMovie(movieId: any): Observable<any> {
    
    const user = localStorage.getItem('user');

    return this.http.post(apiUrl + `users/${user}/movies/${movieId}`, { FavoriteMovie: movieId}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token }),
    })
    .pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  // PUT - Api call to edit users info
  editUser(updateDetails: any): Observable<any> {
    
    const user = localStorage.getItem('user');

    return this.http.put(apiUrl + `users/${user}`, updateDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token }),
    })
    .pipe(map(this.extractResponseData),
    catchError(this.handleError));
  }

  // DELETE - Api call to delete a users account 
  deleteUser(): Observable<any> {

    const user = localStorage.getItem('user');

    return this.http.delete(apiUrl + `users/${user}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token }),
    })
    .pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  // DELETE - Api call to remove a favorite movie 
  removeFavoriteMovie(movieId: any): Observable<any> {
    
    const user = localStorage.getItem('user'); 

    return this.http.delete(apiUrl + `users/${user}/movies/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token }),
    })
    .pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
      if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
      } else {
      console.error(
          `Error Status code ${error.status}, ` +
          `Error body is: ${error.error}`);
      }
      return throwError(
      'Something unexpected happened; please try again later.');
    }
}
