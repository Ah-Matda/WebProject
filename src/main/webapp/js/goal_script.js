// goal_script.js

let goals = [];
let completedGoals = 0;
let level = 1;
let exp = 0;
let expPerGoal = 10;
let characterImage = document.getElementById('characterImage');
let levelDisplay = document.getElementById('levelDisplay');
let expFill = document.getElementById('expFill');

let levelpercent = document.getElementById('levelpercent');

const dataList = document.getElementById('dataList');
const getDataBtn = document.getElementById('getTodayRandomWords');
const gamestartBtn = document.getElementById('gamestart');

const words = [];
let addWords = "";
let ko_words = [];
let score = 0;

const url = 'https://wordsapiv1.p.rapidapi.com/words?random=true';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'c7951e6ed2msh07f75879a9d74d8p16e9d5jsn4ab031dd49c5',
		'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
	}
};

getDataBtn.addEventListener('click', handleClick);
gamestartBtn.addEventListener('click', startGame);

function handleClick() {
	if (ko_words.length > 4) {
		renderWords();
		getDataBtn.removeEventListener('click', handleClick);
	}
}

function renderWords() {
	const fragment = document.createDocumentFragment();

	for (let i = 0; i < words.length; i++) {
		const listItem = document.createElement('li');
		listItem.textContent = "❊ " + words[i] + " : " + ko_words[i];
		fragment.appendChild(listItem);
	}

	dataList.innerHTML = '';
	dataList.appendChild(fragment);
}

async function fetchWords() {
	const loadingElement = document.getElementById('loading');
	loadingElement.style.display = 'block';

	try {
		const responses = await Promise.all([...Array(5)].map(() => fetch(url, options)));
		const results = await Promise.all(responses.map(res => res.json()));

		results.forEach((result, i) => {
			words.push(result.word);
			addWords += (i === 4) ? result.word : result.word + ",";
		});

		const translationOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer gAAAAABmx9nuTbvb-EiIEZVnwqrcVxmkgLfWUFDmfjTmjG3INYdTosuR10Wwn4oGlgKAx-KZimCE4LVLpu61cjxz36uZngn_hpcxvq1JYBT5_wjPO-scye44JXV3ebYcmJYuT-LNHjBL'
			},
			body: JSON.stringify({
				formality: "default",
				source_lang: "en",
				target_lang: "ko",
				text: addWords
			})
		};

		const translationResponse = await fetch('https://api.textcortex.com/v1/texts/translations', translationOptions);
		const data = await translationResponse.json();

		ko_words = data.data.outputs[0].text.split(', ');
		//renderWords();

	} catch (error) {
		console.error('Error during fetch:', error);
	} finally {
		loadingElement.style.display = 'none';
	}
}

fetchWords();

function startGame() {
	let exlist = words.map(word => "- " + word).join("\n");
	const randomArray = shuffleArray();

	for (let i = 0; i < randomArray.length; i++) {
		const index = randomArray[i];
		const correctWord = words[index];
		const userInput = prompt(ko_words[index] + ' 의 뜻을 가지는 단어는?' + '\n' + exlist);

		if (userInput === null) {
			alert("게임이 취소되었습니다.");
			score = 0;
			return;  // 반복 중지
		}

		if (correctWord === userInput) {
			score += 20;
		} else if (score > 0) {
			score -= 10;
		}
	}

	alert("점수:" + score + "를 획득했습니다.");
	if (score !== 0) {
		
		gameEndupdate();
	}
}

function gameEndupdate() {
	exp += score;
	updateExperienceBar();
	updateCharacter();
	updateMessage("점수가 변경되었습니다");
	const num = Math.floor(Math.random() * 5) + 1;
	updateCharacterImage(num);
}

function updateCharacterImage(num) {
	characterImage.src = `../images/character/goal_complete${num}.png`;

	if (exp < 100) {
		setTimeout(() => {
			characterImage.src = `../images/character/level_${level}.png`;
		}, 2000);
	}
}

function shuffleArray() {
	const array = [0, 1, 2, 3, 4];
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

document.getElementById('addGoalButton').addEventListener('click', function() {
	const goalInput = document.getElementById('goalInput');
	if (goalInput.value) {
		goals.push(goalInput.value);
		addGoalToList(goalInput.value);
		goalInput.value = '';
		updateMessage("목표가 추가되었습니다!");
	} else {
		updateMessage("목표를 입력해주세요.");
	}
});

function addGoalToList(goal) {
	const goalList = document.getElementById('goalList');
	const li = document.createElement('li');
	li.textContent = "🍀 " + goal;

	li.addEventListener('click', function() {
		completeGoal(li);
	});

	goalList.appendChild(li);
}

function completeGoal(goalItem) {
	if (!goalItem.classList.contains('completed')) {
		completedGoals++;
		exp += expPerGoal;
		goalItem.classList.add('completed');
		updateExperienceBar();
		updateCharacter();
		updateMessage("목표를 달성했습니다");

		const num = Math.floor(Math.random() * 5) + 1;
		updateCharacterImage(num);
	}
}

function updateExperienceBar() {
	expFill.style.width = `${exp}%`;
	levelpercent.textContent = "경험치: " + exp + "/ 100";
	if (exp >= 100) {
		levelUp();
	}
}

function levelUp() {
	level++;
	exp -= 100;
	completedGoals = 0;
	levelDisplay.textContent = "레벨: " + level;
	expFill.style.width = `${exp}%`;
	levelpercent.textContent = "경험치: " + exp + "/ 100";
	levelUpAnimation();
}

function levelUpAnimation() {
	characterImage.style.transform = "scale(1.2)";
	setTimeout(() => {
		characterImage.style.transform = "scale(1)";
	}, 300);
}

function updateCharacter() {
	characterImage.src = `../images/character/level_${level}.png`;
}

function updateMessage(message) {
	alert(message);
}

function preloadImages() {
	const images = [];
	for (let i = 1; i <= 5; i++) {
		const img = new Image();
		img.src = `../images/character/goal_complete${i}.png`;
		images.push(img);
	}
}

preloadImages();
