export const toQuizCheckObject = (
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

export const mapResponseToState = (response: any) => {
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
