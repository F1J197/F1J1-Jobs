export function normalizeFijiWhatsApp(input: string): string {
  const digits = input.replace(/\D/g, '')
  let local = digits
  if (local.startsWith('679')) local = local.slice(3)
  if (local.startsWith('0')) local = local.slice(1)
  if (local.length !== 7) {
    throw new Error('WhatsApp must be a Fiji number (+679 and 7 digits)')
  }
  return `+679 ${local.slice(0, 3)} ${local.slice(3)}`
}
