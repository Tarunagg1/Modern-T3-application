import HttpException from "./http.exception";

class UserWithThatEmailAlreadyExistsException extends HttpException {
  constructor(email: String) {
    super(404, `User with provided email already exists`);
  }
}

export default UserWithThatEmailAlreadyExistsException;
