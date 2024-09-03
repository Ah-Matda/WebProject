const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("task-list");
const datePicker = document.getElementById("date-picker");

// 필요한 요소가 제대로 로드되었는지 확인하는 함수
function isElementValid(element) {
	return element !== null;
}

// Local Storage에서 저장된 할 일을 불러오는 함수
function loadTasks() {
	const savedTasks = localStorage.getItem("dailyTask_data");
	if (savedTasks) {
		return JSON.parse(savedTasks);
	} else {
		return [];
	}
}

// Local Storage에 할 일을 저장하는 함수
function saveTasks(tasks) {
	localStorage.setItem("dailyTask_data", JSON.stringify(tasks));
}

let tasks = loadTasks(); // 페이지 로드 시 저장된 할 일을 불러옴

// 할 일 추가하는 기능
function addTask() {
	if (!isElementValid(inputBox) || !isElementValid(datePicker)) {
		console.error("필요한 요소가 존재하지 않습니다.");
		return;
	}

	if (inputBox.value.trim() === '') {
		alert("입력 후 추가해주세요.");
		return;
	}

	const selectedDate = datePicker.value;
	if (!selectedDate) {
		alert("날짜를 선택해주세요.");
		return;
	}

	let task = {
		task: inputBox.value,
		date: new Date(selectedDate).toLocaleDateString(), // 선택된 날짜 저장
		checked: false // 초기값은 체크되지 않음
	};

	tasks.push(task); // 배열에 할 일 추가
	renderTasks();
	saveTasks(tasks); // 데이터를 저장

	inputBox.value = ''; // 추가 후 입력창 비우기
	datePicker.value = ''; // 날짜 선택기 비우기
}

// 할 일 렌더링
function renderTasks() {
	if (!isElementValid(listContainer)) {
		console.error("할 일 목록을 표시할 요소가 존재하지 않습니다.");
		return;
	}

	listContainer.innerHTML = ''; // 기존 내용 초기화
	tasks.forEach((taskObj, index) => {
		let li = document.createElement("li");
		li.innerHTML = `${taskObj.task} <span class="date">${taskObj.date}</span>`; // hidden 속성 제거
		if (taskObj.checked) li.classList.add("checked"); // 체크된 항목 표시

		// 삭제 버튼 만들기
		let span = document.createElement("span");
		span.innerHTML = "\u00d7";
		li.appendChild(span);

		// 클릭 이벤트 처리
		li.addEventListener("click", function() {
			toggleTask(index); // 체크 상태 변경
		});

		span.addEventListener("click", function(e) {
			e.stopPropagation(); // 부모 LI의 클릭 이벤트 방지
			deleteTask(index);
		});

		listContainer.appendChild(li);
	});
}


// 할 일 체크 상태 토글
function toggleTask(index) {
	tasks[index].checked = !tasks[index].checked;
	renderTasks();
	saveTasks(tasks); // 데이터를 저장
}

// 할 일 삭제
function deleteTask(index) {
	tasks.splice(index, 1);
	renderTasks();
	saveTasks(tasks); // 데이터를 저장
}

// 페이지 로드 시 저장된 할 일 표시
renderTasks(); // 저장된 할 일을 렌더링
