<h1 align="center">
  GymPoint
</h1>

<blockquote align="center">“Não espere para plantar, apenas tenha paciência para colher”!</blockquote>

## :rocket: Aplicação

App gerenciador de academia, o **Gympoint**.

### Um pouco sobre as ferramentas

- [Express](https://expressjs.com/)
- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (Utilize PostgreSQL ou MySQL);
- MongoDB
- Bcryptjs
- JWT
- Nodemailer
- Redis
- Yup
- Date-dns

### Funcionalidades do administrador

#### 1. Autenticação

Permitir que um usuário (adm) se autentique em sua aplicação utilizando e-mail e uma senha.

#### 2. Gestão de planos

Permitir que o usuário possa cadastrar planos para matrícula de alunos

#### 3. Gestão de matrículas

Apesar do aluno estar cadastrado na plataforma, isso não significa que o mesmo tem uma matrícula ativa e que pode acessar a academia.

Nessa funcionalidade criaremos um cadastro de matrículas por aluno.

### Funcionalidades do aluno

#### 1. Cadastro de alunos

Permitir que alunos sejam mantidos (cadastrados/atualizados) na aplicação utilizando nome, email, idade, peso e altura.

O cadastro de alunos só pode ser feito por administradores autenticados na aplicação.

O aluno não pode se autenticar no sistema, ou seja, não possui senha.

#### 2. Checkins

Quando o aluno chega na academia o mesmo realiza um check-in apenas informando seu ID de cadastro (ID do banco de dados);

Esse check-in serve para monitorar quantas vezes o usuário frequentou a academia na semana.

O usuário só pode fazer 5 checkins dentro de um período de 7 dias corridos.

#### 3. Pedidos de auxílio

 O aluno pode criar pedidos de auxílio para a academia em relação a algum exercício, alimentação ou instrução qualquer;

 Quando um pedido de auxílio for respondido, o aluno deve recebe um e-mail da plataforma com a pergunta e resposta da academia;

#7159c1

