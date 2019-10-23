import * as Yup from 'yup';

import Student from '../models/Student';

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

    const {name, email, age} = await Student.create(req.body);

    return res.json({
      user: {
        name,
        email,
        age
      }
    })
  }
}

export default new StudentsController();
