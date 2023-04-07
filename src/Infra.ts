export enum EnvType {
  PROD = 'production',
  DEV = 'development',
  TEST = 'test'
}

const PORT_PROD = 8080;
const PORT_DEV = 5000;
const PORT_TEST = 5001;

function getPort (env?: EnvType): number {

  if (process.env.PORT !== undefined) {

    return Number(process.env.PORT);
  
  }

  switch (env) {

    case EnvType.PROD:
      return PORT_PROD;
    
    case EnvType.TEST:
      return PORT_TEST;
  
    default:
      return PORT_DEV;
  
  }

}

const Infra = {
  getPort
};

export { Infra };
