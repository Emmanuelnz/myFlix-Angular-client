import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Api url that will provide the data for the client app
const apiUrl = 'https://myflixfr.herokuapp.com/';

// Get token from local storage 
const token = localStorage.getItem('token');

// Get user from local storage 
const user = localStorage.getItem('user');

@Injectable({
  providedIn: 'root',
})

export class FetchApiDataService {
  // Inject HttpClient module to constructor params also provides HttpClient to the entire class via "this.http".
  constructor(private http: HttpClient) {}

  // Api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Api call for the user login endpoint
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

  // GET - Api call to specific movie
  getOneMovie(title: string): Observable<any> {

    return this.http.get(`${apiUrl}movies/${title}`, {
        headers: new HttpHeaders({ 
          Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), 
        catchError(this.handleError));
  }

  // GET - Api call to directors details endpoint
  getDirector(director: string): Observable<any> {

    return this.http.get(`${apiUrl}movies/director/${director}`, {
        headers: new HttpHeaders({ 
          Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), 
        catchError(this.handleError));
  }

  // GET - Api call to genre details endpoint
  getGenre(genre: string): Observable<any> {

    return this.http.get(`${apiUrl}movies/Genre/${genre}`, {
        headers: new HttpHeaders({ 
          Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), 
        catchError(this.handleError));
  }
  
  // GET - Api call to users profile endpoint
  getUser(): Observable<any> {

    return this.http.get(`${apiUrl}users/${user}`, {
        headers: new HttpHeaders({ 
          Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), 
        catchError(this.handleError));
  }

  // GET - Api call to get users favorites movies
  getFavoriteMovies(): Observable<any> {

    return this.http.get(`${apiUrl}users/${user}/movies`, {
        headers: new HttpHeaders({ 
          Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), 
        catchError(this.handleError));
  }

  // POST - Api call to add movie to users favorites list 
  addFavoriteMovie(movieID: string): Observable<any> {

    return this.http.post(`${apiUrl}users/${user}/movies/${movieID}`, movieID, {
          headers: new HttpHeaders({ 
            Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), 
        catchError(this.handleError));
  }

  // PUT - Api call to edit users info
  editUser(updateDetails: any): Observable<any> {

    return this.http.put(`${apiUrl}users/${user}`, updateDetails, {
        headers: new HttpHeaders({ 
          Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), 
        catchError(this.handleError));
  }

  // DELETE - Api call to delete a users account
  deleteUser(): Observable<any> {

    return this.http.delete(`${apiUrl}users/${user}`, {
        headers: new HttpHeaders({ 
          Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), 
        catchError(this.handleError));
  }
  
  // DELETE - Api call to remove a favorite movie 
  removeFavoriteMovie(movieID: string): Observable<any> {

    return this.http.delete(`${apiUrl}users/${user}/movies/${movieID}`, {
        headers: new HttpHeaders({ 
          Authorization: `Bearer ${token}` }),
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
      console.log('Some error occured:', error.error.message);
    } else {
      console.log(
        `Error Status code ${error.status}, ` + 
        `Error Body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something unexpected happened; please try again later.')
    );
  }

}
