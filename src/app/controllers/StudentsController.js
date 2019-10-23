import * as Yup from 'yup';

import Student from '../models/Student';
import Admin from '../models/User';

class StudentsController {
  async index(req, res){
    return res.json(await Student.findAll());
  }


  async store(req, res){

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      age: Yup.number().required().positive().integer(),
      weight: Yup.number().required().positive(),
      height: Yup.number().required().positive(),
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: `Validation fails`});
    }

    const studentExist = await Student.findOne({ where: { email: req.body.email }});

    if(studentExist){
      return res.status(400).json({ error: `Students already exist !`});
    }

    const admin = await Admin.findByPk(req.userID);

    if(!admin){
      return res.status(400).json({ error: `You need an admin for your register!`});
    }



    const {name, email, age} = await Student.create(req.body);

    return res.json({
      user: {
        name,
        email,
        age
      },
      admin: {
        name: admin.name,
        email: admin.email
      }
    })
  }
}

export default new StudentsController();
