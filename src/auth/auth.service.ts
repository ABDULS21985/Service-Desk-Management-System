import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const user = new User();
    user.username = registerDto.username;
    const defaultPassword = 'defaultPassword'; // generate or use a more secure random password
    user.password = bcrypt.hashSync(defaultPassword, 10);
    user.email = registerDto.email;
    user.role = registerDto.role;

    const createdUser = await this.usersService.createUser(user);

    await this.sendDefaultPasswordEmail(user.email, defaultPassword);

    return createdUser;
  }

  async sendDefaultPasswordEmail(email: string, password: string) {
    const subject = 'Your Account Details';
    const text = `Your account has been created. Your password is: ${password}`;

    await this.mailerService.sendMail(email, subject, text);
  }
}
