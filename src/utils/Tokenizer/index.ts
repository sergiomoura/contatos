import { JwtTokenizer } from './implementations/JwtTokenizer';
import { type TokenizerInterface } from './TokenizerInterface';

const Tokenizer = <TokenizerInterface>(new JwtTokenizer());
export { Tokenizer };
