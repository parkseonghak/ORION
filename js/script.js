
        // scroll start

        const btnContainer = document.querySelector('.circle-container');
        const sliderContainer = document.querySelector('.main-slider-container');
        const sliderBigContainer = document.querySelector('.slider-big-container');
        const sliderWidth = sliderBigContainer.clientWidth;
        const sliderLength = sliderContainer.childElementCount;
        
        const filterView = document.querySelectorAll('.filter-area');

        const headerScrollStop = document.querySelector('.header-container');


        let index = 0;

        headerScrollStop.addEventListener('mousewheel', (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        })

        window.addEventListener('keydown', (e) => {
            console.log(e.key);
            if(e.key === ' ' || e.key === 'ArrowUp' || e.key ==='ArrowDown'){
                e.preventDefault();
            }
        })

        const elm = document.querySelectorAll('section');
        const elmCount = elm.length;
        let moveCheck = true;
        elm.forEach(function(item, page){
            item.addEventListener('mousewheel', function(event){
                event.preventDefault();
                let delta = 0;
                console.log(moveCheck);
                if (!event) event = window.event;
                if (event.wheelDelta) {
                delta = event.wheelDelta / 120;
                if (window.opera) delta = -delta;
                } 
                else if (event.detail)
                delta = -event.detail / 3;

                let moveTop = window.scrollY;
                let elmSelector = elm[page];

                // wheel down : move to next section
                if (delta < 0){
                    if(moveCheck){
                        moveCheck = false;
                        if (elmSelector !== elmCount-1){
                            try{
                            moveTop = window.pageYOffset + elmSelector.nextElementSibling.getBoundingClientRect().top;

                            if(sliderContainer.getBoundingClientRect().top === 0 && index === 2) {
                                console.log('wow');
                                removeFilter();
                            }
                            window.scrollTo({top:moveTop, left:0, behavior:'smooth'});
                            
                            }catch(e){}
                        }
                        setTimeout(() => {
                            moveCheck = true;
                        }, 1000);
                    }
                }
            // wheel up : move to previous section
                else{
                    if(moveCheck){
                        moveCheck = false;
                        if (elmSelector !== 0){
                        try{
                            moveTop = window.pageYOffset + elmSelector.previousElementSibling.getBoundingClientRect().top;

                            if(sliderContainer.getBoundingClientRect().top === -969 && index === 2) {
                                console.log('wow');
                                insertFilter();
                            }
                            window.scrollTo({top:moveTop, left:0, behavior:'smooth'});
                            
                            
                        }catch(e){}
                        }
                        setTimeout(() => {
                            moveCheck = true;
                        }, 1000);
                    }
                }

                
                

            
                
                

            });
        });
        const footerWheel = document.querySelector('footer');
        footerWheel.addEventListener('mousewheel', (e) => {
            e.preventDefault();
            if(e.wheelDelta === 120){
                if(moveCheck){
                    moveCheck = false;
                    window.scrollTo({top:window.pageYOffset-969, left:0, behavior:'smooth'});
                    setTimeout(() => {
                        moveCheck = true;
                    }, 1000);
                };
            };
        });
        const topButton = document.querySelector('.scroll-top-move-btn');
        
        topButton.addEventListener('click', (e) => {
            if(moveCheck){
                moveCheck = false;
                window.scrollTo({top:0, left:0, behavior:'smooth'});
                setTimeout(() => {
                    moveCheck = true;
                }, 1000);
            };
        });

        // scroll fin


        // section01 start





        for(let j = 0; j < sliderLength; j++){
            const makeCircle = document.createElement('div');
            makeCircle.classList.add('circle');
            btnContainer.appendChild(makeCircle);
            btnContainer.children[j].addEventListener('click', ()=>{
                index = j
                moveSlide(1);
                clearInterval(interval);
                interval = setInterval(() => {
                    next();
                }, 5000);
            })
        }
        
        const first = sliderContainer.firstElementChild.cloneNode(true);
        
        sliderContainer.appendChild(first);
        
        sliderContainer.style.width = sliderContainer.childElementCount * sliderWidth + 'px';
        btnContainer.children[0].classList.add('active');
    

        let interval = setInterval(() => {
            next();
        }, 5000);
        interval;


        function updateButton(){
            for(let i = 0; i < sliderLength; i++){
                btnContainer.children[i].classList.remove('active');
                if(index === i){
                    btnContainer.children[i].classList.add('active');
                }else if(index === sliderLength){
                    btnContainer.children[0].classList.add('active');
                }
            }
            updateFilter();
        }
        function updateFilter(){
            if(sliderContainer.getBoundingClientRect().top === 0 && index ===2){
                insertFilter()
            }else{
                removeFilter()
            }
        }
        
                function insertFilter() {
                    for(let i = 0 ; i < filterView.length; i++){
                        filterView[i].classList.add('filter-invert');
                     }
                }
        
                function removeFilter() {
                    for(let i = 0 ; i < filterView.length; i++){
                        filterView[i].classList.remove('filter-invert');
                    }
                }

        function moveSlide(time){
            sliderContainer.style.transition = time + 's'
            sliderBigContainer.children[0].style.transform = 'translateX(-' + ((index)*1920) + 'px)';
            updateButton();
        }

        function next(){
            index++;
            moveSlide(1);
            setTimeout(()=>{
                    if(index === sliderContainer.childElementCount-1){
                        index = 0;
                        moveSlide(0);
                    };
                }, 1000);
        };

// 01 section fin

// 02 section start

    const vdo = document.querySelectorAll('video');
    const productBtn = document.getElementsByClassName('choose-product');

    Array.from(productBtn).forEach((item, i) => {
        productBtn[i].addEventListener('click', (e)=>{
            Array.from(vdo)[i].classList.remove('pause-video');
            Array.from(vdo).filter(el => el !== vdo[i]).forEach(el => el.classList.add('pause-video'));
        });
    });

// 02 section fin

// 04 section start

    const modify = document.querySelectorAll('.modify');
    const aboutOrion = document.getElementsByClassName('about-orion');
    const hideSection = document.querySelectorAll('.hide-section');
    const headerSection = document.querySelector('.header-section');

    Array.from(modify).forEach((item, i) => {
        modify[i].addEventListener('click', (e) => {

            if(!modify[i].classList.contains('modify') && !modify[i].classList.contains('hide-section')) {
                for (let j = 0 ; j < modify.length; j ++){
                    modify[j].classList.remove('hide-section');
                    modify[j].classList.add('modify');
                }
            }else {
                Array.from(modify)[i].classList.remove('modify');
                Array.from(modify).filter(el => el !== modify[i]).forEach(el => el.classList.remove('modify'));
                Array.from(modify).filter(qw => qw !== modify[i]).forEach(qw => qw.classList.add('hide-section'));
                modify[i].classList.remove('hide-section');
            }
        });
    });

// 04 section fin

// 05 section start

    const globalBtn = document.querySelectorAll('.global-btn');
    const worldOrion = document.querySelectorAll('.world-orion');
    const hideLocation = document.querySelectorAll('.hide-location');
    const worldLocation = document.querySelectorAll('.world-location');

    Array.from(globalBtn).forEach((item, i) => {
        globalBtn[i].addEventListener('click', (e) => {
            worldOrion[i].classList.remove('hide-global');
            Array.from(worldOrion).filter(el => el !== worldOrion[i]).forEach(el => el.classList.add('hide-global'));
            worldLocation[i].classList.remove('hide-location');
            Array.from(worldLocation).filter(qw => qw !== worldLocation[i]).forEach(qw => qw.classList.add('hide-location'));
        });
    });

// 05 section fin




// footer start



    const familySiteBtn = document.querySelector('.family-site-button');
    const familySiteList = document.querySelector('.family-site');
    let opacityCheck = true;
    familySiteBtn.addEventListener('click', (e) => {
        if(opacityCheck){
            familySiteList.style.opacity = '1';
            opacityCheck = false;
        }else{
            familySiteList.style.opacity = '0';
            opacityCheck = true;
        };
    });

// footer fin