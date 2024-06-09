import {Smell} from "./../data/quizzes.ts"

type QuizzAnswerData = {
    correctAnswersPercent : number | null;
    smells: Smell[][];
};
const createEmptyQuizData = (): QuizzAnswerData => ({
  correctAnswersPercent: null,
  smells: [[]],
});
export type QuizzAnswerDataDict = {
    [key:string]:QuizzAnswerData;
}

const saveAnswers = (id:string, url:string, smells:Smell[][]):void =>{
    try{
        const quizAnswerDataDictString : string|null = localStorage.getItem(id);
        if(quizAnswerDataDictString != null){
            const quizAnswerDataDict : QuizzAnswerDataDict = JSON.parse(quizAnswerDataDictString) as QuizzAnswerDataDict;
            if(quizAnswerDataDict[url]!=null){
                quizAnswerDataDict[url].smells=smells;
                localStorage.setItem(id,JSON.stringify(quizAnswerDataDict));
            }
            const quizAnswerData : QuizzAnswerData = createEmptyQuizData();
            quizAnswerData.smells=smells;
            quizAnswerDataDict[url]=quizAnswerData;
            localStorage.setItem(id,JSON.stringify(quizAnswerDataDict));
        }
        else{
            const quizAnswerData : QuizzAnswerData = createEmptyQuizData();
            quizAnswerData.smells=smells;
            const quizAnswerDataDict : QuizzAnswerDataDict = {url:quizAnswerData}
            localStorage.setItem(id,JSON.stringify(quizAnswerDataDict))
        }
        return;
    }
    catch(error){
        console.error("Error saving answers to localStorage ", error);
    }
};
const saveCorrectAnswersPercent = (id:string, url:string, percent:number):void=>{
    try{
        const quizAnswerDataDictString : string|null = localStorage.getItem(id);
        if(quizAnswerDataDictString != null){
            const quizAnswerDataDict : QuizzAnswerDataDict = JSON.parse(quizAnswerDataDictString) as QuizzAnswerDataDict;
            if(quizAnswerDataDict[url]!=null){
                quizAnswerDataDict[url].correctAnswersPercent=percent;
                localStorage.setItem(id,JSON.stringify(quizAnswerDataDict));
            }
            const quizAnswerData : QuizzAnswerData = createEmptyQuizData();
            quizAnswerData.correctAnswersPercent=percent;
            quizAnswerDataDict[url]=quizAnswerData;
            localStorage.setItem(id,JSON.stringify(quizAnswerDataDict));
        }
        else{
            const quizAnswerData : QuizzAnswerData = createEmptyQuizData();
            quizAnswerData.correctAnswersPercent=percent;
            const quizAnswerDataDict : QuizzAnswerDataDict = {url:quizAnswerData}
            localStorage.setItem(id,JSON.stringify(quizAnswerDataDict))
        }
        return;
    }
    catch(error){
        console.error("Error saving answers to localStorage ", error);
    }
};
const getAnswers = (id:string, url:string): Smell[][] | null | undefined =>{
    try{
        const quizAnswerDataDictString : string|null = localStorage.getItem(id);
        if(quizAnswerDataDictString!=null){
            const quizAnswerDataDict : QuizzAnswerDataDict = JSON.parse(quizAnswerDataDictString) as QuizzAnswerDataDict;
            if (quizAnswerDataDict!=null){
                if (quizAnswerDataDict[url]!=null){
                    return quizAnswerDataDict[url].smells;
                }
            }
            return undefined;
        }
        return null;
    }
    catch(error){
        console.error("Error getting answers from localstorage ",error);
    }
};
const getCorrectAnswersPercent = (id:string, url:string): number | null | undefined =>{
    try{
        const quizAnswerDataDictString : string|null = localStorage.getItem(id);
        if(quizAnswerDataDictString!=null){
            const quizAnswerDataDict : QuizzAnswerDataDict = JSON.parse(quizAnswerDataDictString) as QuizzAnswerDataDict;
            if (quizAnswerDataDict!=null){
                if (quizAnswerDataDict[url]!=null){
                    return quizAnswerDataDict[url].correctAnswersPercent;
                }
            }
            return undefined;
        }
        return null;
    }
    catch(error){
        console.error("Error getting answers from localstorage ",error);
    }
};

const deleteData = () :void=>{
    localStorage.clear();
    return;
};

const getName = () : string | null =>{
    return localStorage.getItem("name");
};
const setName = (name:string) : void =>{
    localStorage.setItem("name",name);
    return;
};
const deleteName = () : void=>{
    localStorage.setItem("name","");
    return;
};

const log = () : void =>{
    console.log(localStorage);
    return;
}

export {saveAnswers,saveCorrectAnswersPercent,getAnswers,getCorrectAnswersPercent,deleteData,getName,setName,deleteName,log}