// selector
const btnAddMeeting = $('.sidebar-add-meeting')

const meeting = {
    config: function () {
        var quill = new Quill('.editor', {
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
        });
    },
    handleEvents: function () {
        btnAddMeeting.onclick = function () {
            this.renderMeeting()
        }
    },
    renderMeeting: function () {
        const htmlsMeeting = `
            <div class="meeting" course="" id="">
                <div class="meeting-header">
                    <div class="title">
                        <span class="title-subject">${'Project II'}</span>
                        <span class="title-space">-</span>
                        <span class="title-name">${'Group 3'}</span>
                        <span class="title-space">-</span>
                        <span class="title-topic">${'AI Machine Learning'}</span>
                        <span class="title-serial">${'#3'}</span>
                    </div>
                    <button class="btn-out btn-note">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div class="meeting-info">
                    <div class="day">
                        <p class="date">${'16'}</p>
                        <p class="month">${'Tháng 5'}</p>
                    </div>
                    <div class="info">
                        <div class="info-student">
                            <span class="student-name">${'Mai Xuân Ngọc'}</span>
                            <span class="student-id">${'20204769'}</span>
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
                    <button class="btn-end-meeting btn-sidebar-item">
                        <span class="end-label">End meeting</span>
                        <i class="fa-regular fa-circle-stop"></i>
                    </button>
                </div>
            </div>
        `
        wrapperContent.innerHTML += htmlsMeeting
    },
    start: function () {
        this.config()
        this.handleEvents()
        // this.renderMeeting()
    }
}

meeting.start()