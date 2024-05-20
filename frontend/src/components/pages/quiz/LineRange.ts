import { useState } from 'react';

interface LineRange {
  start: number | null;
  end: number | null;
  col: number | null;
  setStart: (lineNumber: number, col: number) => void;
  setEnd: (lineNumber: number) => void;
  reset: () => void;
}

const useLineRange = (): LineRange => {
  const [start, setStart] = useState<number | null>(null);
  const [end, setEnd] = useState<number | null>(null);
  const [col, setCol] = useState<number | null>(null);

  const handleSetStart = (lineNumber: number, column: number) => {
    setStart(lineNumber);
    setCol(column);
    setEnd(null);
  };

  const handleSetEnd = (lineNumber: number) => {
    setEnd(lineNumber);
  };

  const handleReset = () => {
    setStart(null);
    setEnd(null);
    setCol(null);
  };

  return {
    start,
    end,
    col,
    setStart: handleSetStart,
    setEnd: handleSetEnd,
    reset: handleReset,
  };
};

export default useLineRange;
export type { LineRange };
