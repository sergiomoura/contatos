import { type Response } from '../types/Response';
export const FailedResponses = {
  invalidDataForUserCreation: <Response> {
    status: 400,
    body: 'Dados inválidos para criação de usuário'
  },
  userAlreadyExists: <Response> {
    status: 409,
    body: 'Usuário já cadastrado'
  }

};
