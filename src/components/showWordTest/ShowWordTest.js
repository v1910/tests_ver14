//ShowWordTest.js: show a word

import React, {useEffect} from "react";

import ReactDOM from 'react-dom';

import { useSelector, useDispatch } from 'react-redux';

import './ShowWordTest.css';

import {showDescr}          from "../showDescr/showDescr.js";

import {inputWord}          from "../inputWord/inputWord.js";

import {showAnswer}         from "../showAnswer/showAnswer.js";

import {showWord2}          from "../showWord2/showWord2.js";

import {nextWord}           from "../nextWord/nextWord.js";

import {currentWordClean}   from "../currentWordClean/currentWordClean.js"; //read the current word without (v), (a), (n), (c)

import {getRandomInt}       from "../getRandomInt/getRandomInt.js";// Returns a random integer between min (inclusive) and max (inclusive).

import {wordsRandom}        from "../wordsRandom/wordsRandom.js";

import {showTranscription}  from "../showTranscription/showTranscription.js";


let words                                      = null;
let nWords                                     = null;
let all_words                                  = null;
let current_number_word_group                  = null;
let current_number_word                        = null;
let count_pick_button_show_word                = null;
let state_button_next_descr_color              = null;
let state_input_word_value                     = null;
let state_label_yes_no_word_value              = null;
let state_label_yes_no_word_style              = null;
let state_tate_label_answer_value              = null;
let state_label_answer_visibility              = null;
let state_button_show_words_color              = null;
let state_label_show_words_value               = null;
let state_label_show_words_visibility          = null;
let state_label_show_transcription_visibility  = null;
let state_label_show_transcription_value       = null;
let state_button_next_word_value               = null;
let state_label_next_descr_value               = '';
let state_label_answer_value                   = null;
let count_pick_button_show_description         = null;
let count_pick_button_show_answer              = null;
let input_input_word_value                     = null;
let button_show_descr_style                    = null;
let button_show_words_style                    = null;
let style_state_button_next_descr_color        = null;  
let work_arr                                   = null;  
let state_state_label_show_transcription_visibility = null;
let checkStyle                                 = {backgroundColor: 'rgba(154,136,112,0.5)', cursor: 'none'};
let numberWords                                = null;
let words_files                                = null;
let showHideWordsInstruction                   = null;
let title_button                               = null;
let words_instructions_visibility              = null;

export function ShowWordTest() {  //---------------------------------------

//console.log('ShowWordTest +++++++++++')     

  

  nWords                                = useSelector((store) => store.nWords);

  all_words                             = useSelector((store) => store.all_words);

  current_number_word_group             = useSelector((store) => store.current_number_word_group);

  current_number_word                   = useSelector((store) => store.current_number_word);

  count_pick_button_show_word           = useSelector((store) => store.count_pick_button_show_word);

  state_button_next_descr_color         = useSelector((store) => store.state_button_next_descr_color);  
  
  state_label_yes_no_word_style         = useSelector((store) => store.state_label_yes_no_word_style);  

  input_input_word_value                = useSelector((store) => store.input_input_word_value);  

  count_pick_button_show_description    = useSelector((store) => store.count_pick_button_show_description);

  state_button_next_descr_color         = useSelector((store) => store.state_button_next_descr_color);

  state_label_next_descr_value          = useSelector((store) => store.state_label_next_descr_value);

  state_input_word_value                = useSelector((store) => store.state_input_word_value);

  state_label_yes_no_word_value         = useSelector((store) => store.state_label_yes_no_word_value);

  state_tate_label_answer_value         = useSelector((store) => store.state_tate_label_answer_value);

  state_label_answer_visibility         = useSelector((store) => store.state_label_answer_visibility);

  state_button_show_words_color         = useSelector((store) => store.state_button_show_words_color);

  state_label_show_words_value          = useSelector((store) => store.state_label_show_words_value);

  state_label_show_words_visibility     = useSelector((store) => store.state_label_show_words_visibility);

  state_label_show_transcription_value  = useSelector((store) => store.state_label_show_transcription_value);

  state_button_next_word_value          = useSelector((store) => store.state_button_next_word_value);

  work_arr                              = (useSelector((store) => store.work_arr)).slice();

  state_label_answer_value              = useSelector((store) => store.state_label_answer_value);  

  state_label_show_transcription_visibility = useSelector((store) => store.state_label_show_transcription_visibility);

  checkStyle                            = useSelector((store) => store.checkStyle);

  words_files                           = useSelector((store) => store.words_files);

  showHideWordsInstruction              = useSelector((store) => store.showHideWordsInstruction);

  
  
//console.log('ShowWordTest: input_input_word_value=', input_input_word_value)  
//console.log('ShowWordTest: state_label_yes_no_word_value=',state_label_yes_no_word_value)
//console.log('ShowWordTest: state_label_yes_no_word_style=',state_label_yes_no_word_style)
//console.log('ShowWordTest: 1 work_arr=', work_arr) 
  

  let dispatch = useDispatch();  

//    let wrapper = document.getElementById("words_wrapper");

//words = all_words[current_number_word_group]; // one of: [SOCIETYwords(),SPORTwords(),ACCOMMODATIONwords(),APPEARANCEwords(),
                                              //PREPOSITIONSwords(),NATUREwords()]

  words = all_words[current_number_word_group]; // one of: [SOCIETYwords(),SPORTwords(),ACCOMMODATIONwords(),APPEARANCEwords(),

  
//console.log('ShowWordTest: 1 nWords=', nWords)  
//console.log('ShowWordTest: 1 state_label_next_descr_value=', state_label_next_descr_value)  

  if((current_number_word === 0) && (work_arr.length === 0) && (input_input_word_value === '') &&
      (state_label_next_descr_value === '')
    ) {
//console.log('ShowWordTest: if  current_number_word=',  current_number_word)    
      nWords = words.length;
      work_arr = wordsRandom(nWords); // array with random indexes of nWords numbers
      state_label_next_descr_value = words[work_arr[current_number_word]].D[0];//first question  sentence
      state_button_next_word_value ='Next Word 1/' + words.length + ' ' + ' >';
    }
//console.log('ShowWordTest: state_label_next_descr_value=',  state_label_next_descr_value)  
//console.log('ShowWordTest: 2 work_arr=',  work_arr)

  let style_state_button_next_descr_color             = {color: state_button_next_descr_color};
//  let work_state_input_word_value                     = state_input_word_value;
//  let style_state_label_yes_no_word_style             = {color: state_label_yes_no_word_style.color, visibility: state_label_yes_no_word_style.visibility};
  let style_state_label_answer_visibility             = {visibility: state_label_answer_visibility};
  let style_state_button_show_words_color             = {color: state_button_show_words_color};
  let style_state_label_show_words_visibility         = {visibility: state_label_show_words_visibility};
  let style_state_label_show_transcription_visibility = {visibility: state_label_show_transcription_visibility};

  let props_showDescr = {
    words:                              words,
    work_arr:                           work_arr,
    current_number_word:                current_number_word,
    state_button_next_descr_color:      state_button_next_descr_color,
    count_pick_button_show_description: count_pick_button_show_description,
    state_label_next_descr_value:       state_label_next_descr_value,
    nWords:                             nWords
  };

  let props_inputWord = {
    state_label_yes_no_word_style:      state_label_yes_no_word_style,
    words:                              words,
    work_arr:                           work_arr,
    current_number_word:                current_number_word,
    input_input_word_value:             input_input_word_value,
    state_label_next_descr_value:       state_label_next_descr_value,
    nWords:                             nWords
  };

  let props_showAnswer = {
    words:                              words,
    work_arr:                           work_arr,
    current_number_word:                current_number_word,
    count_pick_button_show_description: count_pick_button_show_description,
    state_label_next_descr_value:       state_label_next_descr_value,
    nWords:                             nWords,
    state_button_next_word_value:       state_button_next_word_value
  };  

  let props_showWord2 = {
    words:                              words,
    work_arr:                           work_arr,
    current_number_word:                current_number_word,
    count_pick_button_show_word:        count_pick_button_show_word,
    state_label_next_descr_value:       state_label_next_descr_value,
    state_label_show_words_visibility:  state_label_show_words_visibility,
    state_label_show_words_value:       state_label_show_words_value,
    state_button_show_words_color:      state_button_show_words_color,
    nWords:                             nWords,
    state_button_next_word_value:       state_button_next_word_value
  }

  let props_showTranscription = {
    current_number_word:                         current_number_word,
    state_label_show_transcription_visibility:   state_label_show_transcription_visibility,
    words:                                       words,
    work_arr:                                    work_arr,
    state_label_yes_no_word_value:               state_label_yes_no_word_value,
    state_label_answer_visibility:               state_label_answer_visibility,
    state_label_show_words_visibility:           state_label_show_words_visibility,
    nWords:                                      nWords,
    state_label_show_words_value:                state_label_show_words_value,
    state_label_next_descr_value:                state_label_next_descr_value
  };  

  let props_button_next_word = {
    words:                                                words,
    state_button_next_descr_color:                        state_button_next_descr_color,
    state_label_yes_no_word_style:                        state_label_yes_no_word_style,
    state_label_answer_visibility:                        state_label_answer_visibility,
    state_button_show_words_color:                        state_button_show_words_color,
    state_label_show_words_visibility:                    state_label_show_words_visibility,
    state_label_show_transcription_visibility:            state_label_show_transcription_visibility,
    state_label_next_descr_value:                         state_label_next_descr_value,
    state_input_word_value:                               state_input_word_value,
    state_label_yes_no_word_value:                        state_label_yes_no_word_value,
    state_label_answer_value:                             state_label_answer_value,
    state_button_next_word_value:                         state_button_next_word_value,
    current_number_word:                                  current_number_word,
    work_arr:                                             work_arr,
    nWords:                                               nWords,
    state_button_show_words_color:                        state_button_show_words_color
  };  
  
//console.log('ShowWordTest: nWords=',nWords);
//console.log('ShowWordTest: 3 work_arr=',  work_arr)

  
//console.log('ShowWordTest: state_button_next_word_value=',state_button_next_word_value);
//console.log('ShowWordTest: state_label_next_descr_value=',state_label_next_descr_value);
//console.log('ShowWordTest: count_pick_button_show_description=',count_pick_button_show_description);

  useEffect(() => {
        let id_word = 'input_input_word';  
  //console.log('current_question=',current_question);                    
        let first_word = document.getElementById(id_word);
        
  //console.log('HeaderTestsList id_test1=',id_test1);                 
        first_word.scrollIntoView(true);  
        first_word.focus();

  })//useEffect

  let FAQ_words_style = {display: 'none'};

  if(showHideWordsInstruction){
    title_button  = 'Hide instructions \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0  ▲';
    words_instructions_visibility = {display: 'block'} 
  } else {
    title_button  = 'Show instructions  \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 ▼';
    words_instructions_visibility = {display: 'none'} 
  } 

  let current_number_word_plus_1 = (current_number_word + 1) + ' of ' + nWords;

  let wordTopic = <div id='wordTopic'>
    <div className="boldStyle">{words_files[current_number_word_group]}</div>
    <div>{current_number_word_plus_1}</div> 
    <hr />
    <button id="words_instructions_button" onClick=
            {() => dispatch({   type: 'ShowWordTest_instructions', 
                                payload: {
                                  showHideWordsInstruction: !showHideWordsInstruction
                                }
                          })  
            }
    >{title_button}</button>
    <div className='FAQ_words' style={words_instructions_visibility}>
      <div id='sentence_1'> Enter the root word in the "Type the root word here" box, that matches the sentence which corresponds to the sentence (sometimes in place of "____").</div>
      <div id='sentence_2'>Use buttons:</div>
      <div id='other_sentences'>
        <div ><span className="boldStyle">Next Drscription</span> - this is a new description of the desired word. There are several descriptions. < br /></div>
        <div ><span className="boldStyle">Check</span> - this allows you to check the correctness of the entered word. < br /></div>
        <div ><span className="boldStyle">Show Answer</span> - shows the complete sentence with the correct word.< br /></div>
        <div ><span className="boldStyle">Show Words</span>- shows only the correct word with the part of speech.< br /></div>
        <div ><span className="boldStyle">Show Transcription</span> - shows the transcription of this word.< br /></div>
        <div ><span className="boldStyle">Next Word</span> - shows the dialog menu for the next word.< br /></div>
      </div>
    </div>
    <hr className='class_line' />
  </div>


  let nextDescription = (count_pick_button_show_description + 1) + '/' + words[work_arr[current_number_word]].D.length + ' >';// + current_number_word + '/' + nWords;

  let currentWord = count_pick_button_show_word;

  if(currentWord === 0) currentWord++;

  if(currentWord > words[ work_arr[current_number_word]].W.length) currentWord = words[ work_arr[current_number_word]].W.length;

  let numberWords = ' ' + currentWord + '/' + words[ work_arr[current_number_word]].W.length +  ' >';
/*
  if(current_number_word > 0) {
    wordTopic = <div lassName='wordTopic'>
      <div className="boldStyle">{words_files[current_number_word_group]}</div>
      <div>{current_number_word_plus_1}</div> 
      <hr />
      <br />     
    </div>;
  } 
*/
  let show_Word = (
      <div className='body_words'>
        {wordTopic}
        <div id="words">

          <div id="descr">		

            <button id="button_show_descr" style={style_state_button_next_descr_color}
              onClick = {() =>    dispatch({  type: 'ShowWordTest_showDescr', 
                                    payload: showDescr({props_showDescr})
                                  })
                        }      
            >
              Next Description {nextDescription}
            </button>

            <label id="label_descr">{state_label_next_descr_value}</label>
          </div>				

          <div id="input_word">
            <input id="input_input_word" autoFocus placeholder="Type the root word here"  type="text" value={input_input_word_value} 
                onChange =  {event => {
                              dispatch({    type: 'ShowWordsTest_input_input_word', 
                                    payload: {input_input_word_value:       event.target.value,
                                              work_arr:                     work_arr,
                                              state_label_next_descr_value: state_label_next_descr_value,
                                              state_button_next_word_value: state_button_next_word_value,
                                              nWords:                       nWords,
                                              checkStyle:                   {backgroundColor: 'rgba(154,136,112,1)', cursor: 'pointer'}
                                    }
                              })
                            }}            
            />
            <button id="button_input_word" style = {checkStyle}
              onClick=  {() =>  { dispatch({   type: 'ShowWordsTest_button_input_word', 
                                              payload: inputWord({props_inputWord})
                                  })

                                }
                        }         
            >
              Check
            </button>

            <label id="label_yes_no_word" style={state_label_yes_no_word_style}>{state_label_yes_no_word_value}</label>
          </div>	
          
          <div id="answer">		
            <button id="button_show_answer"  style={style_state_label_answer_visibility}  
              onClick=  {() =>  dispatch({  type: 'ShowWordsTest_showAnswer', 
                                            payload: showAnswer({props_showAnswer})
                                          })
                        }              
            >                            
              Show Answer
            </button>
            <label id="label_answer">{state_label_answer_value}</label>
          </div>	
        
          <button id="button_show_words" style={style_state_button_show_words_color} 
            onClick=  {() =>  dispatch({  type: 'ShowWordsTest_showWord2', 
                                          payload: showWord2({props_showWord2})
                                      })
                      }         
          >
            Show Word {numberWords}
          </button>
          <label id="label_words"  style={style_state_label_show_words_visibility}>{state_label_show_words_value}</label>
          
          <button id="button_show_transcription"  
            onClick=  {() =>  dispatch({  type: 'ShowWordsTest_showTranscription', 
                                          payload: showTranscription({props_showTranscription})
                                      })
                      }                     
          >
            Show Transcription
          </button>
          <label id="label_transcription" style={style_state_label_show_transcription_visibility}>{state_label_show_transcription_value}</label>					
          
        </div>

      <button id="button_next_word"  
        onClick= {() =>   dispatch({  type: 'ShowWordsTest_button_next_word', 
                                      payload: nextWord({props_button_next_word})
                          })
        }                     
        
      >
        {state_button_next_word_value}
      </button>
        
      </div>
  );     

  const el = document.getElementById('words_wrapper');
  el.scrollIntoView({block: "start", behavior: "smooth"});

  return show_Word;
  
}//---end of ShowWordTest    
