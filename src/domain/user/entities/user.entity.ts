export type UserRole = 'USER' | 'ADMIN';

export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    private password: string,
    public readonly role: UserRole,
    public readonly createdAt: Date,
  ) {}

  changePassword(newPassword: string) {
    this.password = newPassword;
  }

  getPassword() {
    return this.password;
  }
}