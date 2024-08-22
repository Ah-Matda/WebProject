function test() {
	// Local Storage에서 데이터 불러오기
	let savedTasks = localStorage.getItem("dailyTask_data");

	if (savedTasks) {
		try {
			// JSON 문자열을 객체로 변환
			let tasks = JSON.parse(savedTasks);

			// 각 할 일 출력
			tasks.forEach((taskObj) => {
				console.log(`Task: ${taskObj.task}`);
				console.log(`Added on: ${taskObj.date}`);
				console.log(`Checked: ${taskObj.checked}`);
			});
		} catch (e) {
			console.error("데이터 파싱 오류:", e);
		}
	} else {
		console.log("No tasks found in local storage.");
	}
}
