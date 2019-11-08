import Mail from '../../lib/Mail';

class RegistrationMail{
  get key() {
    return 'QuestionMail';
  }

  async handle({ data }){
    const { order, student, admin  } = data;

    await Mail.sendMail({
      to: `${admin.name} <noreplay@gympoint.com>`,
      subject: 'Pergunta respondia',
      template: 'question',
      context: {
        student: student.name,
        question: order.question,
        answer: order.answer.text,
      }
    })
  }

}

export default new RegistrationMail();
