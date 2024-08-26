document.addEventListener('DOMContentLoaded', function() {
    // 사이드바와 메인 콘텐츠 영역의 요소 선택
    let toggleButton = document.querySelector('.toggle-button');
    let sidebar = document.querySelector('.sidebar');
    let mainContent = document.querySelector('.main-content');
    
    // 캘린더와 타이틀 요소 선택
    let calendarEl = document.querySelector('#calendar');
    let titleE1 = document.querySelector('#calendar-title');

    // DOM 요소가 존재하는지 확인
    if (!calendarEl) {
        console.error("Calendar element not found!");
        return; // 캘린더 요소가 없으면 실행하지 않음
    }

    if (!titleE1) {
        console.error("Calendar title element not found!");
        return; // 타이틀 요소가 없으면 실행하지 않음
    }

    // 로컬스토리지에서 할 일 데이터 가져오기
    let storedTasks = JSON.parse(localStorage.getItem('dailyTask_data')) || [];
    console.log("Loaded tasks from localStorage:", storedTasks);  // 로드된 데이터 확인
    
    // 날짜 포맷팅 함수 - 로컬스토리지의 date 포맷팅이 2024.08.23. 형식
    // fullCalendar의 start 객체에 YYYY-MM-DD 형태로 보내야함
    function formatDate(dateString) {
        let parts = dateString.split('. ').map(part => part.trim());
        let year = parts[0];
        let month = parts[1].padStart(2, '0');
        let day = parts[2].replace('.', '').padStart(2, '0');  // 마지막 '.' 제거
        return `${year}-${month}-${day}`;
    }
    
    // 사이드바 토글 버튼의 클릭 이벤트 핸들러
	if (toggleButton) {
	    toggleButton.addEventListener('click', function() {
	        sidebar.classList.toggle('collapsed');
	        mainContent.classList.toggle('collapsed');
	        console.log("Sidebar toggled");
	    });
	}
	
    // 저장된 할 일을 FullCalendar 이벤트로 변환
    let events = storedTasks.map(task => ({
        title: task.task,
        start: formatDate(task.date),  // 여기에서 날짜를 포맷팅
        allDay: true,
        extendedProps: {
            checked: task.checked // 체크된 상태를 추가
        },
        backgroundColor: task.checked ? '#d3d3d3' : '#007bff', // 완료된 이벤트 배경 색상
        borderColor: task.checked ? '#d3d3d3' : '#007bff', // 완료된 이벤트 테두리 색상
        textColor: task.checked ? 'gray' : 'white' // 완료된 이벤트 텍스트 색상
    }));
    console.log("Events created for FullCalendar:", events);  // 생성된 이벤트 확인

    // FullCalendar 초기화
    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: false,
        locale: 'ko',
        events: events,
        // 뷰가 바뀔 때마다 호출되어 타이틀을 업데이트
        datesSet: function(info) {
            titleE1.textContent = info.view.title;
            console.log("Calendar Title Updated:", titleE1.textContent);
        },
        // 이벤트가 렌더링될 때 호출되어 체크 상태에 따라 스타일을 적용
        eventDidMount: function(info) {
            let el = info.el.querySelector('.fc-event-title');
            if (info.event.extendedProps.checked) {
                if (el) {
                    el.style.textDecoration = 'line-through';
                    el.style.color = 'gray';
                } else {
                    info.el.innerHTML = `<span style="text-decoration: line-through; color: gray;">${info.event.title}</span>`;
                }
            } else {
                if (el) {
                    el.style.color = 'white'; // 미완료 이벤트 텍스트 색상
                } else {
                    info.el.innerHTML = `<span style="color: white;">${info.event.title}</span>`;
                }
            }
        }
    });

    // 툴바의 이전 버튼 클릭 이벤트 핸들러
    document.querySelector('#prev').addEventListener('click', function() {
        calendar.prev();
    });

    // 툴바의 오늘 버튼 클릭 이벤트 핸들러
    document.querySelector('#today').addEventListener('click', function() {
        calendar.today();
    });

    // 툴바의 다음 버튼 클릭 이벤트 핸들러
    document.querySelector('#next').addEventListener('click', function() {
        calendar.next();
    });

    // 월간 뷰 버튼 클릭 이벤트 핸들러
    document.querySelector('#dayGridMonth').addEventListener('click', function() {
        calendar.changeView('dayGridMonth');
        adjustCalendarStyle('530px', '45px 0 0 0'); // 기본 스타일로 재설정
    });

    // 주간 뷰 버튼 클릭 이벤트 핸들러
    document.querySelector('#timeGridWeek').addEventListener('click', function() {
        calendar.changeView('timeGridWeek');
        adjustCalendarStyle('400px', '30px 0 0 0'); // 주간 뷰 스타일 적용
    });

    // 일간 뷰 버튼 클릭 이벤트 핸들러
    document.querySelector('#timeGridDay').addEventListener('click', function() {
        calendar.changeView('timeGridDay');
        adjustCalendarStyle('400px', '30px 0 0 0'); // 일간 뷰 스타일 적용
    });

    // 캘린더 높이와 마진을 동적으로 조정하는 함수
    function adjustCalendarStyle(height, margin) {
        let scrollGrid = document.querySelector('.fc .fc-scrollgrid-liquid');
        if (scrollGrid) {
            scrollGrid.style.height = height;
            scrollGrid.style.margin = margin;
        } else {
            console.warn("ScrollGrid element not found for adjusting style.");
        }
    }

    // 캘린더 렌더링
    calendar.render();
});
