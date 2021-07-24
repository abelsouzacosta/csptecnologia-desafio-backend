export function CheckIfItsANumber(num: string): boolean {
  // parsear para inteiro
  const parsedNumber = parseInt(num);

  if (isNaN(parsedNumber)) return false;

  return true;
}
