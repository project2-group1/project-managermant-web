import { modalAddFreeTime } from "./header.js"
import { fetchData } from '../services/fetchData.js'

// css selector
const worksColumn = Array.from($$('.works'))
const workBoxes = Array.from($$('.work-box'))

const currentDays = [
    $('.works[name="monday"]'),
    $('.works[name="tuesday"]'),
    $('.works[name="wednesday"]'),
    $('.works[name="thursday"]'),
    $('.works[name="friday"]'),
    $('.works[name="saturday"]'),
    $('.works[name="sunday"]'),
]


const calendar = {

    API: async function () {
       
    },
    config: function () {


    },
    loadEvents: function () {
        // get works-col element by (date)
        function getWorkColumn(date) {
            return worksColumn.find((workCol) => (workCol.getAttribute('date') === date))
        }

        // get work-box element by (date, startTime)
        function getWorkBox(date, startTime) {
            let curWork = getWorkColumn(date)
            if (curWork) {
                let workBox = Array.from(curWork.children)
                    .find((workBox) => ((Number)(workBox.getAttribute('time')) === (startTime - 0.5)))
                return workBox
            }
        }

        // set Height of event follow by duration
        function setEventDuration(event) {
            let duration = ((Number)(event.getAttribute('endTime'))
                - (Number)(event.getAttribute('startTime'))) / 0.5
            return duration * 40.8 - 1 + 'px'
        }

        function getDateAndConvert(date) {
            const y = date.substring(6, 10)
            const m = date.substring(3, 5)
            const d = date.substring(0, 2)
            return y + '-' + m + '-' + d
        }

        for (let i = 0; i < freetimeEventsApi.length; i++) {
            const e = freetimeEventsApi[i]
            console.log(e);
            const startTime = formatDate(formatDateFromUTCToLocal(e.starttime))
            const endTime = formatDate(formatDateFromUTCToLocal(e.endtime))

            console.log(startTime)
            console.log(endTime)
            const freetimeEventHTML = `
                <button class="freetime-event" date="${getDateAndConvert(startTime)}" startTime="${startTime}" endTime="${endTime}" id="${e.id}">
                    <div class="content">
                        <p class="title">Rảnh</p>
                        <p class="info"></p>
                        <p class="time">${startTime}-${endTime}</p>
                    </div>
                </button>
                `
            const newFreeTimeEvent = document.createElement('div')
            newFreeTimeEvent.innerHTML = freetimeEventHTML
            workBoxes[0].insertAdjacentElement('beforeBegin', newFreeTimeEvent.firstElementChild)
            

            document.addEventListener("DOMContentLoaded", function () {
                let parentElement = workBoxes[0].parentNode;
                let dateAttribute = parentElement.getAttribute('date');
                
                if (dateAttribute !== null) {
                  console.log("Thuộc tính 'date' đã được render: ", dateAttribute);
                } else {
                  console.log("Thuộc tính 'date' không tồn tại trong phần tử cha.");
                }
            })



            // Xử lý bật tạo lịch khi bấm vào work box
            workBoxes.forEach(function (e) {
                const date = startTime
                

                // render lần đầu
                // if (workBox) {
                //     if (workBox.nextElementSibling && !workBox.nextElementSibling.classList.contains("event")) {
                //         workBox.insertAdjacentElement('afterend', eventContainer[i])
                //         eventContainer[i].style.height = setEventDuration(eventContainer[i])
                //     }
                // }


            })



        }

        // events = Array.from($$('.event')) //update lại events
    },
    handleEvents: function () {
        const _this = this // trỏ vào calendar

    },
    renderEvents: function () {

        this.loadEvents()
        // Reset Event
        events.forEach((event) => event.classList.remove('active'))

        // Render events
        function getEvents(date) {
            return events.filter((event) => (event.getAttribute('date') === date))
        }

        let eventInCurWeek = []
        for (let i = 0; i < currentDays.length; i++) {
            let tempEvent = getEvents(currentDays[i].getAttribute('date'))
            if (tempEvent.length != 0) {
                eventInCurWeek.push(...tempEvent)
            }
        }

        eventInCurWeek.forEach(function (event) {
            event.classList.add('active', 'freetime')
        })

        events.forEach(function (event) {
            let curHeight
            event.addEventListener('mouseenter', (e) => {
                curHeight = e.target.clientHeight
                if (e.target.scrollHeight > e.target.clientHeight) {
                    e.target.style.height = e.target.scrollHeight + 'px'
                }
            })

            event.addEventListener('mouseleave', (e) => {
                e.target.style.height = curHeight + 'px'
            })
        })

    },
    start: async function () {
        await this.API()
        this.config()
        this.loadEvents()
        // this.renderEvents()
        // this.handleEvents()
    },
}



calendar.start()