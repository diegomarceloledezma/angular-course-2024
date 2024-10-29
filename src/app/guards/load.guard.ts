// import { CanMatchFn } from '@angular/router';

import { Injectable } from "@angular/core";
import { CanMatch, Route, UrlSegment } from "@angular/router";

// export const loadGuard: CanMatchFn = (route, segments) => {
//   return true;
// };

@Injectable({ providedIn : 'root'})

export class LoadGuard implements CanMatch{
  canMatch(route: Route, segments: UrlSegment[]): boolean {
    console.log("ROUTE: ", route)
    console.log("SEGMENTS: ", segments)
    return true;
  }
}