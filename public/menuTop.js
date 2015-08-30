var flag = false;
var sens = 100;
var cSkills = $('#c-skills').position().top - sens;
var cParcours = $('#c-parcours').position().top - sens;
var cWork = $('#c-work').position().top - sens;
var cHobbies = $('#c-hobbies').position().top - sens;

$(document).scroll(function () {

	if ($(document).scrollTop() >= cHobbies) {
		$('#li-skills').css("color", "#f3e5bf")
		.css("background", '#transparent');
		$('#li-work').css("color", "#f3e5bf")
		.css("background", 'transparent');
		$('#li-parcours').css("color", "#f3e5bf")
		.css("background", 'transparent');
		$('#li-hobbies').css("color", "#323434")
		.css("background", '#fec503');
	}
	else if ($(document).scrollTop() >= cWork) {
		$('#li-skills').css("color", "#f3e5bf")
			.css("background", 'transparent');
		$('#li-work').css("color", "#323434")
			.css("background", '#fec503');
		$('#li-parcours').css("color", "#f3e5bf")
			.css("background", 'transparent');
		$('#li-hobbies').css("color", "#f3e5bf")
			.css("background", 'transparent');
	}
	else if ($(document).scrollTop() >= cParcours) {
		$('#li-skills').css("color", "#f3e5bf")
			.css("background", 'transparent');
		$('#li-work').css("color", "#f3e5bf")
			.css("background", 'transparent');
		$('#li-parcours').css("color", "#323434")
			.css("background", '#fec503');
		$('#li-hobbies').css("color", "#f3e5bf")
			.css("background", 'transparent');
	}
	else if ($(document).scrollTop() >= cSkills) {
		$('#li-skills').css("color", "#323434")
		.css("background", '#fec503');
		$('#li-work').css("color", "#f3e5bf")
		.css("background", 'transparent');
		$('#li-parcours').css("color", "#f3e5bf")
		.css("background", 'transparent');
		$('#li-hobbies').css("color", "#f3e5bf")
		.css("background", 'transparent');
	}
	else {
		$('#li-skills').css("color", "#f3e5bf")
		.css("background", 'rgba(0,0,0,0)');
		$('#li-work').css("color", "#f3e5bf")
		.css("background", 'transparent');
		$('#li-parcours').css("color", "#f3e5bf")
		.css("background", 'transparent');
		$('#li-hobbies').css("color", "#f3e5bf")
		.css("background", 'transparent');
	}
	if (!flag && $(document).scrollTop() >= $('header').height() / 2) {
		flag = true;
		$('#menu').animate({
			backgroundColor: "#222222"
		}, 300
		);


		$('#menu').find("li").unbind('mouseenter mouseleave')
		$('#menu').find("li").hover(
			function () {
				if ($(this).css('color') != 'rgb(50, 52, 52)') {
						$(this).animate({
							color: '#fec503'
						}, 100
					);
				}
			}, function () {
				if ($(this).css('color') != 'rgb(50, 52, 52)') {
						$(this).animate({
							color: '#f3e5bf'
						}, 100
					);
				}
			}
			);
	}
	else if (flag && $(document).scrollTop() < $('header').height() / 2) {
		flag = false;
		$('#menu').animate({
			backgroundColor: "transparent"
		}, 300
		);

		$('#menu').find("li").unbind('mouseenter mouseleave')
		$('#menu').find("li").hover(
			function () {
				$(this).animate({
					color: '#fec503'
				}, 100
				);
			}, function () {
				$(this).animate({
					color: '#f3e5bf'
				}, 100
				);
			}
			);
	}
});