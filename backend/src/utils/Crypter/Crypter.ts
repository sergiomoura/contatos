export interface Crypter {
  encrypt: (plainString: string) => string
  compare: (plainString: string, hashedString: string) => boolean
}
