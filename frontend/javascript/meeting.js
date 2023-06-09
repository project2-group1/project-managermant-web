// selector
const btnAddMeeting = $('.sidebar-add-meeting')
const btnDisplay = $('.btn-display')
let meetings 
let btnsOut = Array.from($$('.btn-out'))

const meeting = {

    meetingsData: [
        {
            course: 'Project I',
            nameGroup: 'Group 1',
            topic: 'Project Management Website',
            serial: '1',
            date: '2023-05-24',
            studentGroup: [
                {
                    studentName: 'Giang Trung Nghĩa',
                    studentId: '20204767',
                }
            ],
        },
        {
            course: 'Graduated Research',
            nameGroup: 'Mai Xuân Ngọc',
            topic: 'Artificial Inteligence',
            serial: '3',
            date: '2022-09-30',
            studentGroup: [
                {
                    studentName: 'Mai Xuân Ngọc',
                    studentId: '20204769',
                }
            ],
        },
        {
            course: 'Graduated Research',
            nameGroup: 'Mai Xuân Ngọc',
            topic: 'Artificial Inteligence',
            serial: '3',
            date: '2022-09-30',
            studentGroup: [
                {
                    studentName: 'Mai Xuân Ngọc',
                    studentId: '20204769',
                }
            ],
        },
        {
            course: 'Graduated Research',
            nameGroup: 'Mai Xuân Ngọc',
            topic: 'Artificial Inteligence',
            serial: '3',
            date: '2022-09-30',
            studentGroup: [
                {
                    studentName: 'Mai Xuân Ngọc',
                    studentId: '20204769',
                }
            ],
        },
    ],
    config: function () {
        for (let i = 0; i < this.meetingsData.length; i++) {
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
        
        // btnsOut.forEach((btnOut) => {
        //     btnOut.addEventListener('click', (e) => {
        //         console.log(e);
        //     })
        // })

       
    },
    renderMeeting: function () {
        const meetingHtmls = this.meetingsData.map((meeting, index) => {
            return `
            <form action="" method="post" class="form-meeting">
                <div class="meeting" course="" id="">
                    <div class="meeting-header">
                        <div class="title">
                            <span class="title-course">${meeting.course}</span>
                            <span class="title-space">-</span>
                            <span class="title-name">${meeting.nameGroup}</span>
                            <span class="title-space">-</span>
                            <span class="title-topic">${meeting.topic}</span>
                            <span class="title-serial">#${meeting.serial}</span>
                        </div>
                        <div class="header-btn">
                            <button class="btn-out btn-note">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    </div>
                    <div class="meeting-info">
                        <div class="day">
                            <p class="date">${meeting.date}</p>
                        </div>
                        <div class="info">
                            <div class="info-student">
                                <span class="student-name">${meeting.studentGroup[0].studentName}</span>
                                <span class="student-id">${meeting.studentGroup[0].studentId}</span>
                            </div>
                            <div class="file-report">
                                <label for="file">Báo cáo: </label>
                                <input type="file" accept=".doc,.docx,.pdf,.zip">
                            </div>
                        </div>
                    </div>
                    <div class="meeting-content">
                        <div class="editor"></div>
                    </div>
                    <div class="meeting-end">
                        <label for="submit"></label>
                        <input type="submit" class="btn-end-meeting btn-sidebar-item">
                    </div>
                </div>
            </form>
            `
        })

        // Render and Update variable
        wrapperContent.innerHTML = meetingHtmls.join('')
        meetings = Array.from($$('.meeting'))
        btnsOut = Array.from($$('.btn-out'))

        // Add event click for btnsOut 
        btnsOut.forEach((btnOut) => {
            btnOut.addEventListener('click', (e) => {
                e.target.closest('.meeting').remove()
            })
        })
    },
    start: function () {
        this.handleEvents()
        this.renderMeeting()
        this.config()
    }
}

meeting.start()