const sliders = (slides, dir, prev, next) => {
// dir - відповідає за те, вертикальний чи горизонтальний слайдер

    // поточний слайд
    let slideIndex = 1,
        paused = false // змінна, яка вказує, чи потрібно в даний момент віключити перемикання слайдів, наприклад якщо користувач знаходиться на цьому блоці

    const items = document.querySelectorAll(slides)
        
    function showSlides(n){
        if (n > items.length) slideIndex = 1

        if (n < 1) slideIndex = items.length

        items.forEach(item => {
            item.classList.add('animated')
            item.style.display = 'none'
        })

        items[slideIndex - 1].style.display = 'block'
    }

    showSlides(slideIndex)

    function plusSlides(n){
        showSlides(slideIndex += n)
    }

    // Обробляємо помилки, якщо не передано значення 'prev, next', оскільки один слайдер у нас не має цих кнопок
    try {
        const prevBtn = document.querySelector(prev),
            nextBtn = document.querySelector(next)

            prevBtn.addEventListener('click', () => {
                plusSlides(-1)
                items[slideIndex - 1].classList.remove('slideInLeft') // це анімація
                items[slideIndex - 1].classList.add('slideInRight') // це анімація

            })
            nextBtn.addEventListener('click', () => {
                plusSlides(1)
                items[slideIndex - 1].classList.remove('slideInRight') // це анімація
                items[slideIndex - 1].classList.add('slideInLeft') // це анімація
            })
    } catch (e) {}

    function activateAnimation() {
        if(dir === 'vertical') {

            // для розрахунку, який саме setInterval працює в момент, коли користувач навів на нього мишкою
            paused = setInterval(function() {
                plusSlides(1)
                items[slideIndex - 1].classList.add('slideInDown') // це анімація
            }, 3000);
        } else {
            paused = setInterval(function() {
                plusSlides(1)
                items[slideIndex - 1].classList.remove('slideInRight') // це анімація
                    items[slideIndex - 1].classList.add('slideInLeft') // це анімація
            }, 3000);
        }
    }

    activateAnimation()

    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused)
    })
    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation()
    })
}

export default sliders