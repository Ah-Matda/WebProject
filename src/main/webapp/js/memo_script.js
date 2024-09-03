const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

// 사용할 색상 배열
const colors = ['#ADDCC8', '#DBECC2', '#FFF7D2', '#FED2B5', '#F7A7A6', '#E2BBD8'];

// 로컬 스토리지에서 가져온 각 노트를 화면에 표시
getNotes().forEach((note) => {
	const noteElement = createNoteElement(note.id, note.content);
	notesContainer.insertBefore(noteElement, addNoteButton);
});

// "add-note" 버튼을 클릭하면 addNote 함수를 호출
addNoteButton.addEventListener("click", () => addNote());

// 로컬 스토리지에서 저장된 노트를 가져오는 함수
function getNotes() {
	return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

// 노트를 로컬 스토리지에 저장하는 함수
function saveNotes(notes) {
	localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

// 노트 요소를 생성하는 함수
function createNoteElement(id, content) {
	const element = document.createElement("div"); // 부모 div 생성

	const textarea = document.createElement("textarea");
	textarea.classList.add("note");
	textarea.value = content;
	textarea.placeholder = "작성해주세요.";

	// 랜덤 색상 선택하여 textarea의 배경색 설정
	const randomColor = colors[Math.floor(Math.random() * colors.length)];
	textarea.style.backgroundColor = randomColor; // textarea의 배경색 설정

	// 노트의 내용이 변경될 때 updateNote 함수를 호출
	textarea.addEventListener("change", () => {
		updateNote(id, textarea.value);
	});

	// 삭제 버튼 생성
	const deleteButton = document.createElement("button");
	deleteButton.innerText = "🗑️"; // 삭제 아이콘
	deleteButton.classList.add("delete-note");

	// 삭제 버튼 클릭 시 노트 삭제
	deleteButton.addEventListener("click", () => {
		deleteNote(id, element);
	});

	// 삭제 버튼을 노트 요소에 추가
	element.appendChild(textarea);
	element.appendChild(deleteButton); // 삭제 버튼 추가
	return element;
}

// 새로운 노트를 추가하는 함수
function addNote() {
	const notes = getNotes();
	const noteObject = {
		// 노트에 임의의 ID를 부여
		id: Math.floor(Math.random() * 100000),
		content: ""
	};

	// 새로운 노트 요소를 생성하고 addNoteButton 앞에 삽입
	const noteElement = createNoteElement(noteObject.id, noteObject.content);
	notesContainer.insertBefore(noteElement, addNoteButton);

	// 새로운 노트를 노트 배열에 추가하고 저장
	notes.push(noteObject);
	saveNotes(notes);
}

// 노트의 내용을 업데이트하는 함수
function updateNote(id, newContent) {
	const notes = getNotes();
	const targetNote = notes.filter((note) => note.id == id)[0];

	// 해당 노트의 내용을 새로운 내용으로 업데이트
	targetNote.content = newContent;
	saveNotes(notes);
}

// 노트를 삭제하는 함수
function deleteNote(id, element) {
	// 삭제할 노트를 제외한 나머지 노트를 필터링
	const notes = getNotes().filter((note) => note.id != id);

	// 필터링된 노트를 저장하고, 화면에서 해당 노트 요소를 제거
	saveNotes(notes);
	notesContainer.removeChild(element);
}