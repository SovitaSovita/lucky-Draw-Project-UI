import * as Yup from 'yup';
export const SignupSchema = Yup.object().shape({
  // Name: Yup.string()
  //   .min(2, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&]){8,}/, "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:").required('Required')
});

export const WinnerSchema = Yup.object().shape({
  name: Yup.string().required('Required').matches(/^\s*\S+(?:\s+\S+)*\s*$/, 'Name cannot be empty or consist of only whitespace'),
  phoneNumber: Yup.string().required('Required').matches(/^\d+$/, 'Phone number must contain only numbers'),
  orderNo: Yup.string().required('Required').matches(/^\d+$/, 'Order number must contain only numbers'),
  dateOfOrder: Yup.string().required('Required'),
});