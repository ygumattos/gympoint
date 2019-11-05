import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlansController {
  async index(req, res){
    const plans = await Plan.findAll();
    return res.json(plans);
  }


}

export default new PlansController();
