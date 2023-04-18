import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WasherService {

  constructor(private http:HttpClient) { }
  getAllWashers()
  {
    return this.http.get('http://localhost:4926/manage/users/washer')
  }
  deleteWasher(email:any)
  {
    return this.http.delete(`http://localhost:4926/manage/delete/${email}`)
  }
  getWashPacks()
  {
    return this.http.get("http://localhost:8084/washers/seeWP")
  }
  getWasherByUsername(username:any)
  {
    return this.http.get(`http://localhost:4926/manage/${username}`)
  }
  updateWasherByEmail(payload:any)
  {
    return this.http.put(`http://localhost:4926/manage/updateDetails/${payload.email}`,payload)
  }
  
}
