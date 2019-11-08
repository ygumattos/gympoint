import * as Yup from 'yup';

import HelpOrder from '../schemas/HelpOrder';
import Student from '../models/Student';

// HelpStudents fica responsável por cadastrar as perguntas dos alunos

class HelpStudentsController {
  async index(req, res){
    const { id } = req.params;

    try {
      const helpOrders = await HelpOrder.find({ student_id: id });

      if(!helpOrders) {
        return res.json({msg: "Have no questions"})
      }

      return res.json(helpOrders);

    } catch (err) {
      return res.status(501).json("Internal server error");
    }

  }

  async store(req, res){

    const schema = Yup.object().shape({
      question: Yup.string().required('question is required'),
    })

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.json({error: err.message})
    }

    const { id } = req.params;

    const student = await Student.findByPk(id);
    if(!student)
    return res.status(404).json("This student does not exist");

    const { question } = req.body;

    const {_id, student_id} = await HelpOrder.create({
      student_id: id,
      question
    })

    return res.json({_id, student_id, question});

  }
}

export default new HelpStudentsController();
