const formElem = document.querySelector('#formElem');
const plan = document.querySelector('#plan');
const priority = document.querySelector('#priority');
const remainingTasks = document.querySelector('#remaining-tasks');
const completedTasks = document.querySelector('#completed-tasks');

const remainingTasksInfo = [];
const completedTasksInfo = [];

const getIndex = (element) => {
  return element.parentElement.parentElement.getAttribute('data-index');
};

const checkForComplete = () => {
  remainingTasks.querySelectorAll('#completed-btn').forEach((el) =>
    el.addEventListener('click', (e) => {
      index = getIndex(e.target);
      completedTasksInfo.push(remainingTasksInfo[index]);
      renderCompleted();
      remainingTasksInfo.splice(index, 1);
      renderRemaining();
    })
  );
};

const checkForDel = () => {
  document.querySelectorAll('#delete-btn').forEach((el) =>
    el.addEventListener('click', (e) => {
      index = getIndex(e.target);
      parent = e.target.parentElement.parentElement.parentElement;
      if (parent !== null) {
        parent.id === 'remaining-tasks'
          ? remainingTasksInfo.splice(index, 1)
          : completedTasksInfo.splice(index, 1);
      }
      renderRemaining();
      renderCompleted();
    })
  );
};

const renderCompleted = () => {
  let i = 0;
  completedTasks.innerHTML = '';
  completedTasksInfo.forEach((info) => {
    completedTasks.innerHTML += `
      <div class="task-card" data-index="${i}">
      <h4>${info.plan}</h4>
      <div>
      <button id="delete-btn">&#10008;</button>
      </div>
      </div>
      `;
    i++;
  });
  checkForDel();
};

const renderRemaining = () => {
  let i = 0;
  remainingTasks.innerHTML = '';
  remainingTasksInfo.forEach((info) => {
    remainingTasks.innerHTML += `
      <div class="task-card" data-index="${i}">
      <h4>${info.plan}</h4>
      <div>
      <button id="completed-btn">&#10004;</button>
      <button id="delete-btn">&#10008;</button>
      </div>
      </div>
      `;
    i++;
  });
  checkForComplete();
  checkForDel();
};

const onSubmitCLick = (e) => {
  e.preventDefault();
  if (plan.value !== '') {
    inputInfo = new Object();
    inputInfo.plan = plan.value;
    priority.options[priority.selectedIndex].value === 'high'
      ? (inputInfo.selectedPriority = 2)
      : priority.options[priority.selectedIndex].value === 'medium'
      ? (inputInfo.selectedPriority = 1)
      : (inputInfo.selectedPriority = 0);

    remainingTasksInfo.push(inputInfo);

    remainingTasksInfo.sort((a, b) =>
      a.selectedPriority < b.selectedPriority ? 1 : -1
    );

    plan.value = '';
    renderRemaining();
  } else {
    alert('Enter something');
  }
};

formElem.addEventListener('submit', onSubmitCLick);
