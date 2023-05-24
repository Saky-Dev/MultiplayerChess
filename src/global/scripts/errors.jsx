class ValidationError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ValitationError'
    this.stack = `${this.name}: ${this.message}`
  }
}

class RegisterError extends Error {
  constructor (message) {
    super(message)
    this.name = 'RegisterError'
    this.stack = `${this.name}: ${this.message}`
  }
}

class FirebaseError extends Error {
  error = undefined

  constructor (error) {
    super()
    this.name = 'FirebaseError'
    this.message = ''
    this.stack = ''
    this.error = error
  }
}

export { ValidationError, RegisterError, FirebaseError }
