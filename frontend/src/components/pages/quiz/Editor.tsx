import { CodeBlock } from 'react-code-block';
import SmellButton from './SmellButton';
import { useState } from 'react';
import useLineRange from './LineRange';
import { Smell } from '../../../data/quizzes';
import EditorTopSection from './EditorTopSection';
import { code, filename, language } from './data';

const Editor = () => {
  const [smellLines, setSmellLines] = useState<Smell[][]>([]);
  let smellCount: number = smellLines.reduce(
    (count, subArray) => count + subArray.length,
    0,
  );
  const lineRange = useLineRange();

  const handleSubmit = () => {
    console.log(smellLines.reduce((acc, val) => acc.concat(val), []));
  };

  return (
    <div>
      <EditorTopSection
        x={smellCount}
        y={10}
        handleSubmit={handleSubmit}
      ></EditorTopSection>
      <CodeBlock code={code} language={language} lines={['4:6']}>
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
            {({ isLineHighlighted, lineNumber }) => (
              <div
                style={{
                  display: 'table-row',
                  alignItems: 'center',
                  backgroundColor: isLineHighlighted
                    ? 'rgba(16, 185, 129, 0.15)'
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
