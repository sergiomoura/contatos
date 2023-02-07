export const HttpErrors = {
  userAlreadyExists: {
    error: new Error('Usuário já cadstrado'),
    status: 409
  },
  invalidDataForUserCreation: {
    error: new Error('Dados inválidos para criação de usuário'),
    status: 400
  }
};
