import { CryptoHashGenerator } from './implementations/CryptoHashGenerator';

const hashGenerator = new CryptoHashGenerator();
const { hash } = hashGenerator;

export { hash };
