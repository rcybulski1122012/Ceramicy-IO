import { CodeBlock } from 'react-code-block';
import SmellButton from './SmellButton';
import { useState } from 'react';
import useLineRange from './LineRange';
import quizzes, { Smell } from '../../../data/quizzes';
import EditorTopSection from './EditorTopSection';
import { smellTypes } from './data';
import {getAnswers} from "../../../services/localStorageService.ts";

const Editor = ({ quizId, fileUrl, fileName, fileContent, fileLanguage }) => {
  const [smellLines, setSmellLines] = useState<Smell[][]>(()=>{
      const savedAnswers = getAnswers(quizzes[0].id,'0');
      if(savedAnswers){
          return savedAnswers;
      }
      return [[]];

  });
  const smellCount: number = smellLines.reduce(
    (count, subArray) => count + subArray.length,
    0,
  );
  const lineRange = useLineRange();
  // const hoverLineRange = useLineRange();
  const [hoverEnd, setHoverEnd] = useState();

  const [correctColor, wrongColor] = [
    'rgba(16, 185, 129, 0.15)',
    'rgba(185, 16, 50, 0.15)',
  ];
  const [correctLines, setCorrectLines] = useState<number[][]>([]);
  const [wrongLines, setWrongLines] = useState<number[][]>([]);
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

  const toQuizCheckObject = (
    quiz_id: string,
    file_url: string,
    smells: any,
  ) => {
    return {
      quiz_id: quiz_id,
      files: [
        {
          file_url: file_url,
          smells: smells,
        },
      ],
    };
  };
  
  const mapResponseToState = (response: any) => {
    // Extract the not_found_smells and incorrect_smells and combine them as wrongLines
    const wrongLines = [
      ...Object.values(response.not_found_smells)
        .flat()
        .map((smell: any) => [smell.start, smell.end]),
      ...Object.values(response.incorrect_smells)
        .flat()
        .map((smell: any) => [smell.start, smell.end]),
    ];
  
    // Extract the correct_smells as correctLines
    const correctLines = Object.values(response.correct_smells)
      .flat()
      .map((smell: any) => [smell.start, smell.end]);
  
    return { correctLines, wrongLines };
  };

  const handleSubmit = () => {
    const checkQuiz = async () => {
      try {
        const body = JSON.stringify(
          toQuizCheckObject(
            quizId,
            fileUrl,
            smellLines.reduce((acc, val) => acc.concat(val)),
          ),
        );
        console.log('Body:', body);
        console.log('QuizID: ', quizId);
        const response = await fetch(
          'http://0.0.0.0:8000/api/v1/quiz/check/' + quizId,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: body,
          },
        );

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        const { correctLines, wrongLines } = mapResponseToState(data);
        setCorrectLines(correctLines);
        setWrongLines(wrongLines);
        console.log('Checks:', data);
      } catch (error) {
        console.error('Error checking wuiz:', error);
      }
    };

    checkQuiz();
  };

  return (
    <div>
      <EditorTopSection
        x={smellCount}
        y={10}
        handleSubmit={handleSubmit}
      ></EditorTopSection>
      <CodeBlock code={fileContent} language={fileLanguage} lines={['4:6', '21:45']}>
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
            {fileName}
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
                        hoverEnd={hoverEnd}
                        setHoverEnd={setHoverEnd}
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
            {fileLanguage}
          </div>
        </div>
      </CodeBlock>
    </div>
  );
};

export default Editor;
