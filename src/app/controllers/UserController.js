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
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userID);

    if(!user) {
      return res.status(404).json({ msg: "User does not exist !" })
    }

    if( email !== user.email){
      const userExist = await User.findOne({ where: { email } })
      if(userExist) {
        return res.status(400).json({ error: `User's already exist !`});
      }
    }

    if(!oldPassword && !(await user.comparePassword(oldPassword))){
      return res.status(401).json({ error: 'Password does not match' });
    }

    try {
      const { id, name } =  await user.update(req.body);

      return res.json({
        user: {
          id,
          name,
          email
        }
      })
    } catch (error) {
      return res.status(500).json({ error: 'Internal Error' });
    }
  }
}

export default new UserController();
