<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">Reserva BP - Fullstack App (Node + React)</h3>

  <p align="center">
    O app Reserva BP é uma aplicação fullstack de cadastro de usuários e agendamento de reuniões.
    <br />
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o projeto</a>
      <ul>
        <li><a href="#tecnologias-utilizadas">Tecnologias utilizadas</a></li>
      </ul>
    </li>
    <li>
      <a href="#iniciando-o-projeto">Iniciando o projeto</a>
      <ul>
        <li><a href="#instalação">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#como-usar">Como usar</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## Sobre o projeto

A aplicação Reserva BP é um projeto fullstack construído com o framework NestJS (backend) e React (frontend). Nela a pessoa usuária é capaz de realizar seu cadastro e gerenciar suas reuniões com corretores de seguro.
Apenas pessoas usuárias com o papel de "Cliente" podem agendar reuniões e estas terão duração entre 30 minutos a 2 horas. O cliente não não poderá agendar reuniões caso o corretor escolhido esteja previamente ocupado no horário selecionado.
O cliente escolherá a data, horário de início, horário de término e corretor ao marcar uma nova reunião.
A aplicação possui design simples e intuitivo, pensada tanto para ambiente desktop e telas grandes, quanto para mobile e outras telas pequenas.
<br />
O app possui quatro rotas:

* Registro: página composta por um formulário no qual o usuário preencherá com seus dados (Nome, sobrenome, email, senha e tipo de conta - cliente/corretor);
* Login: página para realizar o login com email e senha;
* Dashboard: página principal da aplicação, em que possui uma tabela com a relação de reuniões agendadas, com opção para excluir reuniões; um botão para marcar novas reuniões um cabeçalho com o nome da aplicação e opção de logout.
* Criar nova reunião: página na qual o cliente poderá selecionar data, horário de início, horário de término e corretor da nova reunião.

<details>
<summary>Clique para visualizar a tela de cadastro de usuários</summary>

[![Cadastro][cadastro]](cadastro)

</details>

<details>
<summary>Clique para visualizar a tela de login</summary>

[![Login][login]](login)

</details>

<details>
<summary>Clique para visualizar a dashboard</summary>

[![Dashboard][dashboard]](dashboard)

</details>

<details>
<summary>Clique para visualizar a tela de agendamento de reunião</summary>

[![New meeting][new-meeting]](new-meeting)

</details>

<details>
<summary>Calendário para agendar reunião</summary>

[![New meeting2][new-meeting-2]](new-meeting-2)

</details>
<br />

<!-- TECHNOLOGIES USED -->
## Tecnologias utilizadas

* Nest.js
* Postgres
* TypeORM
* Swagger
* bycript
* Jest
* React
* Context API
* Material UI
* Axios



<!-- GETTING STARTED -->
## Iniciando o projeto

Tanto front quando backend estão dockerizados e serão iniciados simultaneamente. Caso deseje, também é possível iniciar ambas as aplicações separadamente.

### Instalação

#### Docker-compose

1. Clone o repositório
   ```sh
   git clone git@github.com:amandapccs/reserva-bp.git
   ```
2. Acesse o diretório e insira o comando a seguir para subir a aplicação (front e back):
   ```sh
   docker compose up
   ```
3. Abra uma aba do seu navegador e digite `http://localhost:3001/`, caso a aplicação não tenha o feito automaticamente.

### Documentação da API
Caso deseje, acesse `http://localhost:3000/api` para ter acesso a documentação da API feita usando Swagger.

<details>
<summary>Clique para visualizar um screenshot da documentação</summary>

[![Swagger][swagger]](swagger)

</details>

### Testes
Foram realizados testes unitários nos serviços da API utilizando Jest, com alta porcentagem de cobertura em todos os serviços:
<br />
[![Tests][tests]](tests)

<!-- USAGE EXAMPLES -->
## Como usar

Fluxo de uso:
- A aplicação iniciará na página de login, caso não esteja cadastrado, clique no link "Não possui uma conta? Cadastre-se"
- Realize seu cadastro com (Nome, sobrenome, email, senha e tipo de conta - cliente/corretor);
- Após o preenchimento dos campos, a aplicação será redirecionada para a página de login, preencha com os dados fornecidos anteriormente.
- O cliente será direcionado para a página de dashboard, a qual possui uma tabela com as reuniões agendadas, seus dados e opção para excluí-la.
- Crie uma reunião clicando no botão "Nova reunião", que irá direcioná-lo a página de agendamento;
- Na página de agendamento, selecione data, horário de início e término, e um corretor. Clique no botão criar, que irá direcioná-lo para a dashboard.

Regras de negócio:
- Reuniões só poderão ser marcadas por usuários cujo conta seja do tipo "cliente";
- Reuniões não podem ser marcadas caso o corretor já esteja ocupado nos horários selecionados;
- A duração mínima de uma reunião é de 30 minutos, com duração máxima de 2 horas.


<!-- CONTACT -->
## Contato

Amanda Soares - amandchen@hotmail.com - <a href="https://www.linkedin.com/in/amandapccs/">LinkedIn</a>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[cadastro]: https://i.imgur.com/Ba6QsmV.png
[login]: https://i.imgur.com/rvN57CS.png
[dashboard]: https://i.imgur.com/Dgw2ua4.png
[new-meeting]: https://i.imgur.com/hqUpuwy.png
[new-meeting-2]: https://i.imgur.com/e9e43iO.png
[swagger]: https://i.imgur.com/qvcR8H8.png
[tests]: https://i.imgur.com/zQVpsA2.png
