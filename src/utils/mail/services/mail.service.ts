import { Injectable } from '@nestjs/common';
import { getVerifyMailOpts } from './verify-email.service';
import { MailerService } from '@nestjs-modules/mailer';
import { VerificationEmailUser } from '../../../apps/interfaces/verification-email-user.interface';
import { passwordRecovery } from './update-email.service';
import { sendEmailByProfil } from './send-email-by-profil.service';
import { IProfilInfo } from '../../../apps/interfaces/agrs-send-email-to-profil.interface';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerifyEmail(verificationEmailUser: VerificationEmailUser) {
    return await this.mailerService.sendMail(
      getVerifyMailOpts(verificationEmailUser),
    );
  }
  async sendPasswordRecoveryEmail(
    verificationEmailUser: VerificationEmailUser,
  ) {
    return await this.mailerService.sendMail(
      passwordRecovery(verificationEmailUser),
    );
  }

  async sendEmailToChangePasswordByProfil(profilInfo: IProfilInfo) {
    return await this.mailerService.sendMail(sendEmailByProfil(profilInfo));
  }
}
