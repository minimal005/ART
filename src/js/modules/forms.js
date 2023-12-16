import {postData} from '../services/requests';


const forms = () => {
    const form = document.querySelectorAll('form'),
    // потрібне для очистки всіх input після відправки form
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name="upload"]'),
        textareas = document.querySelectorAll('textarea')

        // checkNumInputs('input[name="user_phone"]')

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };
    
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        })
        textareas.forEach(item => {
            item.value = ''
        })

        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не обрано'
        })
    }

    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0]);

            // перевіряємо довжину имені зображення(щоб не поламало верстку)
            let dots;
            const arr = item.files[0].name.split('.');

            arr[0].length > 6 ? dots = "..." : dots = '.';

            // формуємо ім'я
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        })
    })

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            let price = document.querySelector('.calc-price');

            const formData = new FormData(item);
            if(item.getAttribute('data-calc') === 'price'){                                 

              formData.append("price", price.textContent);                     

 }

            // api для створення динамічного шляху, куди ми все будемо відправляти
            let api;
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
            console.log(api);
                    
            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                    }, 5000);
                });
        });
    });
};

export default forms