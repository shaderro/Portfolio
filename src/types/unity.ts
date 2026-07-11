export type UnityPlayerInstance = {
  Quit: () => Promise<void>;
  SendMessage: (
    objectName: string,
    methodName: string,
    parameter?: string | number,
  ) => void;
  SetFullscreen?: (fullscreen: number) => void;
};
