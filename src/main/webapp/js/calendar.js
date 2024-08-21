/**
 * 
 */


  document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
	let titleE1 = document.querySelector("#calendar-title");
	let selectedDate = null;
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
	  headerToolbar: false,
	  dateSet: function(info){
		titleE1.textContent = info.view.title;
	  }
	  
    });
    calendar.render();
  });

