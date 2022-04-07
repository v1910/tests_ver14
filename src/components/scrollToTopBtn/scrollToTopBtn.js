// scrollToTopBtn.js - insert scrolling button  to the page top 

/*
//Get the button
let scrollToTopBtn = document.getElementById('scrollToTopBtn');
console.log('scrollToTopBtn =',scrollToTopBtn);

//When the user scroll down for 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if(document.body.scrollTop > 100 || document.documentElement.scrolling > 100) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
}//end of scrollFunction


//When the user clicks on the button, scroll to the top of the document
function topFunction(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}//end of topFunction


function scrollToTop{
    //scroll to top logic
    rootElement.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}//end of scrollToTop

scrollToTopBtn.addEventListener('click', scrollToTop)


#scrollToTopBtn{
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    font-size: 16px;
    line-hight: 48px;
    width: 48px;
}

<button id='scrollToTopBtn'>Home</button>

html{
    scroll-behavior: smooth;
}

*/

export function scriptScrollToTopBtn(){
    let target = document.querySelector('footer');

    let scrollToTopBtn = document.querySelector('.scrollToTopBtn');

    let rootElement = document.documentElement;


    function callback(entries, observer){
        // The callback will return an array of entries, even if you are observing a single item
        entries.forEach(entry => {
            if (entry.isIntersecting){
                //show button
                scrollToTopBtn.classList.add('showBtn');
            } else {
                //Hide button
                scrollToTopBtn.classList.remove('showBtn');
            }
        });
    }//end of callback

    function scrollToTop(){
        rootElement.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    scrollToTopBtn.addEventListener('click', scrollToTop);

    let observer = new IntersectionObserver(callback);

    observer.observe(target);

}//end of scriptScrollToTopBtn

//<a href='#top'>Home</a>



