//footerQuestion.js: Form footer for one question with answer variants 

import React from "react";

import { useSelector, useDispatch } from 'react-redux';

import './FooterQuestion.css';

//import ReactDOM from 'react-dom';

let state_reply           = null;
let state_button_close    = null;
let count_questions_test  = null;
let currentTest           = null;
let cAnswers              = null;
let count_correct_answer  = null;  
let tests                 = null;  
let count_time_question   = null ; // array of question time
let count_time_test       = null;   // array of all test_time
let X_setInterval         = null;
let state_test            = null;
let WHY_botton_visibility = null;
let current_question      = null;
let congrFinishTest       = null;


export function FooterQuestion(props)  {//------------------------------------------------

  // why - show grammer rules (n_reply - key in correct_answers_tests.js) for correct answer 
  //      ID - last div in this question = #ID0200_space_question (for first question)
  //      ID_cont - ID container
  function why(n_reply, ID, ID_cont, e) {//------------------------
//    let arr_state_button_close_new=[];
//    let state_reply=[];
//console.log('FooterQuestion why: n_reply=',  n_reply, 'ID=', ID, 'ID_cont=',ID_cont);  
//console.log('FooterQuestion why: state_reply=',state_reply)
//console.log(' state_button_close=', state.state_button_close)
    let work = state_test.find(item => item === true);
//console.log('FooterQuestion why: state_test=',state_test, '  work=', work);    
    if(work === undefined){    
      for(let i = 0; i < count_questions_test; i++){
        state_reply[i] = ' ';
        state_button_close[i] = '0';
      }
  //    let arr_state_button_close_new =  state_button_close.slice(props.count_questions_test);

      state_reply[props.numberQuestion] = cAnswers[n_reply];

      state_button_close[props.numberQuestion] = '1'; //show button
  
//console.log('1  state_reply=', state_reply)

      dispatch({type: 'footerQuestion_why', 
                payload: {
                  state_reply:        state_reply,
                  state_button_close: state_button_close
                }
              });
    }
  }//---end of why================================================
    
  function answer_close(e){  // delete the answer for WHY -------------------------

    state_button_close = Array(count_questions_test).fill(0);// state of close button                                                             

    state_reply = Array(count_questions_test).fill(' ');// state of close button    

    reply_button = '';

//console.log('FooterQuestion: state_reply=',state_reply);
//console.log('FooterQuestion: arr_state_button_close_new=',arr_state_button_close_new);

//     setState({state_reply: state_reply,
//                   state_button_close: arr_state_button_close_new
//    });

    dispatch({type: 'footerQuestion_answer_close', 
              payload: {
                state_reply:        state_reply,
                state_button_close: state_button_close,
                showHideTest:       'showHideTest'
              }
            });

  } //---end of answer_close ============================================
  

  count_questions_test  = useSelector((store) => store.count_questions_test);
  currentTest           = useSelector((store) => store.currentTest);
  state_reply           = (useSelector((store) => store.state_reply)).slice();
  state_button_close    = (useSelector((store) => store.state_button_close)).slice();
  cAnswers              = useSelector((store) => store.cAnswers);
  count_correct_answer  = useSelector((store) => store.count_correct_answer);  
  tests                 = useSelector((store) => store.tests);  
  count_time_question   = (useSelector((store) => store.count_time_question)).slice(); // array of question time
  count_time_test       = (useSelector((store) => store.count_time_test)).slice();   // array of all test_time
  X_setInterval         = useSelector((store) => store.X_setInterval);
  state_test            = useSelector((store) => store.state_test);
  WHY_botton_visibility = useSelector((store) => store.WHY_botton_visibility);
  current_question      = useSelector((store) => store.current_question);
  congrFinishTest       = useSelector((store) => store.congrFinishTest);
  
    
//console.log('FooterQuestion: useSelector: state_reply=',state_reply);
  
  
  let dispatch = useDispatch();  

  

//console.log('FooterQuestion:  props.numberQuestion=', props.numberQuestion);

    // Transform html-text into text
    const renderHTML =  (rawHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML }});//----------

//console.log('FooterQuestion:  renderHTML=', renderHTML);                        
    // button WHY
    let ID_work       = 'ID'+  props.numberQuestion + currentTest*100 +  '_footer_question';
    let ID_work2      = 'ID'+  props.numberQuestion + currentTest*100 +  '_button_test';
    let ID_cont       = 'ID'+  props.numberQuestion + currentTest*100 +  '_question_cont';
    let n_reply       = tests[currentTest][props.numberQuestion].R;
    let ID_work3      = 'ID'+  props.numberQuestion + currentTest*100 + '_space_question';
    let reply_button  = '';
    let ID_work4      = 'ID'+  props.numberQuestion + currentTest*100 + '_button_answer_close';
//console.log('FooterQuestion:  n_reply=', n_reply, '   props.numberQuestion=',props.numberQuestion, '   currentTest=', currentTest);     
//console.log('FooterQuestion:  tests[currentTest]=', tests[currentTest]);
    // add <div class="number_question">
    let ID_work5 = 'ID'+  props.numberQuestion + currentTest*100 +  '_number_question';
    let innerHTML_work5 =  'Current sentense:' + (props.numberQuestion + 1).toString() + ' All sentenses:' + count_questions_test.toString();
    let style_width_work5; 

    if( props.numberQuestion < 9)  style_width_work5 = {width: '26px'}
    else style_width_work5 = {width: '35px'};
//console.log('props.count_correct_answer=',props.count_correct_answer);
    // add <div class="correct_answers">
    let ID_work6 = 'ID'+  props.numberQuestion + currentTest*100 +  '_correct_answers';
    let innerHTML_work6;
//console.log('props.count_questions_test=',props.count_questions_test)
//console.log('i=',i)
//console.log(' state.state_count_correct_answer[i]=', state.state_count_correct_answer[i])      
//console.log('props.count_correct_answer=',props.count_correct_answer[ props.numberQuestion],'   props.numberQuestion=', props.numberQuestion)    
    let sum_count_correct_answer = 0;
    for(let i = 0; i <=  props.numberQuestion; i++){
      sum_count_correct_answer = sum_count_correct_answer + count_correct_answer[i];
    }

    let si =  props.numberQuestion.toString();
		if(count_correct_answer[ props.numberQuestion] >= 0) {
			switch (si.length) {
				case 1:
					innerHTML_work6  =  ' ' + sum_count_correct_answer; 		
					break;
				case 2:
					innerHTML_work6  = ' \u00A0' + sum_count_correct_answer; 		
					break;
				case 3:
					innerHTML_work6  = ' \u00A0' + sum_count_correct_answer; 		
					break;				
				default:
					innerHTML_work6  = ' \u00A0' + sum_count_correct_answer; 		
			}
		}
    else 	innerHTML_work6  = '\u00A0';

    innerHTML_work6  = 'All correct answers:' + innerHTML_work6;


    // add <div class="time_question">
    let ID_time_qst = 'ID'+  props.numberQuestion + currentTest*100 +  '_time_question';

//    let innerHTML_work7  = count_time_question[props.numberQuestion];

//console.log('props.numberQuestion=',props.numberQuestion)
//console.log('innerHTML_work7=',innerHTML_work7)
    // add <div class="time_test">
    let ID_time_work8 = 'ID'+  props.numberQuestion + currentTest*100 + '_time_test';
  
//    let innerHTML_work8  = count_time_test[props.numberQuestion];
    
    if( state_button_close[ props.numberQuestion] === '1'){ //show button Close
      reply_button = (<button className="button_answer_close" id={ID_work4} onClick={(e) =>  answer_close(e)}>{"CLOSE"}</button>);
    }
  
    if(current_question === count_questions_test) WHY_botton_visibility.fill({display: 'block'});

    if(current_question === count_questions_test) 
      congrFinishTest = 'Congratulate. You have complited the test. If you would like to check any of your answers, you must click on the appropriate WHY button.';        

    //WHY_botton_visibility = {visibility: 'visible'};

//console.log('WHY_botton_visibility=',WHY_botton_visibility);
//console.log('current_question=',current_question, '  count_questions_test=',count_questions_test);

    let id_test1 = 'ID0' + currentTest*100 + '_question_cont';

    let el_a = document.getElementById(id_test1);

    let event = new Event('click');

//    el_a.dispatchEvent(event);

//    let innerHTML_work5_innerHTML_work6 = innerHTML_work5 + ' \u00A0' + innerHTML_work6;    

//    let count_time_question_count_time_test = 'Current sentence time:' + count_time_question[props.numberQuestion] + '\u00A0 All sentences time:' + count_time_test[props.numberQuestion];
//    let count_time_question_count_time_test = 'Current sentence time:' + count_time_question[props.numberQuestion] + '\u00A0 All sentences time:' + count_time_test[props.numberQuestion];    
//<div className="time_question" id={ID_time_qst}><nobr>{count_time_question_count_time_test}</nobr></div>  
    return (
      <>
        <div className="box_time" id={ID_work}>
          <div id='text_current_time'>Current sentence time:</div>
          <div className="current_time_question" id={ID_time_qst}><nobr>{count_time_question[props.numberQuestion]}</nobr></div>  
          <div id='text_all_time'>All sentence time:</div>
          <div className="all_time_question"> <nobr>{count_time_test[props.numberQuestion]}</nobr></div>  
        </div>
        <div className="number_question" id={ID_work5} style={style_width_work5}><nobr>{innerHTML_work6}</nobr></div>                  
        <div><button className="WHY_button_test"  id={ID_work2} style={WHY_botton_visibility[props.numberQuestion]} onClick={(e) =>  why(n_reply, ID_work2, ID_cont, e)}>{"Show me Why"}</button></div>
        <div className="space_question" id={ID_work3}>
          {renderHTML(state_reply[props.numberQuestion])}
          {reply_button}
        </div>
        <hr />
      </>
    )

} //---end of FooterQuestion ================================================================

/*
<span className="correct_answers" id={ID_work6}><nobr>{innerHTML_work6}</nobr></span>
          <span className="time_test" id={ID_time_work8}>{count_time_test[props.numberQuestion]}</span>

    dispatch({  type: 'FooterQuestion',   payload: {
                                                       WHY_botton_visibility:   WHY_botton_visibility 
                                                    }
            })

{renderHTML(state_reply[ props.numberQuestion])}
          {reply_button}

          <div className="time_question" id={ID_time_qst}>{count_time_question[props.numberQuestion]}</div>  
          <div className="time_test" id={ID_time_work8}>{count_time_test[props.numberQuestion]}</div>



                    <div className="time_question" id={ID_time_qst}><nobr>{count_time_question_count_time_test}</nobr></div>            
*/          
