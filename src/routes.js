import * as sessionController from './controllers/session-controller';
import * as userController from './controllers/user-controller';
import * as postController from './controllers/post-controller';
import * as commentController from './controllers/comment-controller';
import {
  signupSchema,
  userSchema,
  postSchema,
} from './helpers/schema-validators';

export default (app, auth) => {
  // SIGNUP DE UM USER
  app.post('/signup', signupSchema, sessionController.signUp);

  // SIGNIN DE UM USER
  app.get('/signin', sessionController.signIn);

  // app.route('/users').get(userController.index);

  app
    .route('/user')
    // MIDDLEWARE DE AUTENTICAÇÃO
    .all(auth.authenticate())
    // RETORNA DADOS DO USER LOGADO
    .get(userController.findOne)
    // DELETA O USER LOGADO
    .delete(userController.destroy)
    // MIDDLEWARE PARA VALIDAR FORMULÁRIO
    .all(userSchema)
    // EDITA O USER LOGADO
    .put(userController.update);

  app
    .route('/posts')
    // MIDDLEWARE DE AUTENTICAÇÃO
    .all(auth.authenticate())
    // USER LOGADO VÊ TODOS OS SEUS POSTS
    .get(postController.index)
    // MIDDLEWARE PARA VALIDAR FORMULÁRIO
    .all(postSchema)
    // USER LOGADO CRIA UM POST
    .post(postController.store);

  app
    .route('/post/:id')
    // MIDDLEWARE DE AUTENTICAÇÃO
    .all(auth.authenticate())
    // USER LOGADO VÊ UM POST ESPECÍFICO
    .get(postController.findOne)
    // USER LOGADO DELETA UM POST
    .delete(postController.destroy)
    // MIDDLEWARE PARA VALIDAR FORMULÁRIO
    .all(postSchema)
    // USER LOGADO EDITA UM POST
    .put(postController.update);

  app
    .route(':id/comments')
    // MIDDLEWARE DE AUTENTICAÇÃO
    .all(auth.authenticate())
    // USER LOGADO VÊ TODOS SEUS COMENTÁRIOS EM UM POST
    .get(commentController.index)
    // MIDDLEWARE PARA VALIDAR FORMULÁRIO
    .all(postSchema)
    // USER LOGADO CRIA UM COMENTÁRIO EM UM POST
    .post(commentController.store);

  app
    .route('/:post_id/comment/:comment_id')
    // MIDDLEWARE DE AUTENTICAÇÃO
    .all(auth.authenticate())
    // USER LOGADO VÊ UM COMENTÁRIO ESPECÍFICO EM UM POST
    .get(commentController.findOne)
    // USER LOGADO DELETA UM COMENTÁRIO ESPECÍFICO EM UM POST
    .delete(commentController.destroy)
    // MIDDLEWARE PARA VALIDAR FORMULÁRIO
    .all(postSchema)
    // USER LOGADO EDITA UM COMENTÁRIO ESPECÍFICO EM UM POST
    .put(commentController.update);
};
