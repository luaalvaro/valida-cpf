function handleValidateCpf(cpf) {
  cpf = cpf.replace(/\D/g, '');

  if (cpf.length !== 11) {
    return false;
  }

  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Calcula o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = soma % 11;
  let digito1 = resto < 2 ? 0 : 11 - resto;

  // Verifica se o primeiro dígito verificador está correto
  if (digito1 !== parseInt(cpf.charAt(9))) {
    return false;
  }

  // Calcula o segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = soma % 11;
  let digito2 = resto < 2 ? 0 : 11 - resto;

  // Verifica se o segundo dígito verificador está correto
  if (digito2 !== parseInt(cpf.charAt(10))) {
    return false;
  }

  // Se todas as verificações passaram, o CPF é válido
  return true;
}

export default function handler(req, res) {
  console.log('--> 🟠 Request incoming')

  const { cpf } = req.query
  const isValidCpf = handleValidateCpf(cpf)

  console.log('--> 🟢 Cpf requested is', isValidCpf)
  res.status(200).json({ cpf: cpf, isValid: isValidCpf })
}