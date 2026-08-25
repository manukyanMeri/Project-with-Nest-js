import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { MaxByteLength } from './max-byte-length.decorator';

export class SignUpInput {
  @IsString()
  @IsNotEmpty({ message: 'Name should not be empty' })
  name!: string;
  @IsNotEmpty({ message: 'Email should not be empty' })
  @Matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, {
    message: 'Email is not valid',
  })
  email!: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number, and be at least 8 characters',
  })
  @IsNotEmpty({ message: 'Name should not be empty' })
  @MaxByteLength(72)
  password!: string;
}

export class SignInInput {
  @IsString()
  @IsNotEmpty({ message: 'Name should not be empty' })
  name!: string;
  @IsString()
  @IsNotEmpty({ message: 'Email should not be empty' })
  @Matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, {
    message: 'Email is not valid',
  })
  email!: string;

  @IsString()
  @MaxByteLength(72)
  @IsNotEmpty({ message: 'Name should not be empty' })
  password!: string;
}
