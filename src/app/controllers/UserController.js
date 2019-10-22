import User from '../models/User';

class UserController {
  async index(req, res){
    return res.json( await User.findAll());
  }

  async store(req, res){
    const { id, name, email, password_hash } = await User.create(req.body);

    return res.json({ id, name, email, password_hash });
  }
}

export default new UserController();
