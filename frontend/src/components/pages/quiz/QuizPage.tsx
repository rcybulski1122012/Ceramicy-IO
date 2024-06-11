import { Grid, GridItem } from '@chakra-ui/react';
import Layout from '../../layout/Layout';
import FileSelection from './FileSelection';
import Editor from './Editor';
import { useEffect, useState } from 'react';

const QuizPage = (quiz_id: string) => {
  const [selectedFileContent, setSelectedFileContent] = useState<string>('');
  const [quizData, setQuizData] = useState<Array<{ id: string, name: string, url: string, smell_count: number, language: string }>>([]);
  const [selectedFileId, setSelectedFileId] = useState<string>('');
  const [selectedFileUrl, setSelectedFileUrl] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedFileLanguage, setSelectedFileLanguage] = useState('');

  const process_quiz_data = (data: any) => {
    console.log(data)
    const fileUrls = data.file_urls;
        const codeSmells = data.code_smells;
        
        const filesData = fileUrls.map((url: string) => {
          const fileName = url.split('/').pop() || '';
          const smellCount = codeSmells[url] ? codeSmells[url].length : 0;
          const language = data.main_language;
          const fileId = data.id
          return {
            id: fileId,
            name: fileName,
            url: url,
            smell_count: smellCount,
            language: language
          };
        });
    return filesData;
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        quiz_id = 'dbeafc38-19ce-4438-be88-1d47e124ada0'; // needs to be passed from the list
        const response = await fetch(
          `http://localhost:8000/api/v1/quiz/${quiz_id}`,
        );
        const data = await response.json();
        let processed_data = process_quiz_data(data);
        setQuizData(processed_data);
        handleFileSelect(processed_data[0].id);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, [quiz_id]);

  useEffect(() => {
    const fetchFileContent = async () => {
      if (selectedFileId !== null) {
        const selectedFile = quizData.find(file => file.id === selectedFileId);
        if (selectedFile) {
          try {
            console.log(selectedFile)
            setSelectedFileUrl(selectedFile.url);
            setSelectedFileName(selectedFile.name);
            setSelectedFileLanguage(selectedFile.language)
            const response = await fetch(selectedFile.url);
            const fileContent = await response.text();
            console.log(fileContent);
            setSelectedFileContent(fileContent);
          } catch (error) {
            console.error('Error fetching file content:', error);
          }
        }
      }
    };

    fetchFileContent();
  }, [selectedFileId, quizData]);

  const handleFileSelect = (fileId: string) => {
    setSelectedFileId(fileId);
  };

  return (
    <Layout>
      <Grid templateColumns="repeat(7, 1fr)" width={'100%'}>
        <GridItem colSpan={2} minWidth={'360px'}>
          <FileSelection
            quiz={quizData.find(file => file.id === selectedFileId) || {id: '', name: ''}}
            files={quizData}
            onFileSelect={handleFileSelect}
          />
        </GridItem>
        <GridItem colSpan={5} w="100%" p={6}>
          <Editor quizId={selectedFileId} fileUrl={selectedFileUrl} fileName={selectedFileName} fileContent={selectedFileContent} fileLanguage={selectedFileLanguage}></Editor>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default QuizPage;
