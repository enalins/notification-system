const myForm = document.querySelector('form[name="fake-form"]');

function validateForm(form) {
	let message = {
		status: "",
		error: [],
		message: ""
	}

	let
		name = form.name.value.length > 1,
		lastName = form.lastName.value.length > 1,
		email = form.email.value.length > 0 && form.email.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
		password = form.password.value.length > 6;

	if(!password){
		message.status = "error";
		message.error.push(form.password);
		message.message = "Your password is invalid, it has to be 6 characters or more.";
	}
	if(!email){
		message.status = "error";
		message.error.push(form.email);
		message.message = "This is not a valid E-mail.";
	}
	if(!lastName){
		message.status = "error";
		message.error.push(form.lastName);
		message.message = "Fill the form with a valid last name.";
	}
	if(!name){
		message.status = "error";
		message.error.push(form.name);
		message.message = "Fill the form input with a valid name.";
	}

	if(name && lastName && email && password){
		message.status = "success";
		message.message = "All set!<br>Now let's get to the business.";
	}

	return message
}

function pushNotification(result){
	let body = document.querySelector('body');

	let oldNotification = document.querySelector('.notification');
	if(typeof oldNotification	!== 'undefined' && oldNotification !== null){
		body.removeChild(oldNotification);
	}

	let notification = document.createElement('div');
	notification.classList.add('notification', 'entry', result.status);
	notification.innerHTML = `
		<div class="notification__icon"></div>
		<div class="notification__text">
			<h2 class="notification__text__title">${result.status}!</h2>
			<p class="notification__text__message">${result.message}</p>
		</div>
		<button type="button" class="notification__close">&times;</button>
		<div class="notification__timer">
			<div class="notification__timer__progress"></div>
		</div>
	`;

	body.appendChild(notification);
	setTimeout(()=>{
		if(typeof notification	!== 'undefined' && notification !== null){
			body.removeChild(notification);
		}
	}, 6010);
}

myForm.onsubmit = (e) => {
	e.preventDefault();

	let result = validateForm(myForm);
	pushNotification(result);
};