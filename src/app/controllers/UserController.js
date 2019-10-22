import User from '../models/User';

class UserController {
  async index(req, res){
    return res.json( await User.findAll());
  }
}

export default new UserController();
