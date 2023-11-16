const groupContainer = document.getElementsByClassName('group-container')[0];
const goalContainer = document.getElementsByClassName('goal-container')[0];
const todoNameDiv = document.getElementsByClassName('todo-name')[0];
const bestUserNameDiv = document.getElementsByClassName('best-username')[0];
const bestAmountDiv = document.getElementsByClassName('best-amount')[0];
const unitDiv = document.getElementsByClassName('unit')[0];

showUsersGroups();

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

        groupBox.onclick = ( ) => {
            showGroupsTodo(group.group_no);
        }
    }
}

async function showGroupsTodo(groupNo) {
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
    bestUserNameDiv.innerHTML = group.bestuser_no + '님,';
    bestAmountDiv.innerHTML = group.group_beatamount + group.group_unit;
}

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