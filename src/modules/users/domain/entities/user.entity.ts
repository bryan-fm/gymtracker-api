export type UserRole = 'USER' | 'ADMIN';

class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    private password: string,
    public readonly createdAt: Date,
  ) {}

  changePassword(newPassword: string) {
    this.password = newPassword;
  }

  getPassword() {
    return this.password;
  }
}

export default User;
