
//Erreur lors de la connexion
module.exports.signInErrors = (err) => {
  let errors = { email: '', password: ''}

  if (err.message.includes("email")) 
    errors.email = "Email ou mot de passe incorrect";
  
  if (err.message.includes('password'))
    errors.password = "Email ou de mot de passe incorrect"

  return errors;
}