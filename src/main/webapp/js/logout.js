



function logout() {
    localStorage.removeItem('loginUser'); // 현재 사용자 정보 제거
    alert('로그아웃 되었습니다.');
    window.location.href = '../intro/intro.html';
};


const logoutButton = document.querySelector('#logoutButton');

function logoutHandler(e) {
    e.preventDefault(); // 기본 링크 동작 방지
    logout(); // 로그아웃 함수 호출
}
/*
function logoutkHandler(){
		logout()
		
        window.location.href = "../html/login.html";
     };
	 
*/
// 로그아웃 버튼에 클릭 이벤트 리스너 추가
logoutButton.addEventListener("click", logoutHandler);
