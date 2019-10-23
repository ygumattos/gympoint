// import * as Yup from 'yup';

import Student from '../models/Student';

class StudentsController {
  async index(req, res){
    return res.json(await Student.findAll());
  }


  // async store(req, res){

  //   const schema = Yup.object().shape({
  //     name: Yup.string().required(),
  //     email: Yup.string().email().required(),
  //     age: Yup.integer().max(2).positive(),
  //     weight: Yup.max(6).positive(),
  //     height: Yup.max(6).positive(),
  //   });

  //   if(!(await schema.isValid(req.body))){
  //     return res.status(400).json({ error: `Validation fails`});
  //   }

  //   const studentExist = await Students.findOne({ where: { email: req.email }});

  //   if(studentExist){
  //     return res.status(400).json({ error: `Students already exist !`});
  //   }

  //   console.log(req.body);


  //   // const student = await Students.create(req.body);
  // }
}

export default new StudentsController();
