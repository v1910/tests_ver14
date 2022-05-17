//Check inputed email address

export function checkEmail(props){ // ------------------
    
//console.log('checkEmail: props=',props)
    //console.log('1 HeaderTests:  list_tests_wrapper=',list_tests_wrapper);        

    //Check correction of the email address
    let emailText               = props;
    let error                   = null;
    let correctSymbolEmail      = ['!','#','$','%','`','*','+','-','/','=','?','^','_','{','|','.'];
    let numbers                 = ['0','1','2','3','4','5','6','7','8','9'];
    let upperLetters            = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let lowercaseLetters        = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    let nameEmail               = null;
    let domainNameEmail         = null;
    let posAGot                 = null;
    let nameEmailLength         = null;
    let domainNameEmailLength   = null;   

    if((emailText !== null) && (emailText !== '')){// email is not empty

        let emailTextLength     = emailText.length;

//    console.log('checkEmail: emailText=',emailText);
//    console.log('checkEmail: emailTextLength=',emailTextLength);

        if(emailTextLength > 64) error = 'Email address is longer than allowed (64). Please correct it'
        else {
        posAGot = emailText.indexOf('@');
        nameEmail = emailText.slice(0,posAGot);
//console.log('checkEmail: nameEmail=',nameEmail);        
        if(posAGot === -1) error = 'You have lost the "@" symbol. Please insert please.'
        else {
            let subStr = emailText.substring(posAGot+1);
            if(subStr.indexOf('.') === -1) error = 'You have lost the "." symbol in your domain name. Please insert please.'

            //first part of email
            nameEmailLength = nameEmail.length;
            for(let i = 0; i < nameEmailLength; i++){
            if( ( lowercaseLetters.includes(nameEmail[i])   ) || //numbers
                ( numbers.includes(nameEmail[i])            ) || //upper letters
                ( upperLetters.includes(nameEmail[i])       ) || //lowercase letters
                ( correctSymbolEmail.includes(nameEmail[i]) ) 
              ){
//console.log('checkEmail: nameEmail.charCodeAt(i)=',nameEmail[i]);
                    if(i > 0){
                        if ( (correctSymbolEmail.includes(nameEmail[i])) && (correctSymbolEmail.includes(nameEmail[i-1]))
                        ){
                            if((nameEmail.charCodeAt(i-1) === nameEmail.charCodeAt(i))
                            ){
                            error = 'There are 2 symbols in a row "'+ nameEmail[i] + '". Please correct it.'
                            }
                        }
                    }
                }
                else{
//console.log('checkEmail: 2 nameEmail.charCodeAt(i)=',nameEmail[i]);                    
                error = 'You have used incorrect symbol: "'+ nameEmail[i] + '". Please correct it.'
//console.log('checkEmail: 1 error=',error);                 
                }
            }//for

            //second part of email (after @)
            domainNameEmail       = emailText.slice(posAGot+1,emailText.length);        
            domainNameEmailLength = domainNameEmail.length;
//console.log('checkEmail: domainNameEmail=',domainNameEmail);        
            for(let i = 0; i < domainNameEmailLength; i++){
            if( ( lowercaseLetters.includes(domainNameEmail[i])   ) || //numbers
                ( numbers.includes(domainNameEmail[i])            ) || //upper letters
                ( upperLetters.includes(domainNameEmail[i])       ) || //lowercase letters
                ( correctSymbolEmail.includes(domainNameEmail[i]) ) 
              ){
                    if(i > 0){
                    if ( (domainNameEmail[i] === '.') && (domainNameEmail[i-1] === '.'))
                    {
                        error = 'There are 2 symbols in a row "'+ domainNameEmail[i] + '". Please correct it.'
                    }
                    if ( (domainNameEmail[i] === '-') && (domainNameEmail[i-1] === '-'))
                    {
                        error = 'There are 2 symbols in a row "'+ domainNameEmail[i] + '". Please correct it.'
                    }
                    }
                }
                else{
                error = 'You have used incorrect symbol: "'+ domainNameEmail[i] + '". Please correct it.'
//console.log('checkEmail: 2 error i =',error, ' ',i);                                 
                }
            }//for        
    //console.log('mouseLeaveList: error=',error);        
            
        }
        }
    }else {
        error = 'You did not enter your email address. Please enter it.'
    }
    if( (error !== null) && (emailText[emailText.length-1] === '.') ){
        error = 'There must be a character after the dot. Please correct it.';
    }
//console.log('checkEmail: 3 error=',error);     
    return {
            inputEmailValue:     props.inputEmailValue,
            errorEmailText:      error
           };

}// end of checkEmail