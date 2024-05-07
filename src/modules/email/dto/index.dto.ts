export class ForgetPasswordEmailDto {
  subject: string;
  to: string;
  forgotPasswordToken: string;
}