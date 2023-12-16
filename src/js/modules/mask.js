const mask = (selector) => {
	function setCursorPosition(pos, elem) {
		elem.focus(); //вручну встановлюється focus на  інпуті
		if (elem.setSelectionRange) {
			elem.setSelectionRange(pos, pos);
		}
		else if (elem.createTextRange) {// для IE
			let range = elem.createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	}
	function createMask(event) {
		let matrix = '+7 (___) ___ __ __';
		let i = 0;
		let def = matrix.replace(/\D/g, '');
		let val = this.value.replace(/\D/g, ''); //  видаляє з введденого текста все що не є цифрою, і результат записується в перемінну val
		if (def.length >= val.length) {// встановлюється значаення по дефолту, коли користувач клікнув на інпут і не дозволяє видалити +7
			val = def;
		}

		this.value = '+7 (___) ___-__-__'.replace(/./g, function (a) { //код Івана
			return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
		});

		if (event.type === 'blur') {
			if (this.value.length == 2) {//блок кода який спрацьовує коли інпут втрачає фокус і довжина поля інпут  == 2 тобто користувач ще сам нічого не ввів , то інпут повністю очищається
				this.value = '';
			}
		} else {// блок кода яки й встановлює курсор в потрібному місці
			setCursorPosition(this.value.length, this);
		}
	}
	const inputs = document.querySelectorAll(selector);
	inputs.forEach(input => {
		input.addEventListener('input', createMask);
		input.addEventListener('focus', createMask);
		input.addEventListener('blur', createMask);
		input.addEventListener('click', createMask);
	});
};
export default mask;