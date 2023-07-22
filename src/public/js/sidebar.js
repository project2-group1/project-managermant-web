const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const sidebarStudentList = $('.sidebar-studentlist')
const sidebarWeek = $('.sidebar-week')
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
        if(sidebarWeek)
        sidebarWeek.addEventListener('click', function(e) {
            e.preventDefault()
            window.location.href = `/`
        })

        if(sidebarStudentList)
        sidebarStudentList.addEventListener('click', function(e) {
            e.preventDefault()
            window.location.href = `/list`
        })

        if(sidebarAssignment)
        sidebarAssignment.addEventListener('click', function(e) {
            e.preventDefault()
            window.location.href = `/assignment`
        })

        if(sidebarFreetime)
        sidebarFreetime.addEventListener('click', function(e) {
            e.preventDefault()
            window.location.href = `/freetime`
        })

        if(sidebarRecent)
        sidebarRecent.addEventListener('click', function(e) {
            e.preventDefault()
            // window.location.href = `/list`
        })

        if(sidebarStored)
        sidebarStored.addEventListener('click', function(e) {
            e.preventDefault()
            // window.location.href = `/list`
        })
        
    },
    start: function() {
        this.handle()
    }

}

sideBar.start()