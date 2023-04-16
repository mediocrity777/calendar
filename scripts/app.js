let firstMarch = new Date(1677618000 * 1000);
const dayInMilisec = 864000 * 1000;
const today = new Date();

let color = '';
let month = document.querySelector('.calendar-month');

let calendar = document.querySelector('.calendar__table');
let dateCells = document.querySelectorAll('.calendar__table td');

let prev = document.querySelector('.prev');
let next = document.querySelector('.next');

let now = new Date();


let months = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь'
];

initCalendar(now);

prev.addEventListener('click', () => {
	Date(now.setMonth(now.getMonth() - 1));

	for (let i = 0; i < dateCells.length; i++) {
		if (dateCells[i].classList.contains('inactive')) {
			dateCells[i].classList.remove('inactive');
		}
	}

	initCalendar(now);

	for (let i = 0; i < dateCells.length; i++) {
		if (dateCells[i].classList.contains('inactive')) {
			if (dateCells[i].classList.contains('orange')) {
				dateCells[i].classList.remove('orange');
			} else if (dateCells[i].classList.contains('teal')) {
				dateCells[i].classList.remove('teal');
			}
		}
	}
});

next.addEventListener('click', () => {
	Date(now.setMonth(now.getMonth() + 1));
	for (let i = 0; i < dateCells.length; i++) {
		if (dateCells[i].classList.contains('inactive')) {
			dateCells[i].classList.remove('inactive');
		}
	}

	initCalendar(now);

	for (let i = 0; i < dateCells.length; i++) {
		if (dateCells[i].classList.contains('inactive')) {
			if (dateCells[i].classList.contains('orange')) {
				dateCells[i].classList.remove('orange');
			} else if (dateCells[i].classList.contains('teal')) {
				dateCells[i].classList.remove('teal');
			}
		}
	}
});

function initCalendar(currentDate) {
	let counterDays = 1;
	let counterCells = 1;
	const numberOfCells = 42;

	let currentMonth = currentDate.getMonth();
	let currentYear = currentDate.getFullYear();

	let firstDay = new Date(currentYear, currentMonth, 1);
	let lastDay = new Date(currentYear, currentMonth + 1, 0);

	let offset = firstDay.getDay();
	if (offset === 0) offset = 7;

	let arrOfInactive = getArrOfInactive(firstDay, null, offset);

	month.innerText = `${months[currentMonth]} ${currentYear}`;

	for (let i = 0; i < offset - 1; i++) {
		dateCells[i].innerText = arrOfInactive[i];
		dateCells[i].classList.add('inactive');
		counterCells++;
	}

	for (let i = offset - 1; i <= lastDay.getDate() + offset; i++) {
		dateCells[i].innerText = counterDays;
		calcCleaningDay(currentYear, currentMonth, counterDays, i);
		if (counterDays === lastDay.getDate()) break;
		counterDays++;
		counterCells++;
		if (currentMonth === today.getMonth() && counterDays === today.getDate()) {
			dateCells[i + 1].classList.add('today');
		} else if (currentMonth !== today.getMonth()) {
			dateCells[i + 1].classList.remove('today');
		}

	}

	offset = numberOfCells - counterCells;
	arrOfInactive = getArrOfInactive(null, lastDay, offset);

	let j = 0;
	for (let i = counterCells; i < numberOfCells; i++) {
		dateCells[i].innerText = arrOfInactive[j++];
		dateCells[i].classList.add('inactive');
		counterCells++;
	}
}

function getArrOfInactive(firstDayOfMonth = undefined, lastDayOfMonth = undefined, offset) {
	let days;
	let arrOfInactiveDays = [];

	if (firstDayOfMonth != undefined && firstDayOfMonth != null) {
		days = new Date(firstDayOfMonth.setDate(firstDayOfMonth.getDate() - offset + 1));

		for (let i = 0; i < offset - 1; i++) {
			arrOfInactiveDays.push(days.getDate());
			days.setDate(days.getDate() + 1);
		}

	} else if (lastDayOfMonth != undefined && lastDayOfMonth != null) {
		days = new Date(lastDayOfMonth.setDate(lastDayOfMonth.getDate() + offset));

		for (let i = 0; i < offset; i++) {
			arrOfInactiveDays.push(days.getDate());
			days.setDate(days.getDate() - 1);
		}

		arrOfInactiveDays.reverse();
	}

	return arrOfInactiveDays;
}

function calcCleaningDay(year, month, date, index) {
	let currentDay = new Date(year, month, date);
	let currentDayTime = currentDay.getTime();

	let numOfDays = (currentDayTime - firstMarch.getTime()) / dayInMilisec * 10;
	let color = 'orange';
	let flag = 'orange';
	let num = 0;

	for (let i = 0; i <= numOfDays; i++) {
		if (flag === 'orange') {
			color = 'orange';
			num++;
			if (num > 1) {
				flag = 'teal';
				num = 0;
			}
		} else if (flag === 'teal') {
			color = 'teal';
			num++;
			if (num > 1) {
				flag = 'orange';
				num = 0;
			};
		}
	}

	dateCells[index].classList.add(color);
}





