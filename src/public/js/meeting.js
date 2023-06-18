// selector
const btnAddMeeting = $('.sidebar-add-meeting')
const btnDisplay = $('.btn-display')
let meetings = Array.from($$('.meeting'))
let btnsOut = Array.from($$('.btn-out'))
let dateTime = Array.from($$('.date'))

const monthMapping = {
    jan: '1',
    feb: '2',
    mar: '3',
    apr: '4',
    may: '5',
    jun: '6',
    jul: '7',
    aug: '8',
    sep: '9',
    oct: '10',
    nov: '11',
    dec: '12',
}

const meeting = {

    

    config: function () {
        // Render quill note for each meeting
        for (let i = 0; i < meetings.length; i++) {
            const editors = Array.from($$('.editor'))

            editors.map((editor,index) => {
                editor.classList.add('editor' + index)
            })
            var quill = new Quill('.editor' + i, {
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false, 3] }],
                        ['bold', 'italic', 'underline'], // object như 1 button đơn lẻ thì chỉ cần truyền vào string
                        [{ 'list': 'ordered' },
                        { 'list': 'bullet' },
                        { 'align': [] }],
                        [{ 'color': [] }, { 'background': [] }],// dropdown with defaults from theme
                        ['image', 'code-block'],
                    ]
                },
                debug: 'info',
                placeholder: 'Note something...',
                theme: 'snow',
            })
        }
    },
    handleEvents: function () {
        
        btnDisplay.addEventListener('click', () => {
            meetings.map((e) => {
                if(!e.classList.contains('double-screen')) {
                    e.classList.add('double-screen')
                } else {
                    e.classList.remove('double-screen')
                }
            })
        })
        
    },
    renderMeeting: function () {
        // Render and Update variable
        // meetings = Array.from($$('.meeting'))
        // btnsOut = Array.from($$('.btn-out'))

        // Add event click for btnsOut 
        btnsOut.forEach((btnOut) => {
            btnOut.addEventListener('click', (e) => {
                e.target.closest('.meeting').remove()
            })
        })

        // Render date
        dateTime.forEach((e) => {
            console.log(e.getAttribute('starttime'))
            e.innerText = formatDate(e.getAttribute('starttime')) + 
                        formatTime(e.getAttribute('starttime')) + ' - ' +
                        formatTime(e.getAttribute('endtime')) 
                        
        })

        // Format time from Date object
        function formatTime(dateTime) {
            let hourAndMinutes = dateTime.substring(16,21) 
            return hourAndMinutes
        }

        // Format date from Date object
        function formatDate(dateTime) {
            let year = dateTime.substring(11,16)
            let month = dateTime.substring(4,7).toLowerCase()
            month = monthMapping[month]
            let date = dateTime.substring(8,10)
            return date +'/' + month + '/' + year
        }
    },
    start: function () {
        this.handleEvents()
        this.renderMeeting()
        this.config()
    }
}

meeting.start()