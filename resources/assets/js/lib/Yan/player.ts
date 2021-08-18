export default () => {
    // if (window.location.href.indexOf('/post/') != -1) { // or anything
        let selectPlayer = document.querySelector('.player__choice-list');
        let label = document.querySelector('.player__choice-list-label');
 

        // let startFontSize = 10;

        // let loop = setInterval(()=>{
        //     console.log('loop');

        //     if(!document.querySelector('.player__choice-list-cont')){
        //         clearInterval(loop);
        //     } else{
        //         let playerChoice: any = document.querySelector('.form-control');
        //         let marginFromLeftScreen = playerChoice.getBoundingClientRect().x
        //             || playerChoice.getBoundingClientRect().left
        //             || 0 ;
    
        //         if( playerChoice.clientWidth + marginFromLeftScreen >= window.innerWidth  ){
        //             playerChoice.style.fontSize = (--startFontSize / 10) + "em";
        //         } else {
        //             clearInterval(loop);
        //         }
        //     }
        // }, 50);


        if (!selectPlayer) {
            return;
        }

        
        selectPlayer.addEventListener('change', function () {
            setDefaultPos(label);
            setTimeout(() => {
                label.innerHTML = this.value;
                animate(label);
            }, 400)
        });
    // }

    function setDefaultPos(node) {
        node.style.bottom = '0px';
        node.style.left = '35px';
        node.style.opacity = 0;
    }

    function animate(node) {
        node.style.bottom = '40px';
        node.style.left = '0px';
        node.style.opacity = 1;
    }
}