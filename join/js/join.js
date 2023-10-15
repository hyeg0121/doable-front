const nameInput = document.getElementById('name-input');
const idInput = document.getElementById('id-input');
const pwInput = document.getElementById('pw-input');
const pwCheckInput = document.getElementById('pw-check');
const mailInput = document.getElementById('mail-id-input');
const mailDomainSelbox = document.getElementById('selbox');
const mailDomainInput = document.getElementById('selboxDirect');
const joinButton = document.getElementsByClassName('join-btn')[0];

let checkPW = () => {
    let pw = pwInput.value;
    let check = pwCheckInput.value;

    if (pw != check) {
        // TODO: 경고 문구 디자인하기
        alert('비밀번호가 같지 않습니다.');
    } 
};

pwCheckInput.onblur = checkPW;

joinButton.onclick = () => {

    let name = nameInput.value;
    let memberId = idInput.value;
    let password = pwInput.value;
    let email = mailInput.value + '@' + mailDomainSelbox.value;

    const userData = {
        name: name,
        memberId: memberId,
        password: password,
        email: email
      };

    axios.post('http://localhost:8080/api/members/member', userData)
    .then(response => {
        console.log('Registration successful:', response.data);
    })
    .catch(error => {
        console.error('Registration failed:', error);
    });
};