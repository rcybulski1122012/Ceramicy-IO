export type Answer = {
    start : number;
    end : number;
    smellType : string;
};

export type QuizzAnswerData = {
    correctAnswersPercent : number | null;
    answers: Answer[];
};
export const createEmptyQuizData = (): QuizzAnswerData => ({
  correctAnswersPercent: null,
  answers: [],
});
const saveAnswers = (id:string, answers:Answer[]):void =>{
    try{
        const quizAnswerDataString : string|null = localStorage.getItem(id);
        if(quizAnswerDataString != null){
            const quizAnswerData : QuizzAnswerData = JSON.parse(quizAnswerDataString) as QuizzAnswerData;
            quizAnswerData.answers = answers;
            localStorage.setItem(id,JSON.stringify(quizAnswerData));
        }
        else{
            const quizAnswerData : QuizzAnswerData = createEmptyQuizData();
            quizAnswerData.answers=answers;
            localStorage.setItem(id,JSON.stringify(quizAnswerData));
        }
        return;
    }
    catch(error){
        console.error("Error saving answers to localStorage ", error);
    }
};
const saveCorrectAnswersPercent = (id:string, percent:number):void=>{
    try{
        const quizAnswerDataString : string|null = localStorage.getItem(id);
        if(quizAnswerDataString != null){
            const quizAnswerData : QuizzAnswerData = JSON.parse(quizAnswerDataString) as QuizzAnswerData;
            quizAnswerData.correctAnswersPercent = percent;
            localStorage.setItem(id,JSON.stringify(quizAnswerData));
        }
        else{
            const quizAnswerData : QuizzAnswerData = createEmptyQuizData();
            quizAnswerData.correctAnswersPercent=percent;
            localStorage.setItem(id,JSON.stringify(quizAnswerData));
        }
        return;
    }
    catch(error){
        console.error("Error saving answers to localStorage ", error);
    }
};
const getAnswers = (id:string): Answer[] | null | undefined =>{
    try{
        const quizAnswerDataString : string|null = localStorage.getItem(id);
        if(quizAnswerDataString!=null){
            const quizAnswerData : QuizzAnswerData = JSON.parse(quizAnswerDataString) as QuizzAnswerData;
            return quizAnswerData.answers;
        }
        return undefined;
    }
    catch(error){
        console.error("Error getting answers from localstorage ",error);
    }
};
const getCorrectAnswersPercent = (id:string): number | null | undefined =>{
    try{
        const quizAnswerDataString : string|null = localStorage.getItem(id);
        if(quizAnswerDataString!=null){
            const quizAnswerData : QuizzAnswerData = JSON.parse(quizAnswerDataString) as QuizzAnswerData;
            return quizAnswerData.correctAnswersPercent;
        }
        return undefined;
    }
    catch(error){
        console.error("Error getting answers from localstorage ",error);
    }
};

const deleteData = () :void=>{
    localStorage.clear();
    return;
};

export {saveAnswers,saveCorrectAnswersPercent,getAnswers,getCorrectAnswersPercent,deleteData}