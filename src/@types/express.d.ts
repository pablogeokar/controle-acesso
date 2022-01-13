/**
 * Adiciona ao objeto Req do express uma nova 
 * tipagem com um objeto novo a ser manipulado
 * nas requisições
 */
declare namespace Express {
  export interface Request {
    userAuth: {
      hash: string
    }
  }
}