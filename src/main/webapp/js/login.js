
let loginMatch = false;



function login() {
    const loginemail = document.getElementById('loginemail').value;
    const loginpassword = document.getElementById('loginpassword').value;
	const users = JSON.parse(localStorage.getItem('users')) || [];

    

	for(let i=0;i < users.length; i++ ){
		if(users[i].email == loginemail){
			if(users[i].password == loginpassword){
				localStorage.setItem('loginUser', loginemail); // 현재 로그인한 사용자 저장
				alert('로그인 성공!');
				window.location.href = "../html/main.html";
				return ;
				
			}	
		}
	}

	alert('로그인 실패!');

};


const loginbutton = document.getElementById('loginbutton');

function loginHandler(){
		login()
		
      
     }
loginbutton.addEventListener("click", loginHandler);



