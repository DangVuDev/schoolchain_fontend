// src/lib/utils.ts
export function formatBalance(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount)
}

export function shortenAddress(address: string): string {
  return address ? `${address.slice(0, 8)}...${address.slice(-6)}` : ''
}