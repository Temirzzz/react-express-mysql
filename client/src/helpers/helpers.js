const errorMessage = (data) => {
  const errorData = data
  const loginForm = document.querySelector('.form')
  const errorBlock = document.createElement('p')
  errorBlock.classList.add('login-form__error-message')
  errorBlock.append(errorData)
  loginForm.append(errorBlock)

  console.log(loginForm);
  setTimeout(() => {
    errorBlock.remove()
  }, 3000)
}

module.exports.errorMessage = errorMessage
