import { VerificationEmailUser } from '../../../apps/interfaces/verification-email-user.interface';

export const passwordRecovery = (
  verificationEmailUser: VerificationEmailUser,
) => {
  const date = new Date().getFullYear();
  const { fullName, email, token } = verificationEmailUser;

  return {
    to: email,
    subject: 'Réinitialiser votre mot de passe AKILPAY',
    template: '../password-recovery',
    context: {
      firstName: fullName,
      url: `${process.env.URL_PASSWORD_RECOVERY}?token=${token}`,
      date,
    },
  };
};
