import * as Yup from 'yup';
import { parseISO, startOfDay, addMonths } from 'date-fns';

import Registration from '../models/Registration'
import Student from '../models/Student';
import Plan from '../models/Plan';


class RegistrationsController{

  async store(req, res){
    const schema = Yup.object().shape({
      startDate: Yup.date().min(new Date()).required('start_date is required'),
      student_id: Yup.number().integer().positive().required("student_id's required"),
      plan_id: Yup.number().integer().positive().required("plan_id's required"),
    })

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.json({error: err.message})
    }

    const { plan_id, student_id, startDate } = req.body;

    /*
      Check if plan exist
    */

    const plan = await Plan.findByPk(plan_id);
    if(!plan) return res.status(404).json({error: "This plan not exist"});

    /*
      Check if student exist
    */

    const student = await Student.findByPk(student_id);
    if(!student) return res.status(404).json({error: "This student not exist"});

    /*
      Check if student already registrated
    */

    if(student.registrated) {
      return res.status(401).json({error: "This student's already registrated in a plan"});
    }

    /*
      Parsed dates
    */

    const parsedDateStart = startOfDay(parseISO(startDate));
    const dateEnd = addMonths(parsedDateStart, plan.duration);

    const price = plan.price * plan.duration;

    const {id, end_date, start_date} = await Registration.create({
      start_date: parsedDateStart,
      end_date: dateEnd,
      price,
      student_id,
      plan_id
    })

    student.registrated = true;
    await student.save();

    return res.json({id, start_date, end_date, price})
  }
}

export default new RegistrationsController();
