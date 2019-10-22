import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize){
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
      adminer: Sequelize.BOOLEAN
    }, {
      sequelize
    });

     this.addHook('beforeSave', async model => {
      if(model.password){
        model.password_hash = await bcrypt.hash(model.password, 8);
      };
    });

    return this;
  }

  comparePassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
