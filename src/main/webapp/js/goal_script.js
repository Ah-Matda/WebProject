let goals = [];
let completedGoals = 0;
let level = 1;
let exp = 0;
let expPerGoal = 20;
let characterImage = document.getElementById('characterImage');
let levelDisplay = document.getElementById('levelDisplay');
let expFill = document.getElementById('expFill');
let messageDisplay = document.getElementById('message');

// 목표 추가 버튼 클릭 이벤트 리스너
document.getElementById('addGoalButton').addEventListener('click', function() {
	let goalInput = document.getElementById('goalInput');
	// 입력 필드가 비어있지 않은 경우
	if (goalInput.value) {
		goals.push(goalInput.value);
		addGoalToList(goalInput.value);  // 목표 리스트에 목표 추가
		goalInput.value = '';  // 입력 필드 초기화
		updateMessage("목표가 추가되었습니다!");
	} else {
		updateMessage("목표를 입력해주세요.");
	}
});

// 목표를 리스트에 추가하는 함수
function addGoalToList(goal) {
	let goalList = document.getElementById('goalList');  // 목표 목록 요소
	let li = document.createElement('li');
	li.textContent = goal;

	// 목표 클릭 시 완료 처리
	li.addEventListener('click', function() {
		completeGoal(li);  // 목표 완료 함수 호출
	});

	goalList.appendChild(li);  // 목표를 리스트에 추가
}

// 목표 완료 처리 함수
function completeGoal(goalItem) {
	// 목표가 완료되지 않은 경우에만 처리
	if (!goalItem.classList.contains('completed')) {
		completedGoals++;
		exp += expPerGoal;
		goalItem.classList.add('completed');  // 목표 완료 스타일 적용
		updateExperienceBar();
		updateCharacter();
		console.log("exp:", exp);
		console.log("왜안나와");
		updateMessage("목표를 달성했습니다");

		// 랜덤한 완료 이미지 추출
		const num = Math.floor(Math.random() * 5) + 1;
		if (exp < 100) {
			characterImage.src = `../images/character/goal_complete${num}.png`;

			// 2초 후 원래 레벨 이미지로 복원
			setTimeout(() => {
				characterImage.src = `../images/character/level_${level}.png`;
			}, 2000);
		}

	}
}

// 경험치바 업데이트 함수
function updateExperienceBar() {
	expFill.style.width = `${exp}%`;  // 경험치바의 너비를 현재 경험치에 맞게 조정

	// 경험치가 100% 이상이면 레벨업 처리
	if (exp >= 100) {
		levelUp();  // 레벨업 함수 호출
	}
}

// 레벨업 처리 함수
function levelUp() {
	level++;
	exp = 0;
	completedGoals = 0;
	levelDisplay.textContent = "레벨: " + level;  // 레벨 표시 업데이트
	expFill.style.width = '0%';  // 경험치바 초기화
	levelUpAnimation();  // 레벨업 애니메이션 호출
}

// 레벨업 애니메이션 함수
function levelUpAnimation() {
	characterImage.style.transform = "scale(1.2)";  // 캐릭터 이미지 확대
	setTimeout(() => {
		characterImage.style.transform = "scale(1)";  // 이미지 원래 크기로 복원
	}, 300);  // 0.3초 후 복원
}

// 캐릭터 상태 업데이트 함수
function updateCharacter() {
	characterImage.src = `../images/character/level_${level}.png`;  // 레벨에 맞는 캐릭터 이미지로 변경
}

// 상태 메시지 업데이트 함수
function updateMessage(message) {
	messageDisplay.textContent = message;  // 메시지 업데이트
}
