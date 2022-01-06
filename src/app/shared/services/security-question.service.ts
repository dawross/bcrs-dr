/*
; ==============================
; Title: security-question.service.ts
; Author: Professor Krasso
; Date: 18 April 2021
; Modified By: Brooklyn Hairston
; Description: Security Question service
; ==============================
*/

//import statements
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecurityQuestion } from '../interfaces/security-question.interface';

@Injectable({
  providedIn: 'root'
})
export class SecurityQuestionService {

  constructor(private http: HttpClient) { }

  /**
   *
   * @returns list of security questions
   */
  findAllSecurityQuestions(): Observable<any> {
    return this.http.get('/api/security-questions');
  }


  /**
   * findSecurityQuestionById
   * @param id
   * @returns matching security question
   */
  findSecurityQuestionById(questionId: string): Observable<any> {
      return this.http.get('/api/security-questions/' + questionId);
  }


  /**
   *
   * @param newSecurityQuestion
   * @returns a new security question
   */
  createSecurityQuestion(newSecurityQuestion: SecurityQuestion): Observable<any> {
    return this.http.post('/api/security-questions', {
      text: newSecurityQuestion.text
    })
  }

  /**
   * UpdateSecurityQuestion
   * @param questionId @param updatedSecurityQuestion
   * @returns updated security object
   */

  updateSecurityQuestion(questionId: string, updatedSecurityQuestion: SecurityQuestion): Observable<any> {
      return this.http.put('/api/security-questions/' + questionId, {
          text: updatedSecurityQuestion.text
      })
  }

  /**
   * @param questionId
   * @returns an observable of type any
   * @description A http delete request with the URL path as the parameter
   */
  deleteSecurityQuestion(questionId: string): Observable<any> {
    return this.http.delete('/api/security-questions/' + questionId);
  }
}
