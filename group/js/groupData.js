const groupContainer = document.getElementsByClassName('group-container')[0];
const goalContainer = document.getElementsByClassName('goal-container')[0];
const todoNameDiv = document.getElementsByClassName('todo-name')[0];
const bestUserNameDiv = document.getElementsByClassName('best-username')[0];
const bestAmountDiv = document.getElementsByClassName('best-amount')[0];
const unitDiv = document.getElementsByClassName('unit')[0];
const updateButton = document.getElementsByClassName('registration-btn')[0];
const checkBox = document.getElementById('check');
const unitBox = document.getElementsByClassName('unit-box')[0];

let selectedGroupNo = 0;

showUsersGroups();

// 유저가 가입한 그룹 보여주기
async function showUsersGroups() {
    groupContainer.innerHTML = '';
    const groups = await axios.get(`${BASE_URL}/users/${USER_NO}/groups`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error);
            return null;
        });

    showGroupsTodo(groups[0].group_no);

    for (let group of groups) {
        const groupBox = document.createElement('div');
        groupBox.className = 'group-box';

        const groupName = document.createElement('p');
        groupName.className = 'group-name';
        groupName.innerHTML = group.group_name;

        const groupMember = document.createElement('div');
        groupMember.className = 'group-member';

        const num = document.createElement('p');
        num.className = 'num';
        const count = await getGroupMemberCount(group.group_no);
        num.innerHTML = count + "";

        const userIcon = document.createElement('i');
        userIcon.classList.add('bx');
        userIcon.classList.add('bx-user');

        groupMember.appendChild(num);
        groupMember.appendChild(userIcon);
        groupBox.appendChild(groupName);
        groupBox.appendChild(groupMember);
        groupContainer.appendChild(groupBox);

        groupBox.onclick = () => {
            showGroupsTodo(group.group_no);
        }
    }
}

// 선택된 그룹의 투두 보여주기
async function showGroupsTodo(groupNo) {
    selectedGroupNo = groupNo;

    const group = await axios.get(`${BASE_URL}/groups/${groupNo}`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
            return null;
        });

    todoNameDiv.innerHTML = group.group_todo;
    unitDiv.innerHTML = group.group_unit;
    const bestUserName = await getUserName(group.bestuser_no);
    bestUserNameDiv.innerHTML = bestUserName + '님,';
    bestAmountDiv.innerHTML = group.group_bestamount + group.group_unit;
}

// 그룹에 가입된 멤버 수 구하기
async function getGroupMemberCount(groupNo) {
    const count = await axios.get(`${BASE_URL}/groups/${groupNo}/users`)
        .then(response => {
            return response.data.length;
        })
        .catch(error => {
            console.error(error);
            return [];
        })

    return count;
}

// 베스트 유저의 이름 가져오기
async function getUserName(userNo) {
    const name = await axios.get(`${BASE_URL}/users/${userNo}`)
        .then(response => response.data.user_name)
        .catch(error => {
            console.error(error);
            return 'name';
        })

    return name;
}

// 그룹 목표 업데이트 하기 }
updateButton.onclick = () => {
    const value = unitBox.value.trim();
    if (value.length === 0) return;

    const request = {
        user_no: USER_NO,
        amount: value
    };
    
    console.log(request);   
    axios.patch(
        `${BASE_URL}/groups/${selectedGroupNo}/todos`, request
    )
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    });

    location.reload();
}