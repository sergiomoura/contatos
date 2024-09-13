import { BCrypter } from './adapters/BCrypter';
import { type Crypter } from './Crypter';
const crypter = <Crypter>(new BCrypter());

export { crypter };
