export interface TokenizerInterface {
  create: (payload: any) => string
  validate: (token: string) => boolean
  decode: (token: string) => any
}
