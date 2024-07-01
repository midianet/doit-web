/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useRef } from 'react';

export const useDebounce = (delay = 300, notDelayInFistTime = true) => {

  const isFirstTime = useRef(notDelayInFistTime);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deboucing = useRef<any>();

  const debounce = useCallback((func: () => void) =>{
    if(isFirstTime.current){
      isFirstTime.current = false;
      func();
    }else{
      if(deboucing.current){
        clearTimeout(deboucing.current);
      }
      deboucing.current = setTimeout(() =>  func(), delay);
    }
  },[]);

  return { debounce };
};