import { useState, useEffect } from 'react';
import {code, language, smellTypes} from './pages/quiz/data.ts';
import {CodeBlock} from "react-code-block";
import {Box, Button, Flex} from '@chakra-ui/react';
import {Smell} from "../data/quizzes.ts";
import useLineRange from "./pages/quiz/LineRange.ts";
import SmellButton from "./pages/quiz/SmellButton.tsx";

const AnswerDisplay = ({ initialSolution, onBack }) => {
    const [smellLines, setSmellLines] = useState<Smell[][]>(initialSolution);

  useEffect(() => {
    setSmellLines(initialSolution);
  }, [initialSolution]);

  const [correctColor, wrongColor] = [
    'rgba(16, 185, 129, 0.15)',
    'rgba(185, 16, 50, 0.15)',
  ];
  const [correctLines] = useState([[4, 6]]);
  const [wrongLines] = useState([[21, 26]]);


  const isCorrect = (lineNumber) => {
    return correctLines.some(
      ([start, end]) => lineNumber >= start && lineNumber <= end,
    );
  };

  const isWrong = (lineNumber) => {
    return wrongLines.some(
      ([start, end]) => lineNumber >= start && lineNumber <= end,
    );
  };
  let smellCount: number = smellLines.reduce(
    (count, subArray) => count + subArray.length,
    0,
  );
  const lineRange = useLineRange();

  return (
      <Flex paddingLeft={100}>
      <Button position="relative" top={4} right={30} onClick={onBack}>
        Back to Admin
      </Button>
        <CodeBlock code={code} language={language} lines={['4:6', '21:45']} >
          <div
            style={{
              position: 'relative',
              backgroundColor: 'gray-50',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow:
                '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }}
          >
            <CodeBlock.Code style={{ padding: '0', overflow: 'scroll' }}>
              {({ lineNumber }) => (
                <div
                  style={{
                    display: 'table-row',
                    alignItems: 'center',
                    backgroundColor: isCorrect(lineNumber)
                      ? correctColor
                      : isWrong(lineNumber)
                      ? wrongColor
                      : 'transparent',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    {Array.from({ length: smellLines.length + 1 })
                      .map((_, idx) => smellLines.length - idx)
                      .map((idx) => (
                        <SmellButton
                            key={`${lineNumber}-${idx}`}
                            id={lineNumber}
                            col={idx}
                            smellLines={smellLines}
                            setSmellLines={setSmellLines}
                            lineRange={lineRange}
                            smellTypes={smellTypes}
                        />
                      ))}
                  </div>
                  <CodeBlock.LineNumber
                    style={{
                      display: 'table-cell',
                      paddingRight: '16px',
                      fontSize: '12px',
                      color: '#6b7280',
                      textAlign: 'right',
                      userSelect: 'none',
                    }}
                  />
                  <CodeBlock.LineContent
                    style={{
                      display: 'table-cell',
                      width: '100%',
                      paddingRight: '24px',
                    }}
                  >
                    <CodeBlock.Token />
                  </CodeBlock.LineContent>
                </div>
              )}
            </CodeBlock.Code>
          </div>
        </CodeBlock>
    </Flex>
  );
};


export default AnswerDisplay;
