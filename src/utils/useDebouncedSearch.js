import { useState } from 'react';
import { useAsync } from 'react-async-hook';
import useConstant from 'use-constant';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

export default function useDebouncedSearch(searchFunction) {
  const [inputText, setInputText] = useState('');

  const debouncedSearchFunction = useConstant(() =>
    AwesomeDebouncePromise(searchFunction, 300)
  );

  const searchResults = useAsync(
    async () => {
      if (inputText.length === 0) {
        return debouncedSearchFunction('');
      } else {
        return debouncedSearchFunction(inputText);
      }
    },
    [debouncedSearchFunction, inputText]
  );

  return {
    inputText,
    setInputText,
    searchResults,
  };
};