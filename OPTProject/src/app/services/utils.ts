import { HttpHeaders } from "@angular/common/http";

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};