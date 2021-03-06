# Projeto My Daily Status

![logo](https://i.imgur.com/6IkDCaW.png)

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

## Descrição
Projeto desenvolvido durante o workshop DevPleno 2020.
O My Daily Status é um sistema web que permite, que durante uma epidemia, os usuários façam
um cadastro diário do seu status de saúde, se está bem, se apresenta sintomas ou se tem uma doença contagiosa confirmada, como a COVID-19, que se espalhou em 2020. Os status são compartilhados de forma anônima e o usuário consegue ver uma listagem dos status das pessoas em um raio de até 50km da sua posição

## Tecnologias Usadas
- NodeJS Versão 12.16.1 
- ReactJs Versão 16.12.0
- NextJS
- Autenticação via Auth0
- Banco de dados NoSQL via Firebase
- Windtail

## Instruções
### Instalação

- Cadastrar no Auth0 e Firebase e atualizar os arquivos .env e firebase-secret.json  com as permissões

- Para baixar dependencias:
```bash

$ npm install
```

### Execução do projeto
```bash

$ npm run dev

```


## Telas do projeto

### Tela inicial
![home](https://i.imgur.com/l5tfXTw.jpg)

### Listagem de status próximos
![listagem](https://i.imgur.com/hw7nu8J.jpg)

### Cadastro de novo status
![cadastro](https://i.imgur.com/ITncs4a.jpg)