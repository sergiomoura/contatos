export interface TokenGenerator {
  create: (payload: any) => string
  validate: (token: string) => boolean
  decode: (token: string) => any
}
