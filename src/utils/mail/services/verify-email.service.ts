import { VerificationEmailUser } from '../../../apps/interfaces/verification-email-user.interface';

export const getVerifyMailOpts = (
  verificationEmailUser: VerificationEmailUser,
) => {
  const date = new Date().getFullYear();
  const { fullName, email, token } = verificationEmailUser;

  return {
    to: email,
    subject: 'Bienvenue sur la plate-forme de AKILPAY',
    template: '../register',
    context: {
      firstName: fullName,
      url: `${process.env.URL_FRONT_END}/auth/login?token=${token}`,
      date,
    },
  };
};
