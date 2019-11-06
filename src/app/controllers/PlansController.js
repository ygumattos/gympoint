import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlansController {
  async index(req, res){
    const plans = await Plan.findAll({
      attributes: ['id','title', 'price', 'duration']
    });
    return res.json(plans);
  }

  async store(req, res){

    const schema = Yup.object().shape({
      title: Yup.string().required("Title's required"),
      duration: Yup.number().required("Duration's required").positive().integer(),
      price: Yup.number().required("Price's required").positive()
    })

    try {
      await schema.validate(req.body)
    } catch (err) {
      return res.json(err.message)
    }

    const titleExist = await Plan.findOne({where: { title: req.body.title }});
    if(titleExist)  {
      return res.status(301)
      .json({error: "Plan already exist, please change your title."})
    }

    const plan = await Plan.create(req.body);

    return res.json(plan);

  }

  async update(req, res){
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number().positive().integer(),
      price: Yup.number().positive()
    })

    try {
      await schema.validate(req.body)
    } catch (err) {
      return res.json({error: err.message})
    }

    const plan = await Plan.findByPk(req.params.id);
    if(!plan){
      return res.status(404).json({ msg: "Plan does not exist !" })
    }

    try {
      const { id, title, duration, price } =  await plan.update(req.body);

      return res.json({
          id,
          title,
          duration,
          price
      })
    } catch (error) {
      return res.status(500).json({ error: 'Internal Error' });
    }
  }

  async delete(req, res){
    const plan = await Plan.findByPk(req.params.id);

    if(!plan){
      return res.status(404).json({ msg: "Plan does not exist !" })
    }

    const { title } = plan;

    try {
      await plan.destroy();

      return res.json({msg: `The plan '${title}' has been deleted.`})
    } catch (error) {
      return res.status(500).json({ error: 'Internal Error' });
    }

  }

}

export default new PlansController();
