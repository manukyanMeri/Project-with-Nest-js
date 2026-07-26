import { registerDecorator, ValidationOptions } from 'class-validator';

export function MaxByteLength(
  maxBytes: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'maxByteLength',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [maxBytes],
      validator: {
        validate(value: unknown, args) {
          if (typeof value !== 'string') return false;
          const [limit] = args?.constraints as [number];
          return Buffer.byteLength(value, 'utf8') <= limit;
        },
        defaultMessage() {
          return `Password must not be longer`;
        },
      },
    });
  };
}
