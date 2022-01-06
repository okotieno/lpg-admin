import { Injectable } from "@angular/core";
import { IResponse } from "@lpg/data";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  url = 'users';
  constructor(private http: HttpClient) {
  }

  createUser(data: { depotName: string }) {
    return this.http.post<IResponse<any[]>>(this.url, data)
  };

  updateUser({ id, ...data}: { depotName: string; id: number }) {
    return this.http.patch<IResponse<any[]>>(`${this.url}/${id}`, data)
  };

  getUsers({perPage, page}: { perPage: number, page: number }) {
    return this.http.get<IResponse<any[]>>(this.url, {params: {['page_size']: perPage, page}});
  }

  deleteUserWithId(id: number) {
    return this.http.delete<IResponse<any[]>>(`${this.url}/${id}`)
  }
}
