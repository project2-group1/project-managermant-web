const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const urlParams = new URLSearchParams(window.location.search);
const roleParam = urlParams.get('r');

const sidebarStudentList = $('.sidebar-studentlist')

const sidebarAddMeeting = $('.sidebar-add-meeting')
const sidebarAssignment = $('.sidebar-assignment')
const sidebarFreetime = $('.sidebar-freetime')
const sidebarRecent = $('.sidebar-recent')
const sidebarStored = $('.sidebar-stored')

const sideBar = {

    API: function() {

    },
    config: function() {

    },
    handle: function() {
        console.log(roleParam);
        sidebarStudentList.addEventListener('click', function(e) {
            e.preventDefault()
            window.location.href = `/list/?r=${roleParam}`
        })

        sidebarAssignment.addEventListener('click', function(e) {
            e.preventDefault()
            window.location.href = `/assignment/?r=${roleParam}`
        })

        sidebarFreetime.addEventListener('click', function(e) {
            e.preventDefault()
            window.location.href = `/freetime/?r=${roleParam}`
        })

        sidebarRecent.addEventListener('click', function(e) {
            e.preventDefault()
            // window.location.href = `/list/?r=${roleParam}`
        })

        sidebarStored.addEventListener('click', function(e) {
            e.preventDefault()
            // window.location.href = `/list/?r=${roleParam}`
        })
        
    },
    start: function() {
        this.handle()
    }

}

sideBar.start()