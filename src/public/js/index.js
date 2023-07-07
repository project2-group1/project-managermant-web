const $ = document.querySelector.bind(document);
        const $$ = document.querySelectorAll.bind(document);
        
        const wrapperSidebar = document.querySelector('.wrapper-sidebar')
        const wrapperContent = document.querySelector('.wrapper-content')
        const btnSidebar = document.querySelector('.btn-sidebar');

        // Button on/off sidebar
        btnSidebar.onclick = function () {
            if (wrapperSidebar.classList.contains('hidden')) {
                wrapperSidebar.classList.remove('hidden')
                wrapperContent.classList.remove('fullwidth')
            }
            else {
                wrapperSidebar.classList.add('hidden')
                wrapperContent.classList.add('fullwidth')
            }
        }



        // chuyển hướng ds sinh viên
        /*const studentList = $('body > div > div.wrapper-sidebar > div > div.sidebar-item.sidebar-studentlist > button');
        studentList.onclick = function () {
            window.location.href = "./dssinhvien.html"
        }
        */

        /* # Ngọc: START */
        const logo_page = document.querySelector('.logo-page')
        logo_page.onclick = function () {
            window.location.href = "/"
        }