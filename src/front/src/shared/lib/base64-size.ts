export function base64Size(bytes: string) {
  return (bytes.length - 814) / 1.37;
}

export function bToMb(bytes: number) {
  return bytes / 1024 / 1024;
}
