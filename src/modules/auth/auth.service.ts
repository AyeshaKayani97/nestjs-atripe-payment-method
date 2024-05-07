import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { LogInDTO } from './dto/signin.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {
  }

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService.create({
      name,
      password: hashedPassword,
      email,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async login(loginDto: LogInDTO): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.usersService.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async forgotPassword(forgotPasswordDTO: ForgotPasswordDTO): Promise<{ message: string }> {
    const { email } = forgotPasswordDTO;

    const user = await this.usersService.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('This Email Does Not Exist');
    }

    const randomToken = crypto.randomUUID();

    await this.usersService.updateOne(email, { forgotPasswordToken: randomToken });

    await this.emailService.forgetPasswordEmail({
      subject: '<<APP: FORGET PASSWORD>>',
      forgotPasswordToken: randomToken,
      to: email,
    });

    return {
      message: 'Reset password email has been sent. Please check your inbox.',
    };
  }

  async resetPassword(resetPasswordDTO: ResetPasswordDTO): Promise<{ message: string }> {
    const { token, password } = resetPasswordDTO;

    const user = await this.usersService.findOne({ forgotPasswordToken: token });

    if (!user) {
      throw new UnauthorizedException('This link has expired');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.usersService.updateOne(user.email, {
      password: hashedPassword,
      forgotPasswordToken: null,
    });

    return {
      message: 'User Password has been reset',
    };
  }
}
