"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // Tab
    const tabHeaderItems = document.querySelector(".tabheader__items"),
        tabHeaderItem = document.querySelectorAll(".tabheader__item"),
        tabContent = document.querySelectorAll(".tabcontent");

    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove('show', 'fade');
        });

        tabHeaderItem.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {
        tabHeaderItem[i].classList.add("tabheader__item_active");
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
    }

    hideTabContent();
    showTabContent();

    tabHeaderItems.addEventListener("click", (e) => {
        if (e.target && e.target.classList.contains("tabheader__item")) {
            tabHeaderItem.forEach((item, i) => {
                if (e.target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Slider
    const wrapper = document.querySelector(".offer__slider-wrapper"),
        slide = document.querySelectorAll(".offer__slide"),
        sliderCounter = document.querySelector(".offer__slider-counter"),
        sliderPrev = document.querySelector(".offer__slider-prev"),
        sliderNext = document.querySelector(".offer__slider-next"),
        current = document.querySelector("#current"),
        total = document.querySelector("#total");

    function hideSlide() {
        slide.forEach(item => {
            item.style.display = "none"; /* удаляем весь контент */
        });
    }

    function showSlide(i = 0) {
        slide[i].style.display = "block"; /* добавляем один из по порядку */
    }
    hideSlide();
    showSlide();

    function scrollSlide() {
        let i = 0,
            /* переменная по прокрутке изображения */
            b = 1;
        /* переменная по простановке цифры, отсчитывающей
               изображение. Цифра не 0, чтобы было более привычней. */
        current.textContent = "1";
        total.textContent = "4";

        sliderCounter.addEventListener("click", (e) => {
            if (e.target && e.target.matches(`${".offer__slider-next"}, ${".offer__slide__next__img"}`)) {
                if (i == 3) {
                    sliderCounter.removeEventListener("click", (e));
                } else if (i <= 3) {
                    i++;
                    b++;
                    current.textContent = b;
                    hideSlide();
                    showSlide(i);
                }
            }

            if (e.target && e.target.matches(`${".offer__slider-prev"}, ${".offer__slide__prev__img"}`)) {
                if (i == 0) {
                    sliderCounter.removeEventListener("click", (e));
                } else if (i <= 3) {
                    i--;
                    b--;
                    current.textContent = b;
                    hideSlide();
                    showSlide(i);
                }
            }
        });
    }
    scrollSlide();

    //Timer

    const deadline = "2021-03-31";
    /* везде подставляем вместо 
           аргумента endtime */

    function time(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / 1000 / 60 / 60 / 24),
            /* получаем количество дней до 
        //                    назначенной даты. То, что в скобках, это количество милисекунд в сутках.
        //                    То есть мы округляем милисекунды до секунд (делим на 1000), до менут (на 60),
        //                    до часов (на 60) до суток (на 24)
        //                    Нельзя было сразу 18 400 000 написать? 
        //                    Через указанный метод округляем получившееся часы (поскольку
        //                    в результате выражения может получится дробное число), получившееся из
        //                    произведения желаемой даты и даты текущей). */
            hours = Math.floor((t / 1000 / 60 / 60) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        /* Если до назначенной даты больше суток, то получем больше 24 часов (60 минут,
        //     60 секунд), а в таймере часы, минуты, секунды должны быть до 24 и 60 
        //     соответственно. Чтобы такого не было через оператор процента мы делим 
        //     полученные милисекунды t) по указанным формулам.
        //     Оператор процента делит часы, минуты, секунды до того момента, пока 
        //     не останется неделимый остаток (меньше часов (минут, секунд), 
        //     то есть меньше 24 (60)). Этот остаток и будет оставшееся часы 
        //     (минуты, секунды) до назначенной даты. */

        return {
            /* закидываем полученный результат в объект, чтобы
                           проще было вытаскивать из него значения в функции ниже
                           intervalKlock() */
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds,
        };
    }

    function getTimeZero(num) {
        /* функция по добавлению нуля
                   в таймере в тех случаях, когда цифра больше нуля, но меньше 10 */
        if (num > 0 && num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    }

    function setKlock(endtime, selector) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timerInterval = setInterval(intervalKlock, 1000);
        /* задаем повторяющейся через 1000 млс (1 сек) интервал
         */
        intervalKlock(endtime);

        function intervalKlock() {
            /* тело этой функции помещаем 
                           в интервал, для повторения этого тела каждую секунду */
            const t = time(endtime);

            days.innerHTML = getTimeZero(t.days);
            /*  присваиваем к полученным из верстки переменным
             те значения, которые мы получили из функции time(endtime).
             Как видно мы обращаемся через точку к объекту, через перменную
             t */
            hours.innerHTML = getTimeZero(t.hours);
            minutes.innerHTML = getTimeZero(t.minutes);
            seconds.innerHTML = getTimeZero(t.seconds);

            if (t.total <= 0) {
                /* прекращаем интервал, когда он дойдет до нуля */
                clearInterval(timerInterval);
            }
        }
    }

    setKlock(deadline, '.timer');
    /* Вызываем функцию по 
            вычислению разницы между желаемой датой и действующей,
           с присвоением полученного значения кажды раз через секунду */


    // Modal
    const btn = document.querySelectorAll('[data-btn="1"]'),
        modal = document.querySelector("[data-modal]"),
        modalClose = document.querySelector("[data-close]");

    /* Мой вариант через инлайн стили */
    // btn.forEach((item) => {
    //     item.addEventListener("click", () => {
    //         modal.style.cssText = "display: block";
    //     });            
    // });

    // modalClose.addEventListener("click", () => {
    //     modal.style.cssText = "display: none";
    // });      

    // Вариант преподавателя, через присвоение классов CSS
    btn.forEach((item) => {
        item.addEventListener("click", () => {
            showModal();
        });
    });

    function showModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
    }

    function HideModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
    }

    modalClose.addEventListener("click", HideModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            HideModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            HideModal();
        }
    });

    // const ModalTime = setInterval(showModalTime, 2000);

    // function showModalTime() {
    //     showModal();
    //     clearInterval(ModalTime);
    // }

    // window.addEventListener("scroll", () => {            
    //     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    //         showModal();
    //     }
    // });


    window.addEventListener("scroll", () => {
        var scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
        document.getElementById("myBar").style.width = scrolled + "%";
    });

    window.addEventListener("scroll", () => {

        if (window.pageYOffset == 400) {
            showModal();
        }
    });

    // Class

    // const btnCall = document.querySelector('[data-btn="2"]'),
    //     menu__field = document.querySelector('.menu__field');

    // menu__field.querySelector('.menu .container').innerHTML = '';

    // class Menu__item {
    //     constructor(src, alt, NameMenu, TextMenu, price, TextPrice, days, parantSelector, ...classes) {
    //         this.src = src;
    //         this.alt = alt;
    //         this.NameMenu = NameMenu;
    //         this.TextMenu = TextMenu;
    //         this.price = price;
    //         this.TextPrice = TextPrice;
    //         this.days = days;
    //         this.parant = document.querySelector(parantSelector),
    //             this.classes = classes;
    //     }
    //     creatBlock() {
    //         const element = document.createElement("div");
    //         if (this.classes === 0) {
    //             this.classes = ".menu__item";
    //         } else {
    //             this.classes.forEach(classes => {
    //                 element.classList.add(classes)
    //             });
    //         }
    //         element.innerHTML = `<div class="menu__item">
    //             <img src=${this.src} alt=${this.alt}>
    //             <h3 class="menu__item-subtitle">Меню ${this.NameMenu}</h3>
    //             <div class="menu__item-descr">${this.TextMenu}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">${this.price}:</div>
    //                 <div class="menu__item-total"><span>${this.TextPrice}</span> ${this.days}</div>
    //             </div>
    //         </div>`;
    //         this.parant.append(element);
    //     }
    // }

    // function counterMenu() {
    //     let i = 0;
    //     btnCall.addEventListener('click', () => {
    //         i++;
    //         if (i == 1) {
    //             new Menu__item(
    //                 'img/tabs/vegy.jpg',
    //                 'vegy', 'Меню "Фитнес"',
    //                 `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих
    //         овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной
    //         ценой и высоким качеством!`,
    //                 'Цена',
    //                 '229',
    //                 'грн/день',
    //                 '.menu .container'

    //             ).creatBlock();
    //         }
    //         if (i == 2) {
    //             const div = new Menu__item(
    //                 'img/tabs/elite.jpg',
    //                 'elite',
    //                 'Меню “Премиум”',
    //                 `В меню “Премиум” мы используем не только красивый дизайн упаковки, но
    //             и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода
    //             в ресторан!`,
    //                 'Цена',
    //                 '550',
    //                 'грн/день',
    //                 '.menu .container'
    //             ).creatBlock();
    //         }
    //         if (i == 3) {
    //             const div = new Menu__item(
    //                 'img/tabs/post.jpg',
    //                 'post',
    //                 'Меню "Постное”',
    //                 `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие
    //         продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное
    //         количество белков за счет тофу и импортных вегетарианских стейков.`,
    //                 'Цена',
    //                 '430',
    //                 'грн/день',
    //                 '.menu .container'


    //             ).creatBlock();
    //         }
    //     });
    // }

    // counterMenu();

    // Training

    // const btnLow = document.querySelector('#low'),
    //     btnMedium = document.querySelector('#medium'),
    //     calculatingField = document.querySelector('.calculating__field'),
    //     body = document.querySelector('body');



    // function changeCollor(selektor, selektorParent, background) {
    //     selektor.addEventListener('click', (e) => {
    //         e.target.classList.toggle("calculating__choose-item_active");
    //     });

    //     selektorParent.addEventListener('click', (e) => {
    //         if (e.target == selektorParent) {
    //             selektor.classList.remove("calculating__choose-item_active");
    //         }
    //     });
    // }
    // changeCollor(btnLow, calculatingField);



    //----------------------------------------------    Классы ES6 практика ----------------------------------//

    const btnOreder = document.querySelector(".order .btn_min"),
        menuItem = document.querySelectorAll(".menu__item"),
        containerMenuField = document.querySelector(".menu .container");




    class CreatMenuItem {
        constructor(parentSelector, img, h3, menuItemDescr, menuItemCost, menuItemTotalSpan, menuItemTotalDay, ...selector) {
            this.img = img;
            this.h3 = h3;
            this.menuItemDescr = menuItemDescr;
            this.menuItemCost = menuItemCost;
            this.menuItemTotalSpan = menuItemTotalSpan;
            this.selector = selector;
            this.parent = document.querySelector(parentSelector);
            this.menuItemTotalDay = menuItemTotalDay;
        }


        NewMenuItem() {
            const element = document.createElement('div');
            if (this.selector.length == 0) {
                this.selector = "menu__item";
                element.classList.add(this.selector);
            } else {
                this.selector.forEach(selector => {
                    element.classList.add(this.selector);
                });
            }


            element.innerHTML +=
                `   <img src= ${this.img} alt="vegy">
                    <h3 class="menu__item-subtitle">${this.h3}</h3>
                    <div class="menu__item-descr">${this.menuItemDescr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">${this.menuItemCost}:</div>
                        <div class="menu__item-total"><span>${this.menuItemTotalSpan}</span> ${this.menuItemTotalDay}</div>
                    </div>`;
            this.parent.append(element);
        }
    }

    function NewMenu() {

        new CreatMenuItem(
            ".menu .container",
            "img/tabs/vegy.jpg",
            'Меню "Фитнес"',
            `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих
                    овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной
                    ценой и высоким качеством!`,
            'Цена',
            '229',
            "грн/день"
        ).NewMenuItem();


        new CreatMenuItem(
            ".menu .container",
            "img/tabs/elite.jpg",
            'Меню “Премиум”',
            `В меню “Премиум” мы используем не только красивый дизайн упаковки, но
                    и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода
                    в ресторан!`,
            'Цена',
            '550',
            'грн/день',
            "menu__item"
        ).NewMenuItem();

        new CreatMenuItem(
            ".menu .container",
            "img/tabs/post.jpg",
            'Меню "Постное"',
            `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие
                    продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное
                    количество белков за счет тофу и импортных вегетарианских стейков.`,
            'Цена',
            '430',
            'грн/день'
        ).NewMenuItem();

    }

    NewMenu();





    //---------- Урок № 51 JSON формат передачи данных. Глубокое клонирование-------//

    const LOL = {
        Name: "Oleg",
        age: "31",
        obj: {
            home: "Tula",
            family: "Golovkin"
        }
    };



    const A = JSON.parse(JSON.stringify(LOL));

    A.obj.home = "Moskow";



    const people = {
        name: 'Oleg',
        age: 30,
        famyli: {
            name: 'Olga'
        },
    };

    const clonePeople = (JSON.parse(JSON.stringify(people)));
    clonePeople.famyli.name = 'Golovkin';
    // console.log(clonePeople);


    // Урок 53 Реализация скрипта отправки данных на сервер//

    const forms = document.querySelectorAll("form");

    forms.forEach(form => {
        sendinForm(form);
    });

    const statusMassege = {
        error: "Ошибка",
        load: "Идет загрузка",
        ok: "Данные отправлены. Вскоре мы с Вами свяжемся!"
    };

    function sendinForm(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(form);        
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });            
            fetch('server.php', {
                // адресс отправки данных на сервер
                method: "POST",
                // вид действия
                headers: {
                    'Cotent-type': 'application/json'
                },
                // заголовки
                body: JSON.stringify(object)
                // что отправляем на сервер
            })
            .then((data) => data.text())
            // .then((data) => {
            //     return data.text()})
            // более длинная запись вышестоящей
            .then((data) => {  
                console.log(data);                                        
                // показать, какие данные ушли на сервер
                // Изменяю оповещение пользователя
                ShowThanksModal(statusMassege.ok);               
            }).catch(() => {
            }).finally(() => {
                form.reset();
            });

            setTimeout(function () {
                modal.classList.add("hide");
                modal.classList.remove("show");
            }, 2000);
        });
    }




    // Урок 54 Красивое оповещение пользователя................//

    function ShowThanksModal(message) {
        const modalContent = document.querySelector(".modal__content");
        modalContent.remove();
        const div = document.createElement("div");
        document.querySelector(".modal__dialog").append(div);
        div.classList.add("modal__content");
        div.innerHTML = `
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div> 
        <img src="icons/spinner.svg" alt="spinner">
        `;
        const img = div.querySelector("img");
        img.style.cssText = `display: block;
        margin: 10px auto;`

        setTimeout(function () {
            modal.classList.add("hide");
            modal.classList.remove("show");
            div.remove();
            document.querySelector(".modal__dialog").append(modalContent);
        }, 2000);
    }

    //----------------------- Урок 55 promise-------------------------------//



    const promise = new Promise((resolve, reject) => {
        // console.log("Первая операция");
        const product = {
            one: "film",
            two: "play"
        };
        resolve(product);
    });

    promise.then((product) => {
        return new Promise((resolve, reject) => {
            // console.log("Третья операция");
            product.name = "Oleg";
            resolve(product);
            reject(product);
        });
    }).then((product) => {
        // console.log(product);
        return product
    }).then((product) => {
        // console.log(product);
        return product;
    }).catch((product) => {
        // console.log(product);
        return product;
    }).finally((product) => {
        // console.log("Последняя операция");
        return product;
    });


    const test = time => {
        return new Promise((reject, resolve) => {
            setTimeout(() => {
                reject();
            }, time);

        });
    };

    Promise.all([test(1000), test(6000)]).then(() => {
        // console.log("Задача выполнена");
    });



    // ------------Урок 57 методы перебора массивов----------


    // const name = ['Ivan', 'Saha', 'Evgenich']

    // const newName =  name.filter(function(name) {
    //     return name.length > 5
    // })
    // console.log(newName)

    // const name = [4, 'SAha', 'EvgEnich'];

    // const newName =  name.some(name => typeof(name) === "string" )
    // console.log(newName);







});