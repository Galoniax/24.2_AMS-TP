
export interface IError {
  response: IReponse;
  status: number;
  name: string;
  message: string;
  timeout: number;
  readyState: number;
}

interface IReponse {
  config: any,
  data: IReponseError,
  status: number,
}

interface IReponseError {
  message: string;
}