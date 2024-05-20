import { useState } from 'react';

interface LineRange {
  start: number | null;
  end: number | null;
  setStart: (lineNumber: number) => void;
  setEnd: (lineNumber: number) => void;
  reset: () => void;
}

const useLineRange = (): LineRange => {
  const [start, setStart] = useState<number | null>(null);
  const [end, setEnd] = useState<number | null>(null);

  const handleSetStart = (lineNumber: number) => {
    setStart(lineNumber);
    setEnd(null);
  };

  const handleSetEnd = (lineNumber: number) => {
    setEnd(lineNumber);
  };

  const handleReset = () => {
    setStart(null);
    setEnd(null);
  };

  return {
    start,
    end,
    setStart: handleSetStart,
    setEnd: handleSetEnd,
    reset: handleReset,
  };
};

export default useLineRange;