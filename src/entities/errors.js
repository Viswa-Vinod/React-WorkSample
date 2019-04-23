class UserError extends Error {
    constructor(message) {
        super(message);
      
        // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UserError);
    }
      
        this.name = this.constructor.name;
        this.message = message;
        this.code = 'user/user-error';
    }
}

class UserNotFound extends UserError {
    constructor(message) {
        super(message);
      
      // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UserNotFound);
    }
      
        this.name = this.constructor.name;
        this.message = 'User not found!';
        this.code = 'user/user-not-found'
    }
}

function func2() {
  throw new UserNotFound();
}

(function func1() {
  try {
    func2();
  } catch (Exception) {
    console.log(Exception, Exception.stack);
    console.log(Exception instanceof UserError);
    throw Exception
  }
})()