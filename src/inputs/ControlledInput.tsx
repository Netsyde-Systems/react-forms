// resolves issue wherein input's cursor position is reset to end of the string when typing in the middle of the string
// this happens when adding an async change handler.  
// https://stackoverflow.com/questions/46012214/react-set-cursor-position-in-a-text-input

import React, { useEffect, useRef, useState } from 'react';

type InputProps = React.ComponentProps<'input'>;

export const ControlledInput: React.FC<InputProps> = (props) => {
   const { value, onChange, ...rest } = props;
   const [cursor, setCursor] = useState<number | null>(null);
   const ref = useRef<HTMLInputElement>(null);

   useEffect(() => {
      ref.current?.setSelectionRange(cursor, cursor);
   }, [ref, cursor, value]);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCursor(e.target.selectionStart);
      onChange?.(e);
   };

   return <input ref={ref} value={value} onChange={handleChange} {...rest} />;
};

export default ControlledInput;
