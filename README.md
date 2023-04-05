# Contatos API

O propósito desse projeto é ter um backend sólido e bem documentado para servir de base para exercícios de desenvolvimento de frontend.

Trata-se de um backend que disponibiliza endpoints úteis para o desenvolvimento de um sistema de gestão de contatos. Foi desenvolvida aplicando conceitos da Clean Architecture em TypeScript.

Os endpoints permitem que os usuários possam se cadastrar e adicionar contatos com emails e números de telefone.

## Links

API disponível em [https://contatos-api.fly.dev/api/v1/](https://contatos-api.fly.dev/api/v1/)

A documentação da API: [https://sergiomoura.github.io/contatos-api/](https://sergiomoura.github.io/contatos-api/)

Demo HTML Template: [https://sergiomoura.github.io/contatos-html-template/](https://sergiomoura.github.io/contatos-html-template/)

Repositório HTML template: [https://github.com/sergiomoura/contatos-html-template](https://github.com/sergiomoura/contatos-html-template)


 ## Endpoints

**Url Base:** https://contatos-api.fly.dev/api/v1/

| Método HTTP | Endpoint | Descrição |
| --- | --- | --- |
| POST | /auth/register | Utilizado para cadastro de usuário |
| POST | /auth/login | Utilizado para autenticação do usuário |
| GET | /contacts | Retorna todos os contatos do usuário |
| POST | /contacts | Cria novo contato para usuário |
| DELETE | /contacts/{contactId} | Remove um contato cadastrado |
| POST | /contacts/{contactId}/emails | Cria novo e-mail para contato |
| DELETE | /contacts/{contactId}/emails/{emailId} | Remove e-mail de contato |
| POST | /contacts/{contactId}/phones | Cria novo telefone para contato |
| DELETE | /contacts/{contactId}/emails/{phoneId} | Remove telefone de contato |


<!-- ## Roadmap

A seguir estão os próximos passos para o desenvolvimento da API: -->

<!-- - Adição de autenticação de usuários
- Implementação de filtros de busca para os contatos
- Integração com outras APIs de serviços de mensagens -->

<!-- ## Rodando localmente -->

<!-- Para rodar a API localmente, siga as instruções abaixo:

1. Clone este repositório: `git clone https://github.com/sergiomoura/contatos-api.git`
2. Instale as dependências: `npm install`
3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:
    - `PORT`: Porta em que o servidor irá rodar (por padrão, utiliza a porta 3000)
    - `MONGO_URI`: URL de conexão com o banco de dados MongoDB
    - `JWT_SECRET`: Chave secreta para geração de tokens JWT de autenticação
4. Inicie o servidor: `npm start` -->

## Contribuindo

Para contribuir com o projeto, siga as instruções abaixo:

1. Faça um fork deste repositório
2. Crie uma branch com a feature ou correção que deseja implementar: `git checkout -b minha-feature`
3. Faça as alterações necessárias e adicione testes
4. Faça o commit das suas alterações: `git commit -m 'Implementando minha feature'`
5. Faça o push para a sua branch: `git push origin minha-feature`
6. Crie um Pull Request para o repositório original. -->
