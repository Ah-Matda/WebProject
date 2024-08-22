/**
 * 
 */

 	/* 캘린더  */
  document.addEventListener('DOMContentLoaded', function() {
	let toggleButton = document.querySelector('.toggle-button');
	let sidebar = document.querySelector('.sidebar');
	let mainContent = document.querySelector('.main-content');
	let key = localStorage.getItem('dailyTask_data');
	
	   toggleButton.addEventListener('click', function() {
		console.log("키 값 : " + key);
	   sidebar.classList.toggle('collapsed');
	   mainContent.classList.toggle('collapsed');
	   });
    var calendarEl = document.getElementById('calendar');
	let titleE1 = document.getElementById('calendar-title');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
	  headerToolbar: false,   //툴바 비활성화.
	  datesSet: function(info){
		titleE1.textContent = info.view.title;
	  },
	  locale: 'ko'  //한국어
    });
	/* 툴바 커스터 마이징  */
	document.getElementById('prev').addEventListener('click', function() {
	      calendar.prev();
	});

	document.getElementById('today').addEventListener('click', function() {
	      calendar.today();
	});

	document.getElementById('next').addEventListener('click', function() {
	      calendar.next();
	});
	
	document.getElementById('dayGridMonth').addEventListener('click', function() {
		  calendar.changeView('dayGridMonth');
	});
	
	document.getElementById('timeGridWeek').addEventListener('click', function() {
		  calendar.changeView('timeGridWeek');
	});
	
	document.getElementById('timeGridDay').addEventListener('click', function() {
		  calendar.changeView('timeGridDay');
	});
	
    calendar.render();
  });

