// script.js
let isValid = false; // 품 체크
let passwordsMatch = false;  // 비밀번호 체크
function signup() {
	const password = document.getElementById('password').value;
	const users = JSON.parse(localStorage.getItem('users')) || [];
    const useremail = document.getElementById('email').value;
	const user = {
		email: signupForm.email.value,
		password: signupForm.password.value,
		name: signupForm.name.value,
		phone: signupForm.phone.value,
		birth : signupForm.birth.value
	};
	
/*	const emails = users.map(user => user.email);

	if (!emails.includes(useremail)){
		users.push(user);
	}
	else{
		alert('중복 ');
	}*/

	//
	for(let i=0;i < users.length; i++ ){
		if(users[i].email == useremail){
			alert('중복 ');
			return;
		}
		
	}
	users.push(user);
	
	window.localStorage.setItem('users', JSON.stringify(users));
	alert('가입 완료');

}


function validateForm() {
	const password2 = document.getElementById('password2').value;
	const password = document.getElementById('password').value;
	const signupForm = document.getElementById('signupForm');
	isValid = signupForm.checkValidity();
	// 폼이 유효하지 않으면
	if (!isValid) {
		// 에러 메시지.

		return;
	}
	// 비번과 비번확인이 서로 일치하면.
	if (password.value === password2.value) {
		// 비번 체크 참
		passwordsMatch = true;

	} else {
		// 거짓으로 하고 
		passwordsMatch = false;
		return;
	}

}





const signupbutton = document.getElementById('signupbutton');

function signupHandler(e) {
    e.preventDefault(); // 새로고침 방지
    validateForm(); // 폼 유효성 검사

    if (isValid && passwordsMatch) { // 폼이 유효하고 비밀번호가 일치하는 경우
        signup(); // 회원가입 처리
		window.location.href = "login.html";
    } else {
        // 유효성 검사 실패 시 알림
        alert('입력 정보를 확인해주세요.');
    }
}
signupbutton.addEventListener("click", signupHandler);