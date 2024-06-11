import axios from '../axios';

export const uploadFiles = async (file: File): Promise<string[]> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post('/file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export type QuizCreatePayload = {
  name: string;
  mainLanguage: string;
  fileUrls: string[];
  codeSmells: object;
};

export type QuizCreateResult = {
  id: string;
  name: string;
  authorId: string;
  mainLanguage: string;
  fileUrls: string[];
  codeSmells: object;
};

export const createQuiz = async (
  quiz: QuizCreatePayload,
): Promise<QuizCreateResult> => {
  const response = await axios.post('/quiz', quiz, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
