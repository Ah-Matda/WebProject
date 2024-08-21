const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// 할 일 추가하는 기능
function addTask() {
	// 예외처리
	if (inputBox.value.trim() === '') {
		alert("입력 후 추가해주세요.");
	} else {
		let li = document.createElement("li");
		li.innerHTML = inputBox.value;
		listContainer.appendChild(li);

		// 삭제 버튼 만들기
		let span = document.createElement("span");
		span.innerHTML = "\u00d7";
		li.appendChild(span);
	}
	inputBox.value = ''; // 추가 후 입력창 비우기
	saveData();
}

//버튼 클릭될때마다 li Class checked로 바뀜
listContainer.addEventListener("click", function(e) {
	if (e.target.tagName == "LI") {
		e.target.classList.toggle("checked");
		saveData();
	}
	else if (e.target.tagName == "SPAN") {
		e.target.parentElement.remove();
		saveData();
	}
}, false);

//Local Storage로 데이터 저장
function saveData() {
	localStorage.setItem("dailyTask_data", listContainer.innerHTML);
}
function showTask() {
	listContainer.innerHTML = localStorage.getItem("dailyTask_data");
}
showTask();