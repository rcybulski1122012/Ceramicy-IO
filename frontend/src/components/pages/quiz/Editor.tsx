import { CodeBlock } from 'react-code-block';
import SmellButton from './SmellButton';
import { useEffect, useState } from 'react';
import useLineRange from './LineRange';
import quizzes, { Smell } from '../../../data/quizzes';
import EditorTopSection from './EditorTopSection';
import { code, filename, language, smellTypes } from './data';
import {getAnswers} from "../../../services/localStorageService.ts";

const Editor = () => {
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('http://0.0.0.0:8000/api/v1/quiz', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        console.log('Quizzes:', data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        // Handle error as needed
      }
    };

    fetchQuizzes();
  }, []);


  const [smellLines, setSmellLines] = useState<Smell[][]>(()=>{
      const savedAnswers = getAnswers(quizzes[0].id,'0');
      if(savedAnswers){
          return savedAnswers;
      }
      return [[]];
  });
  let smellCount: number = smellLines.reduce(
    (count, subArray) => count + subArray.length,
    0,
  );
  const lineRange = useLineRange();

  const [correctColor, wrongColor] = [
    'rgba(16, 185, 129, 0.15)',
    'rgba(185, 16, 50, 0.15)',
  ];
  const [correctLines, setCorrectLines] = useState<number[][]>([[4, 6]]);
  const [wrongLines, setWrongLines] = useState<number[][]>([[21, 26]]);
  setCorrectLines;
  setWrongLines;

  const isCorrect = (lineNumber: number) => {
    return correctLines.some(
      ([start, end]) => lineNumber >= start && lineNumber <= end,
    );
  };

  const isWrong = (lineNumber: number) => {
    return wrongLines.some(
      ([start, end]) => lineNumber >= start && lineNumber <= end,
    );
  };

  const handleSubmit = () => {
    console.log(smellLines.reduce((acc, val) => acc.concat(val), []));
    // sending request with smellLines and then updating correctLines and wrongLines
  };

  return (
    <div>
      <EditorTopSection
        x={smellCount}
        y={10}
        handleSubmit={handleSubmit}
      ></EditorTopSection>
      <CodeBlock code={code} language={language} lines={['4:6', '21:45']}>
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
          {/* Filename */}
          <div
            style={{ fontSize: '12px', color: '#9ca3af', padding: '16px 24px' }}
          >
            {filename}
          </div>
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
          {/* Language being used */}
          <div
            style={{
              fontSize: '12px',
              color: '#9ca3af',
              padding: '0 24px 16px',
              textAlign: 'right',
              textTransform: 'uppercase',
              userSelect: 'none',
            }}
          >
            {language}
          </div>
        </div>
      </CodeBlock>
    </div>
  );
};

export default Editor;
