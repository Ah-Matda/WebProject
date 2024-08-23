



function logout() {
    localStorage.removeItem('loginUser'); // 현재 사용자 정보 제거
    alert('로그아웃 되었습니다.');
    window.location.href = 'login.html';
};


const logoutButton = document.getElementById('logoutButton');

function logoutkHandler(){
		logout()
		
        window.location.href = "../html/login.html";
     };
logoutButton.addEventListener("click", logoutkHandler);
