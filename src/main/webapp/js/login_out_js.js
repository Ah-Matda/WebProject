document.addEventListener("DOMContentLoaded", function() {
	let container = document.getElementById('container');

	toggle = () => {
		container.classList.toggle('sign-in');
		container.classList.toggle('sign-up');
	};

	setTimeout(() => {
		container.classList.add('sign-in');
	}, 200);

	let isValid = false; // 폼 체크
	let passwordsMatch = false; // 비밀번호 체크

	// 회원가입 처리 함수
	function signup() {
		const users = JSON.parse(localStorage.getItem('users')) || [];
		const useremail = document.getElementById('email').value; // 회원가입 폼의 이메일 입력
		const user = {
			email: useremail,
			password: document.getElementById('password').value,
			name: document.getElementById('name').value,
			phone: document.getElementById('phone').value,
			birth: document.getElementById('birth').value
		};

		for (let i = 0; i < users.length; i++) {
			if (users[i].email === useremail) {
				alert('중복된 이메일입니다.');
				return;
			}
		}
		users.push(user);
		localStorage.setItem('users', JSON.stringify(users));
		alert('가입 완료');
	}

	// 폼 유효성 검사 함수
	function validateForm() {
		const password2 = document.getElementById('password2').value;
		const password = document.getElementById('password').value;
		const signupForm = document.getElementById('signupForm');
		isValid = signupForm.checkValidity();

		if (!isValid) {
			return; // 유효하지 않으면
		}

		passwordsMatch = password === password2; // 비밀번호 확인
	}

	const signupbutton = document.getElementById('signupbutton');

	function signupHandler(e) {
		e.preventDefault(); // 새로고침 방지
		validateForm(); // 폼 유효성 검사

		if (isValid && passwordsMatch) {
			signup(); // 회원가입 처리
		} else {
			alert('입력 정보를 확인해주세요.');
		}
	}

	signupbutton.addEventListener("click", signupHandler);

	// 로그인 처리 함수
	function login() {
		const loginemail = document.getElementById('username').value;
		const loginpassword = document.getElementById('signin-password').value;
		console.log("Login Email:", loginemail);
		console.log("Login Password:", loginpassword);
		const users = JSON.parse(localStorage.getItem('users')) || [];

		for (let i = 0; i < users.length; i++) {
			if (users[i].email === loginemail) {
				if (users[i].password === loginpassword) {
					localStorage.setItem('loginUser', loginemail); // 현재 로그인한 사용자 저장
					alert('로그인 성공!');
					window.location.href = "../html/dailyList.html"; // 로그인 성공 시 이동
					return;
				}
			}
		}

		alert('로그인 실패!'); // 로그인 실패 시 알림
	};

	const loginbutton = document.getElementById('loginbutton');

	function loginHandler(e) {
		e.preventDefault(); // 새로고침 방지
		login(); // 로그인 처리
	}

	// 로그인 버튼에 클릭 이벤트 리스너 등록
	loginbutton.addEventListener("click", loginHandler);
});
