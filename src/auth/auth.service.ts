import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { DbService } from 'src/db/db.service';
import { SignInInput, SignUpInput } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: DbService,
    private jwt: JwtService,
  ) {}

  async signUp(input: SignUpInput) {
    // 1 Check if the user is already exists
    const existing = await this.prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    // 2 Hash the password  - never store plain text passwords in the database
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const hashedPassword: string = await hash(input.password, 10);
    // 3 Create the user
    const user = await this.prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: hashedPassword,
      },
    });

    // 4 Return a token so they're immediately logged in
    return this.generateToken(user.id);
  }

  async signIn(input: SignInInput) {
    // 1 Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new UnauthorizedException('Email is not registered');
    }

    // 2 Compare submitted password with hashed password
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const isMatch = await compare(input.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Password is incorrect');
    }

    return this.generateToken(user.id);
  }

  private async generateToken(userId: number) {
    const payload = { sub: userId };
    const token = await this.jwt.signAsync(payload);
    return { access_token: token };
  }
}
