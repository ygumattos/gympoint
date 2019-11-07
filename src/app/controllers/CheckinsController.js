import { addDays, startOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Student from '../models/Student';
import Checkin from '../models/Checkin';

class CheckinsController {
  async index(req, res){
    const { id } = req.params;

    const student = await Student.findByPk(id);
    if(!student) return res.status(404).json({error: "This student does not exist"});

    const checkins = await Checkin.findAll({
      where: {
        student_id: id
      },
      attributes: [ 'id', 'createdAt' ],
      include: [{
        model: Student,
        as: 'student',
        attributes: ['name']
      }]
    })

    return res.json(checkins);


  }

  async store(req, res){
    const { id } = req.params;

    const student = await Student.findByPk(id);
    if(!student) return res.status(404).json({error: "This student does not exist"});

    const validationDate = startOfDay(addDays(new Date(), 7));

    const checkins = await Checkin.findAndCountAll({
      where: {
        student_id : id,
        createdAt: {
          [Op.between]: [startOfDay(new Date()), validationDate]
        }
      }
    });

    if(checkins.count === 5)
    return res.status(401).json({error: "You have no access"});

    try {

      await Checkin.create( { student_id: id })

      return res.json(checkins)

    } catch (err) {
      return res.json({err})
    }
  }
}

export default new CheckinsController();
