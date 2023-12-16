const modals = () => {

    //Кнопка, яка відстежує, чи була натиснена хоч якась кнопка, що виликає модалку
    let btnPressed = false;

    // triggerSelector - кнопка або посилання trigger, на якому спрацьовує подія 
    // modalSelector - модальне вікно, яке відкривається
    // closeSelector - кнопка-хрестик
    // closeClickOverlay - редагуємо, чи треба закривати модалку при кліку на підложку

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),

                // Цей атрибут треба в верстці встановити всім модальним вікнам
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();

            trigger.forEach(item => {
                item.addEventListener('click', (e) => {
                    if (e.target) {
                        e.preventDefault();
                    }
    
                    btnPressed = true;
                // подарунок(трігер) зникає при виклику модалки
                if (destroy) {
                    item.remove();
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');
                })

                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`;
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
        });


        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = "none";
                document.body.style.overflow = ""; 
                document.body.style.marginRight = `0px`;
            }
        });
    }

    // функція показу модального вікна через певний час, але якщо якесь вікно відкрито, то модалка не з'являється
    function showModalByTime(selector, time) {
        setTimeout(function() {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = "block";
                }
            });

            if (!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = "hidden";
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
            }
        }, time);
    }

    // функція для розрахунку бічного скролу
    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }


        // розрахунок, чи користувач долистав до кінця сторінки і не обрав жодний трігер
        function openByScroll(selector) {
            window.addEventListener('scroll', () => {

                // оптимізація під старі браузери, які не зчитують 'document.documentElement.scrollHeight'
                let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

                if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
                    document.querySelector(selector).click();
                }
            });
        }
    
        bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
        bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
        bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
        openByScroll('.fixed-gift');
        // showModalByTime('.popup-consultation', 5000);
    };
    function closeAllModal() {
        document.querySelectorAll('[data-modal]').forEach(item => {
            item.style.display = 'none';
            item.classList.add('animated', 'fadeIn');
    
        });
    }
    export { closeAllModal };
    export default modals