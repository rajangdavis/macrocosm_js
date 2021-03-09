import React from 'react';
export default function useToggle(initialValue = false) {
  const [value, setValue] = React.useState(initialValue);
  const toggle = React.useCallback(() => {
    console.log(value)
    setValue(v => !v);
    console.log(value)
  }, []);
  return [value, toggle];
}