

class LoggerService {

  static log(message: string, extra?: any) {
    console.log(message, extra);
  }

  static error(message: string, extra?: any) {
    console.error(message, extra);
  }

  static warn(message: string, extra?: any) {
    console.warn(message, extra);
  }

  static info(message: string, extra?: any) {
    console.info(message, extra);
  }

}

export default LoggerService;