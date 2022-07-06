import { IProfilInfo } from '../../../apps/interfaces/agrs-send-email-to-profil.interface';

export const sendEmailByProfil = (profilInfo: IProfilInfo) => {
  const date = new Date().getFullYear();
  const { fullName, email, token, companyName } = profilInfo;

  return {
    to: email,
    subject: `Vous avez un nouveau compte AkilPay de l'entreprise ${companyName}`,
    template: '../send-email-to-profil-account',
    context: {
      firstName: fullName,
      url: `${process.env.URL_FRONT_END}/auth/reset-password-profil?token=${token}`,
      date,
      companyName,
      email,
    },
  };
};
