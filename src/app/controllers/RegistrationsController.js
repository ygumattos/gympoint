import * as Yup from 'yup';
import { parseISO, startOfDay, addMonths } from 'date-fns';

import Registration from '../models/Registration'
import Student from '../models/Student';
import Plan from '../models/Plan';

import Queue from '../../lib/Queue';
import RegistrationMail from '../jobs/RegistrationMail';

class RegistrationsController{
  async index(req, res){
    const { page = 1 } = req.query;

    const registration = await Registration.findAll({
      order: ['start_date'],
      attributes: ['id', 'start_date', 'end_date', 'price'],
      limit: 20,
      offset: (page - 1) * 20,
      include:
      [{
        model: Student,
        as: 'student',
        attributes: ['name']
      },
      {
        model: Plan,
        as: 'plan',
        attributes: ['title']
      }]
    })

    return res.json(registration);
  }

  async store(req, res){
    const schema = Yup.object().shape({
      start_date: Yup.date().min(new Date()).required('start_date is required'),
      student_id: Yup.number().integer().positive().required("student_id's required"),
      plan_id: Yup.number().integer().positive().required("plan_id's required"),
    })

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.json({error: err.message})
    }

    const { plan_id, student_id, start_date } = req.body;

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

    const parsedDateStart = startOfDay(parseISO(start_date));
    const end_date = addMonths(parsedDateStart, plan.duration);

    try {
      const price = plan.totalPrice();

      const registration = await Registration.create({
        start_date: parsedDateStart,
        end_date,
        price,
        student_id,
        plan_id
      })

      student.registrated = true;
      await student.save();

      /*
        Send EMAIL
      */

      await Queue.add(RegistrationMail.key, { registration, student, plan })

      return res.json(registration)

    } catch (err) {
      return res.status(501).json({error: "Internal server error", err})
    }

  }

  async update(req, res){

    const schema = Yup.object().shape({
      start_date: Yup.date().min(new Date()),
      student_id: Yup.number().integer().positive(),
      plan_id: Yup.number().integer().positive(),
    })

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.json({error: err.message})
    }

    const { id } = req.params;
    const { plan_id, student_id, start_date } = req.body;

    /*
      Check if registration exist
    */

    const registration = await Registration.findOne({
      where: { id },
      attributes: ['id', 'start_date', 'end_date', 'price'],
      include:
      [{
        model: Student,
        as: 'student',
        attributes: ['id','name']
      },
      {
        model: Plan,
        as: 'plan',
        attributes: ['title', 'price', 'duration']
      }]
    });
    if(!registration) return res.status(404).json({error: "This registration not exist"});

    /*
      Check if plan exist
    */
    if(plan_id) {
      const plan = await Plan.findByPk(plan_id);
      if(!plan) return res.status(404).json({error: "This plan not exist"});
    }


   /*
     Check if student exist
   */
    if(student_id){
      const student = await Student.findByPk(student_id);
      if(!student) return res.status(404).json({error: "This student not exist"});

      /*
      Check if student already registrated
      */

      if(!student.registrated) {
        return res
        .status(401)
        .json({error: "This student's not registrated in a plan"});
      }
    }

    /*
      Parsed date
    */

      const parsedDateStart = start_date ? startOfDay(parseISO(start_date)) : null;
      const end_date = start_date ? addMonths(parsedDateStart, registration.plan.duration) : null;

    /*
      Price
    */

    const price = registration.plan.totalPrice();


    try {

      if(req.body){
          await registration.update({
          start_date: parsedDateStart,
          end_date,
          price,
          student_id,
          plan_id
        })

        return res.json({ id, parsedDateStart, end_date, price, student_id, plan_id})
      }

      return res.status(400).json({warning: "We don't have dados for registration"})

    } catch (err) {
      return res.status(501).json({error: "Internal server error", err})
    }
  }

  async delete(req, res){
    const { id } = req.params;

    const registration = await Registration.findByPk(id);
    if(!registration) return res.status(404).json({error: "This registration not exist"});

    try {
      await registration.destroy();

      return res.json({msg: "The registration has been successfully deleted. "})
    } catch (err) {
      return res.status(501).json({error: "Internal server error", err})
    }

  }
}


export default new RegistrationsController();
