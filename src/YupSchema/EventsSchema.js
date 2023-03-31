import * as Yup from 'yup';

export const eventSchema = Yup.object({
  title: Yup.string().min(3).max(10).required('Please Enter Title'),
  description: Yup.string().min(3).required('Please Enter description'),
  date: Yup.date()
    .nullable()
    .required('Date is required')
    .min(new Date(), 'Date cannot be in the past'),
  startsAt: Yup.string()
    
    .required('Time is required')

    .typeError('Invalid time'),
  endsAt: Yup.string()

    .required('Time is required')

    .typeError('Invalid time'),
  type: Yup.string().required('please Choose type'),
});
