import { postDate } from "../services/requests";

const forms = (costPicture) => {
	const forms = document.querySelectorAll('form'),
		input = document.querySelectorAll('input'),

		message = {
			loading: 'Загрузка...',
			succses: 'Спасибо мы скоро с вами свяжемся',
			fail: 'Что-то пошло не так...',
			spinner: 'assets/img/spinner.gif',
			ok: 'assets/img/ok.png',
			failure: 'assets/img/fail.png',
		};
	const textArea = document.querySelector('textarea[name="message"]');
	const fileInput = document.querySelectorAll('input[type="file"]');// всі інпути  в які завантажуються картинки
	const fileLoad = document.querySelectorAll('.file_upload > div'); // блок куди записується імя завантажуваного файла 
	const size = document.querySelector('#size');
	const material = document.querySelector('#material');
	const options = document.querySelector('#options');
	const resultSumCalc = document.querySelector('.calc-price');

	fileInput.forEach((item, i) => {
		item.addEventListener('input', () => {
			// console.log(item.files);
			const fileName = item.files[0].name.split('.');//сторюється масив з двох елементів :назва картинки і розширення
			let dots;
			fileName[0].length > 5 ? dots = '...' : dots = '.';
			const name = fileName[0].slice(0, 6) + dots + fileName[1];
			fileLoad[i].textContent = name;
		});
	});
	const path = {
		designer: 'assets/server.php',
		question: 'assets/question.php'
	};
	const clearInputs = () => {
		input.forEach(item => {
			item.value = '';
		});
		fileLoad.forEach(item => {
			item.textContent = 'Файл не выбран';
		});
		textArea.value = '';
		size.selectedIndex = 0;
		material.selectedIndex = 0;
		options.selectedIndex = 0;
		resultSumCalc.textContent = 'Для расчета нужно выбрать размер картины и материал картины';
	};

	forms.forEach(form => {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const statusMessage = document.createElement('div');

			statusMessage.classList.add('status');
			form.parentNode.appendChild(statusMessage);
			form.classList.add('animated', 'fadeOutUp');
			setTimeout(() => {
				form.style.display = 'none';
			}, 300);
			let statusImg = document.createElement('img');
			statusImg.setAttribute('src', message.spinner);
			statusImg.classList.add('animated', 'fadeInUp');
			statusMessage.appendChild(statusImg);
			let textMessage = document.createElement('div');
			textMessage.textContent = message.loading;
			statusMessage.appendChild(textMessage);

			const formDate = new FormData(form);
			let api;
			form.closest('.popup-design') ? api = path.designer : api = path.question;
			if (form.closest('.calc')) {
				api = path.designer;
				for (let key in costPicture) {
					formDate.append(key, costPicture[key]);
				}
			}
			postDate(api, formDate)
				.then(res => {

					console.log(res);
					statusImg.setAttribute('src', message.ok);
					textMessage.textContent = message.succses;
				}).catch(er => {

					statusImg.setAttribute('src', message.failure);
					textMessage.textContent = message.fail;
				}).finally(() => {

					clearInputs();
					setTimeout(() => {
						statusMessage.remove();
						form.style.display = 'block';
						statusImg.classList.remove('fadeInUp');
						statusImg.classList.add('fadeOutUp');
						form.classList.remove('fadeOutUp');
						form.classList.add('fadeInUp');
					}, 3000);
				});
		});
	});

};
export default forms;