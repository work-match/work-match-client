const validationEditProfile = (form) => {
  const errors = {};
  const regexNumber = /^[0-9]+$/; // eslint-disable-next-line
  const regexUsername = /^[a-z_-\d]+$/;
  const regexName = /^[ A-Za-zÑñÁáÉéÍíÓóÚúÜü]+$/i; // eslint-disable-next-line
  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/; //eslint-disable-line 

  if (!form.username) {
    errors.username = "Por favor, agregue un nombre de usuario.";
  } else if (!regexUsername.test(form.username)) {
    errors.username =
      "El nombre de usuario solo acepta letras minúsculas, números y caracteres.";
  } else if (!form.name) {
    errors.name = "Por favor, agregue su nombre y apellido.";
  } else if (!regexName.test(form.name)) {
    errors.name = "Por favor, ingrese un nombre válido.";
  } else if (!form.age) {
    errors.age = "Por favor, ingrese su edad.";
  } else if (!regexNumber.test(form.age)) {
    errors.age = "La edad debe ser un número entero positivo.";
  } else if (form.age < 0 || form.age > 100) {
    errors.age = "Por favor, ingrese una edad válida.";
  } else if (form.age < 16) {
    errors.age = "Debes tener más de 16 años, para poder registrarte.";
  } else if (!form.mail) {
    errors.mail = "Por favor, agregue su correo electrónico.";
  } else if (!regexEmail.test(form.mail)) {
    errors.mail = "Por favor, agregue un correo electrónico válido.";
  } else if (!form.phone) {
    errors.phone = "Por favor, agregue su número de teléfono.";
  } else if (!regexNumber.test(form.phone)) {
    errors.phone = "El teléfono debe ser un número.";
  } else if (form.phone.length < 7 || form.phone.length > 18) {
    errors.phone = "Por favor ingrese un número de teléfono válido.";
  } else if (form.address === "Selecciona una dirección") {
    errors.address = "Por favor ingrese una dirección";
  } else if (form.password && !form.repeatPassword) {
    errors.repeatPassword = "Por favor, repita la contraseña.";
  } else if (form.password !== form.repeatPassword) {
    errors.repeatPassword = "Las contraseñas deben ser iguales.";
  }

  return errors;
};

export default validationEditProfile;
