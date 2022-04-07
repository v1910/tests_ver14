//QuestionTest.js------Form one test question

import React from "react";
import { useSelector } from 'react-redux';
import './QuestionTest.css';

//import ReactDOM from 'react-dom';

let count_questions_test = null;

//QuestionTest -  add <ui class="question_test"> 
export function QuestionTest(props) {

    let currentTest         = useSelector((store) => store.currentTest); 
    let tests               = useSelector((store) => store.tests);
    count_questions_test    = useSelector((store) => store.count_questions_test);

//console.log('QuestionTest: props.numberQuestion=',props.numberQuestion);
//console.log('numberQuest=',numberQuest);    
//console.log('QuestionTest: currentTest=',currentTest);    
    let question = tests[currentTest][props.numberQuestion].Q;
    let ID_work = 'ID'+ props.numberQuestion + currentTest*100 +  '_question_test'; 
    let txt_number_question = (props.numberQuestion + 1) + ' of ' + count_questions_test;

    return <>
        <div id='number_question'>{txt_number_question}</div>
        <div id={ID_work} className="question_test">{question}</div>
    </>

} // end of QuestionTest