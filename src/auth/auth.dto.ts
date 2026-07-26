import { IsString, Matches } from 'class-validator';

export class SignUpInput {
  @IsString()
  @Matches(/^\+374\d{8}$/, {
    message: 'Phone number must start with +374 followed by 8 digits',
  })
  phoneNumber!: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number, and be at least 8 characters',
  })
  password!: string;
}

export class SignInInput {
  @IsString()
  phoneNumber!: string;

  @IsString()
  password!: string;
}
