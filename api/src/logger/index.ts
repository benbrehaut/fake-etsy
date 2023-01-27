/* eslint-disable no-console */
export enum MessageType {
  Error = 'error',
  Log = 'log',
}

type Logger = {
  type: MessageType;
  message: string;
};

export const LogMessage = ({ type, message }: Logger) => {
  console.log(`Type: ${type}`);
  console.log(`Message: ${message}`);
};
