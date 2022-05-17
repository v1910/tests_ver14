//Footer.js- site footer -----------------

import React from "react"

import { useSelector, useDispatch } from 'react-redux';

import './Footer.css';

import {checkEmail}    from "../checkEmail/checkEmail.js";

import electronicMail  from "./email.png";


let errorEmailText  = null;
let inputEmailValue = null;
let styleSendOK     = null;
let opacityOK       = 1;
let timeId          = null;

export function Footer() {
//  console.log('FooterSite----------------------');

  function sendEmail(){// opacity of sending the letter
//console.log('sendEmail-----------------')  

    dispatch({  type: 'FooterEmail', 
      payload: {
        contactEmail:     document.getElementById('inputEmail').value,
        contactComment:   document.getElementById('contactComment').value,
        mailFormStyle:    {display: 'none'},
        styleSendOK:      {display: 'block'}
      }
    });

    if(timeId !== null) clearInterval(timeId);

    timeId = setInterval(()=>{
      opacityOK = opacityOK - 0.1;
      if(opacityOK > 0){
        styleSendOK = {display: 'block', opacity: opacityOK};
      } else {
        styleSendOK = {display: 'none'};
      }

      dispatch({  type: 'footerOpacityOK', 
        payload: { styleSendOK:  styleSendOK }
      });

    }, 1000);

    setTimeout(()=>{ 
      clearInterval(timeId); 
      dispatch({  type: 'footerOpacityOK', 
        payload: { styleSendOK: {display: 'none'} }
      });
    }, 4000);
  
  }// end of sendEmail

  function onClickTextArra(){// focus for the textArea
//console.log('onClickTextArra')      
    document.getElementById('inputEmail').blur();
    document.getElementById('contactComment').focus();
  }// end of onClickTextArra

  const mailFormStyle    = useSelector((store) => store.mailFormStyle);
  errorEmailText         = useSelector((store) => store.errorEmailText);
  inputEmailValue        = useSelector((store) => store.inputEmailValue);
  styleSendOK            = useSelector((store) => store.styleSendOK);  

  let dispatch = useDispatch();  

  window.location.hash = 'London_bgr';

  return (
    <footer className="footer_site">
      <div id='sendOK' style= {styleSendOK}>
        Your letter was received.
      </div>
      <div id='emailForm' name='mailForm' style={mailFormStyle}>
          <br />
          Your Email:
          <br />
          <input id='inputEmail' type="email" size='19' placeholder="your_email@your_domain"
            title='Type your email address here!' value={inputEmailValue} 
            autoFocus name='contactEmail'
            onBlur={event => {
                                dispatch({    type: 'footerInputEmail', 
                                    payload: checkEmail(event.target.value)
                                })
                    }}            
          /> 
          <br />
          <div id='errorEmail'>{errorEmailText}</div>
          <br />
          Message:
          <br /> 
          <textarea id='contactComment' name='contactComment' onClick={onClickTextArra} rows='6' cols='20' ></textarea>
          <br />
          <br /> 
          <button id="emailSubmit"  type="submit" onClick={sendEmail} >
            SEND
          </button>
          <br />
      </div>
      <br />
      <hr />
      <p>Designed by Volodymyr Kokhanovskyi</p>
      <div id='electronicMail'>
        <img id='imgElectronicMail' src={electronicMail}/>
        <a id='aFormLetter' href="#mailForm" 
                                              onClick =    {() => dispatch({  type: 'Footer', 
                                                  payload: {
                                                    mailFormStyle:        {display: 'block'}, 
                                                    showHideTest:       'showHideStatistics',
                                                    showHideWords:      'showHideStatistics',                                showHideListen:'showHideStatistics',                                                                                  
                                                    showHidePhrases:    'showHideStatistics',    
                                                    showHideJokes:      'showHideStatistics',
                                                    showHideStatistics: 'showHideStatistics',
                                                    list_tests_wrapper: false,
                                                    list_words_wrapper: false,
                                                    list_listen_wrapper:false,
                                                    phrases:            '',
                                                   statistics_wrapper_visibility: {display: 'none'}                                                    
                                                  }
                                                })
                                              } 
        >email me</a>
      </div>
    </footer>
  )

}// Footer

