import { JwtTokenGenerator } from './implementations/JwtTokenGenerator';
import { type TokenGenerator } from './TokenGenerator';

const tokenGenerator = <TokenGenerator>(new JwtTokenGenerator());
export { tokenGenerator };
