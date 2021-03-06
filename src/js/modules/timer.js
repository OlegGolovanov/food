export default function Timer() {
     //Timer

     const deadline = "2023-03-31";
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
 
}
