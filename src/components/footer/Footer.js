//Footer.js- site footer -----------------

import React from "react"

import { useSelector, useDispatch } from 'react-redux';

import './Footer.css';

//import {formLetter}        from "../formLetter/formLetter.js";

import electronicMail  from "./email.png";

//let formLetterFunc = formLetter();
//console.log('formLetterFunc = ', formLetterFunc);

let mailFormStyle = null;

export function Footer() {
//  console.log('FooterSite----------------------');

  function checkEmail(){
//console.log('Footer: checkEmail');    
  }

  let dispatch = useDispatch();  

  const mailFormStyle           = useSelector((store) => store.mailFormStyle);

  window.location.hash = 'London_bgr';
  return (
    <footer className="footer_site">
      <div id='emailForm' style={mailFormStyle}>
          <br />
          Your Email:
          <br />
          <input id='inputEmail' type='text' size='19' autoFocus name='contactEmail' onClick={checkEmail} />
          <br />
          <br />
          Message:
          <br /> 
          <textarea id='contactComment' name='contactComment' rows='6' cols='20'></textarea>
          <br />
          <br /> 
          <input id="statistics_submit"  type="submit" value="SEND" 
                      onClick =    {() => {   dispatch({  type: 'FooterEmail', 
                      payload: {
                        contactEmail:     document.getElementById('inputEmail').value,
                        contactComment:   document.getElementById('contactComment').value,
                        mailFormStyle:    {display: 'none'}
                                }
                                                      });

                                          }
                                  }                                      
          />
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
                                                  }
                                                })
                                              } 
        >email me</a>
      </div>
    </footer>
  )
}// Footer

