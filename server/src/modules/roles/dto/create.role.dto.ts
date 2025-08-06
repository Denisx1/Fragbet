export class CreateRoleDto {
  readonly value: string;
  readonly description: string;
  readonly permissions: string[];
}
