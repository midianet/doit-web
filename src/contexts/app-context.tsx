import { createContext, useCallback, useContext, useState } from 'react';

export enum MessageType {
  Error = 'error',
  Success = 'success'
}

export interface Message{
  level: 'error' | 'success';
  message: string;
}

interface AppContextData{
  loading: boolean
  message: Message | undefined,
  setLoading: (loading: boolean) => void
  showMessage: (newMessage: Message) => void;
}

const AppContext  = createContext({} as AppContextData);

export const useAppContext = () => {
  return useContext(AppContext);
};

interface AppProviderProps{
  children: React.ReactNode
}
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<Message|undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false)

  const showMessage = useCallback((newMessage : Message) => {
    setMessage(newMessage);
    setTimeout(() => setMessage(undefined), message?.level == 'error' ? 5000 : 3500 )
  },[])

  return (
    <AppContext.Provider value={{message , showMessage, setLoading, loading}}>
      {children}
    </AppContext.Provider>
  )

}