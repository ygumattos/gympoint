import mongoose from 'mongoose';

const HelpOrderSchema = new mongoose.Schema(
  {
    student_id: {
      type: Number,
      required: true
    },
    question: String,
    answer: {
      text: String,
      date: Date
    }
  },{
    timestamps: true,
  }
)

export default mongoose.model('help_orders', HelpOrderSchema);
