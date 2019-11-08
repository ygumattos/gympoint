import * as Yup from 'yup';
import HelpOrder from '../schemas/HelpOrder';

import Queue from '../../lib/Queue';
import Student from '../models/Student';
import User from '../models/User';
import QuestionMail from '../jobs/QuestionMail';

/* AcademyOrders fica responsável por responder os alunos,
  acessivel apenas para a academia
*/

class AcademyOrdersController {
  async index(req, res){
    const orders = await HelpOrder.find({ answer: null }, '_id, question');

    return res.json(orders);
  }

  async update(req, res){

    const schema = Yup.object().shape({
      answer: Yup.string().required('answer is required'),
    })

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.json({error: err.message})
    }

    const { id } = req.params;
    const { answer } = req.body;

    const order = await HelpOrder.findByIdAndUpdate(
      id,
      { answer: {
        text: answer,
        date: new Date()
      }},
    );

    if(!order)
    return res.status(404).json({msg: "Order not found"});

    // Send email

    const student = await Student.findByPk(order.student_id,{
      attributes: ['id','name']
    });

    const admin = await User.findByPk(req.userID);

    await Queue.add(QuestionMail.key, { order, student, admin });

    const { _id, question } = order;

    return res.json({_id, question, answer, student});
  }
}

export default new AcademyOrdersController();
