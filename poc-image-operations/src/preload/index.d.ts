import { ElectronAPI } from '@electron-toolkit/preload'

interface AnneAPI {
  requestData: (args: string) => Promise<string>;  
  resizeImage: (args: string) => Promise<string>;
}

declare global {
  interface Window {
    electron: ElectronAPI
    anne: AnneAPI
    api: unknown
  }
}
