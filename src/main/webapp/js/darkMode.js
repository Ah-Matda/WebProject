/**
 * 다크 모드
 */

document.addEventListener('DOMContentLoaded', function () {
    let toggleDarkModeSwitch = document.getElementById('toggleDarkMode');
    
    // 페이지 로드 시 다크 모드 상태 유지
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
        toggleDarkModeSwitch.checked = true; // 스위치 켜짐 상태로 설정
    }
    
    toggleDarkModeSwitch.addEventListener('change', function () {
        if (toggleDarkModeSwitch.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', 'disabled');
        }
    });
});