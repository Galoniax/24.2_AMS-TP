export interface IError {
  response: IReponse;
  status: number;
  name: string;
  message: string;
  timeout: number;
  readyState: number;
}

interface IReponse {
  config: any;
  data: IReponseError;
  status: number;
  request: any;
}

interface IReponseError {
  message: string;
}
