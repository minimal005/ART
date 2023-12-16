const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
          items = menu.querySelectorAll('li'),
          wrapper = document.querySelector('.portfolio-wrapper'),
          markAll = wrapper.querySelectorAll('.all'),
          no = document.querySelector('.portfolio-no')

    menu.addEventListener('click', (e) => {
        const target = e.target.closest('li')
        let className
        
        if(!target) return
        else {
            hiddenBlock()

            items.forEach(btn => {
                btn.classList.remove('active')
                className = target.className
            });
            
            target.classList.add('active');
            showBlock(className)
            }
    })

    function hiddenBlock() {
        markAll.forEach(elem => {
            elem.style.display = 'none'
            elem.classList.remove('animated', 'fadeIn');
        })
        no.style.display = 'none';
        no.classList.remove('animated', 'fadeIn')
    }

    function showBlock(elemClass) {
        let active = false
        markAll.forEach(elem => {
            if(elem.classList.contains(elemClass)){
                active = true
                elem.style.display = 'block'
                elem.classList.add('animated', 'fadeIn');
            } 
        })
        if(active == false){
            no.style.display = 'block';
            no.classList.add('animated', 'fadeIn');
        }
    }
};

export default filter;