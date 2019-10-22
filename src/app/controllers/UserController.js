import User from '../models/User';

class UserController {
  async index(req, res){
    return res.json( await User.findAll());
  }

  async store(req, res){
    const userExist = User.findOne({where: { email: req.body.email}});

    if(userExist){
      return res.status(400).json({ error: `User's already exist !`});
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res){
    return res.json({ok : true});
  }
}

export default new UserController();
