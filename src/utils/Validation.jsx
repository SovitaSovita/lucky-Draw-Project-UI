import * as Yup from 'yup';
export const SignupSchema = Yup.object().shape({
    // Name: Yup.string()
    //   .min(2, 'Too Short!')
    //   .max(50, 'Too Long!')
    //   .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&]){8,}/,"Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:").required('Required')
  });