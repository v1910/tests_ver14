//Header.js---------------------------

import React from "react";
import { useSelector } from 'react-redux';

import {HeaderTests} from "../headerTests/HeaderTests.js";
import {HeaderWords} from "../headerWords/HeaderWords.js";
import {HeaderListen} from "../headerListen/HeaderListen.js";
import {HeaderPhrases} from "../headerPhrases/HeaderPhrases.js";
import {HeaderJokes} from "../headerJokes/HeaderJokes.js";
import {HeaderStatistics} from "../headerStatistics/HeaderStatistics.js";

import  "./Header.css";

//let showHideTest = null;

export function  Header() {  
//  console.log('Header---');

//let showHideTest        = useSelector((store) => store.showHideTest);

    return ( 
      <div class="header_header pointer" name="home">
        <HeaderTests />
        <HeaderWords />
        <HeaderListen />
        <HeaderPhrases />
        <HeaderJokes />
        <HeaderStatistics />
     </div>
    )//return

}//end of Header-----------
