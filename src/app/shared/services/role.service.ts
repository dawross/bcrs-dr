/*
; ==============================
; Title: role.service.ts
; Author: Professor Krasso
; Date: 30 April 2021
; Modified By: Brooklyn Hairston
; Description: Role service
; ==============================
*/

//import statements
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../interfaces/role.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  /**
   *
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * findAllRoles
   * @returns All Roles
   */
  findAllRoles(): Observable<any> {
    return this.http.get('/api/roles');
  }
  /**
   * findRoleById API
   * @param roleId
   * @returns matching role
   */
  findRoleById(roleId: string): Observable<any> {
      return this.http.get('/api/roles/' + roleId);
  }

  /**
   * updateRoles
   * @param roleId
   * @param role
   * @returns An updated Role
   */
  updateRole(roleId: string, role: Role): Observable<any> {
    return this.http.put('/api/roles/' + roleId, {
      text: role.text
    })
  }

 /**
  *
  * @param role
  * @returns new role
  */
  createRole(role: Role): Observable<any> {
    return this.http.post('/api/roles', {
      text: role.text
    })
  }

/**
 * deleteRole API
 * @param roleId
 * deletes a role from role collections
 */

  deleteRole(roleId: string): Observable<any> {
      return this.http.delete('/api/roles/' + roleId);
  }

/**
 * FindUserRole API
 * @param userName
 * @returns users role
 */

  findUserRole(userName: string): Observable<any> {
      return this.http.get('/api/users/' + userName + '/role');
  }

}
