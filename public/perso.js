function Manue(skills, parcours, work, hobbies) {
	this.firstName = 'Emmanuelle';
	this.lastName = 'Termeau';
	this.old = 21;
	this.region = ['Paris', 'Région Parisienne'];
	this.diploma = 'Architecte en technologie numérique';
	this.contact = {
		mail: {
			data: 'emtermea@student.42.fr',
			img: '/img/mail_'
		},
		tel: {
			data: '06 50 65 42 57',
			img: '/img/tel_'
		},
        github: {
            data: '/emtermea',
            img: '/img/github_'
        }
	};
	this.skills = skills;
	this.parcours = parcours;
	this.work = work;
	this.hobbies = hobbies;
}

Manue.prototype._renderSkPro = function (sk, rayon) {

	var cont = $('#sk-pro').css('height', (2 * rayon) + 'px').css('width', (2 * rayon) + 'px');
	$('#cont-diag').css('height', (2 * rayon) + 'px').css('width', (2 * rayon) + 'px');

	var options = {
		segmentStrokeWidth: 10,
		segmentStrokeColor: "rgba(33,31,30,1)",
		percentageInnerCutout: 90,
		animationEasing: "easeOutQuad",
		legendTemplate: "",
	};

	var can = $('<canvas></canvas>')
		.attr('id', 'sk-can-pro')
		.attr('height', 2 * rayon)
		.attr('width', 2 * rayon);

	cont.append(can);

	var total = (function (sk) {
		var res = 0;
		for (i in sk)
			res += sk[i].level;
		return res;
	})(sk);

	var data = [];
	var prog = 0;
	for (i in sk) {
		prog += sk[i].level;
		var diff = sk[i].level / 2;
		var pc = (prog - diff) / total - 0.25;
		if (prog / total - 0.25 < 0.25) {
			var x = Math.cos(pc * 2 * Math.PI) * (rayon) + rayon + 20;
			var y = Math.sin(pc * 2 * Math.PI) * (rayon) + rayon - 39;
		} else if (prog / total - 0.25 < 0.50) {
			var x = Math.cos(pc * 2 * Math.PI) * (rayon) + rayon;
			var y = Math.sin(pc * 2 * Math.PI) * (rayon) + rayon;
		} else if (prog / total - 0.25 < 0.75) {
			var x = Math.cos(pc * 2 * Math.PI) * (rayon) + rayon - 110;
			var y = Math.sin(pc * 2 * Math.PI) * (rayon) + rayon;
		} else {
			var x = Math.cos(pc * 2 * Math.PI) * (rayon) + rayon - 100;
			var y = Math.sin(pc * 2 * Math.PI) * (rayon) + rayon - 40;
		}

		cont.append($('<div class="sk-label sk-label-pro"></div>')
			.css('top', y)
			.css('left', x)
			.css('color', sk[i].color)
			.html(sk[i].name)
		);
		data.push({
			label: sk[i].name,
			value: sk[i].level,
			color: sk[i].color
		});
	}

	var ctx = document.getElementById('sk-can-pro').getContext("2d");
	window.myDoughnut = new Chart(ctx).Doughnut(data, options);
}

Manue.prototype._renderSkLang = function (sk, exRayon, rayon) {
	var cont = $('#sk-languages')
		.css('height', (2 * rayon) + 'px')
		.css('width', (2 * rayon) + 'px')
		.css('left', exRayon - rayon)
		.css('top', exRayon - rayon);


	var options = {
		segmentStrokeWidth: 0,
		segmentStrokeColor: "rgba(255,255,255,0)",
		percentageInnerCutout: 0,
		animation: false,
		legendTemplate: "",
	};

	var can = $('<canvas></canvas>')
		.attr('id', 'sk-can-lang')
		.attr('height', 2 * rayon)
		.attr('width', 2 * rayon);
	cont.append(can);

	var total = (function (sk) {
		var res = 0;
		for (i in sk)
			res += sk[i].level;
		return res;
	})(sk);

	var data = [];
	var prog = 0;
	for (i in sk) {
		prog += sk[i].level;
		var diff = sk[i].level / 2;
		var pc = (prog - diff) / total - 0.25;
		if ((prog - sk[i].level) / total < 0.25) {
			var x = Math.cos(pc * 2 * Math.PI) * (rayon - 30) + rayon;
			var y = Math.sin(pc * 2 * Math.PI) * (rayon - 30) + rayon;
		} else if ((prog - sk[i].level) / total < 0.50) {
			var x = Math.cos(pc * 2 * Math.PI) * (rayon - 30) + rayon - 30;
			var y = Math.sin(pc * 2 * Math.PI) * (rayon - 30) + rayon - 20;
		} else if ((prog - sk[i].level) / total < 0.75) {
			var x = Math.cos(pc * 2 * Math.PI) * (rayon - 30) + rayon - 10;
			var y = Math.sin(pc * 2 * Math.PI) * (rayon - 30) + rayon - 10;
		} else {
			var x = Math.cos(pc * 2 * Math.PI) * (rayon - 30) + rayon - 20;
			var y = Math.sin(pc * 2 * Math.PI) * (rayon - 30) + rayon - 20;
		}
		cont.append($('<div class="sk-label sk-label-lang"></div>')
			.css('top', y)
			.css('left', x)
			.css('color', '#f3e5bf')
			.html(sk[i].name)
		);
		data.push({
			label: sk[i].name,
			value: sk[i].level,
			color: sk[i].color
		});
	}

	var ctx = document.getElementById('sk-can-lang').getContext("2d");
	window.myDoughnut = new Chart(ctx).Doughnut(data, options);
}

Manue.prototype.renderSkill = function () {
	var rayon = 200;
	this._renderSkPro(this.skills.pro, rayon);
	this._renderSkLang(this.skills.language, rayon, rayon - 50);
};

function getGap(date1, date2) {

	var d1 = {
		m: date1.substr(0, 2),
		y: date1.substr(3, 4),
	};
	var d2 = {
		m: date2.substr(0, 2),
		y: date2.substr(3, 4),
	};


	if (d1.y == d2.y)
		return (Math.abs(d1.m - d2.m));
	else if (d1.y < d2.y) {
		if (d1.m < d2.m) {
			return (Math.abs(d1.y - d2.y) * 12) + Math.abs(d2.m - d1.m);
		} else(d1.m > d2.m)
		return (Math.abs(d1.y - d2.y) * 12) - Math.abs(d2.m - d1.m);
	} else {
		if (d1.m < d2.m) {
			return (Math.abs(d1.y - d2.y) * 12) - Math.abs(d2.m - d1.m);
		} else(d1.m > d2.m)
		return (Math.abs(d1.y - d2.y) * 12) + Math.abs(d2.m - d1.m);
	}
};

function putYear(date, firstDate, bigGap, last) {

	var cont = $('#time-year');
	var gap = getGap(firstDate, date);
	var contYear = $('<div class="year"></div>');

	if (last > -1) {
		if (last == 1)
			contYear.html('<div class="puce-in-progess">•</div><div class="last-date">' + date.substr(3, 4) + '</div>');
		else if (last == 0)
			contYear.html('<div class="puce">•</div><div class="date">' + date.substr(3, 4) + '</div>');
		contYear.css('left', ((gap / bigGap) * 100) + "%");
		cont.append(contYear);
	}
}

function putPromo(tm, firstDate, bigGap, first) {
	var cont = $('#time-promo');
	var gap = getGap(firstDate, tm.promo);
	var contPromo = $('<div class="promo"></div>');

	if (first) {
		var name = $('<div class="pm-first-name"></div>');
		name.html(tm.name);

		var desc = $('<div class="pm-first-desc"></div>');
		desc.html(tm.desc);
	} else {
		var name = $('<div class="pm-name"></div>');
		name.html(tm.name);

		var desc = $('<div class="pm-desc"></div>');
		desc.html(tm.desc);
	}

	contPromo.append(name).append(desc);

	contPromo.css('left', ((gap / bigGap) * 100) + "%");
	cont.append(contPromo);
}

Manue.prototype.renderParcours = function () {
	var cont = $('#cont-parcours');

	var timeline = $('#timeline');
	var line = $('<div class="line-dashed"></div>');

	var firstDate = "10/" + (parseInt(this.parcours.slice(-1)[0].promo.substr(3, 4)) - 1);
	var lastDate = "01/" + (parseInt(this.parcours[0].promo.substr(3, 4)) + 2);
	// console.log(firstDate, lastDate)
	var bigGap = getGap(firstDate, lastDate);

	var iDate = firstDate;
	var y = 0;
	while (iDate != lastDate) {
		if ("01/" + (parseInt(iDate.substr(3, 4)) + 1) == lastDate)
			putYear(iDate, firstDate, bigGap, 1);
		else if (y)
			putYear(iDate, firstDate, bigGap, 0);
		else
			putYear(iDate, firstDate, bigGap, -1);
		iDate = "01/" + (parseInt(iDate.substr(3, 4)) + 1);
		y++;
	}

	for (i in this.parcours) {
		if (i == 0) {
			putPromo(this.parcours[i], firstDate, bigGap, true);
		} else {
			putPromo(this.parcours[i], firstDate, bigGap, false);
		}
	}

	timeline.append(line);
	cont.append(timeline);
};

Manue.prototype.renderWork = function () {
	var cont = $('#cont-work');

	for (i in this.work) {
		var elem = {
			div: $('<div class="work-cont"></div>'),
			desc: $('<div class="work-desc"></div>'),
			bg: $('<div class="work-bg" style="background: url(\'' + this.work[i].img + '\') center center; background-size: cover;"></div>'),
			name: $('<div class="work-name">' + this.work[i].name + '</div>'),
			detail: $('<div class="work-detail">' + this.work[i].detail + '</div>')
		};
		var ghost = $('<a href="#" class="ghost">+</a>');
		elem.bg.append(ghost);
		elem.desc.append(elem.bg);
		elem.desc.append(elem.name);
		elem.desc.append(elem.detail);
		elem.div.append(elem.desc);

		cont.append(elem.div);
	}
};

Manue.prototype.renderHobbies = function () {
	var cont = $('#cont-hobbies');

	for (i in this.hobbies) {
		var elem = {
			div: $('<div class="hobbies-cont" style="width:300px"></div>'),
			img: $('<div class="hobbies-img"><img src="' + this.hobbies[i].img + '" height="100px"></div>'),
			desc: $('<div class="hobbies-desc"></div>'),
			name: $('<div class="hobbies-name"></div>').html(this.hobbies[i].name),
			detail: $('<div class="hobbies-detail"></div>').html(this.hobbies[i].detail),
		};

		elem.div.append(elem.img);

		elem.desc.append(elem.name);
		elem.desc.append(elem.detail);
		elem.div.append(elem.desc);
		cont.append(elem.div);
	}
};

Manue.prototype.renderFooter = function () {
	var cont = $('#cont-middle');

	var email = $('<div class="contact"></div>');
	var tel = $('<div class="contact"></div>');
    var github = $('<div class="contact"></div>');
                   
	var cont_email = $('<a class="cont-contact" href="mailto:' + this.contact.mail.data + '" id="email"></a>');
	var cont_tel = $('<a class="cont-contact" href="tel:' + this.contact.tel.data.replace(/\ /g, "") + '"id="tel"></a>');
    var cont_github = $('<a class="cont-contact" href="https://github.com' + this.contact.github.data + '" id="github"></a>');


	var img_email = $('<div class="img_contact"><div id="img_email"></div></div>');
	var img_tel = $('<div class="img_contact"><div id="img_tel"></div></div>');
    var img_github = $('<div class="img_contact"><div id="img_github"></div></div>');

	var data_email = $('<div class="data">' + this.contact.mail.data + '</div>');
	var data_tel = $('<div class="data">' + this.contact.tel.data + '</div>');
    var data_github = $('<div class="data">' + this.contact.github.data + '</div>');
    
    cont_github.append(img_github);
    cont_github.append(data_github);
	cont_email.append(img_email);
	cont_email.append(data_email);
	cont_tel.append(img_tel);
	cont_tel.append(data_tel);

    github.append(cont_github);
	email.append(cont_email);
	tel.append(cont_tel);

    cont.append(github);
	cont.append(email);
	cont.append(tel);
};


var skills = {
	pro: [
		{
			name: 'programmation imperative',
			level: 1096,
			color: '#daa420'
		},
		{
			name: 'algorithme',
			level: 950,
			color: '#930e48'
		},
		{
			name: 'graphique',
			level: 390,
			color: '#d04a2e'
		},
		{
			name: 'web',
			level: 295,
			color: '#88a725'
		},
		{
			name: 'programmation orientée object',
			level: 160,
			color: '#ed8c2b'
		}
	],

	perso: [
		{
			name: 'créativité',
			level: 5
		},
		{
			name: 'adaption',
			level: 4
		},
		{
			name: 'rigueur',
			level: 5
		},
	],

	language: [
		{
			name: 'C',
			level: 200,
			color: '#88a725'
		},
		{
			name: 'Ruby',
			level: 50,
			color: '#8c1c2c'
		},
		{
			name: 'Python',
			level: 85,
			color: '#d04a2e'
		},
		{
			name: 'Php',
			level: 40,
			color: '#33203a'
		},
		{
			name: 'Prolog',
			level: 40,
			color: '#ed8c2b'
		},
		{
			name: 'Html',
			level: 40,
			color: '#daa420'
		},
		{
			name: 'Css',
			level: 40,
			color: '#930e48'
		},
	],

	speaking: [
		{
			name: 'Français',
			level: 5
		},
		{
			name: 'Anglais',
			level: 3
		},
	]
};

var parcours = [
	{
		name: 'Ecole 42',
		promo: '11/2014',
		desc: 'En cours de preparation - Paris 17ème',
		logo: 'http://www.cfa-stephenson.fr/sites/default/files/images/%C3%A9cole%2042%20logo.png'
	},
	{
		name: 'DUT <span>Techniques de commercialisation</span>',
		promo: '01/2014',
		desc: 'IUT d\'Evreux (27)',
		logo: 'http://www.nae.fr/wp-content/uploads/2014/06/IUT_evreux1.jpg'
	},
	{
		name: 'Bac <span>Scientifique</span>',
		promo: '01/2012',
		desc: 'Lycée Porte de Normandie (27) - Mention Bien',
		logo: 'http://www.festivaleure.com/2010/logos/lycee_verneuil.jpg'
	},
];

var work = [
	{
		name: 'wolf3d',
		detail: 'Je t\'aime ma cherie d\'amour',
		img: 'http://apple2history.org/wp-content/uploads/2012/05/Wolf3d-title.jpg'
	},
	{
		name: 'computor_v1',
		detail: 'I\'m a banana',
		img: 'http://www.stem-link.org/wp-content/uploads/2014/10/Math-Circle.jpg'
	},
	{
		name: '2048',
		detail: 'Aliquam a ipsum pellentesque lorem',
		img: 'http://gabrielecirulli.github.io/2048/meta/og_image.png'
	},
	{
		name: 'fdf',
		detail: 'Etiam pharetra rutrum porta. Proin sapien',
		img: 'http://i.stack.imgur.com/wZYoC.jpg'
	},
	{
		name: 'libft',
		detail: 'Aenean efficitur est sem, sit',
		img: '/img/lib.png'
	},
];

var hobbies = [
	{
		name: 'sports',
		detail: 'Phasellus lectus turpis, sollicitudin at auctor eget, elementum at nunc',
		img: '/img/sport.png'
	},
	{
		name: 'séries TV',
		detail: 'Sed at facilisis nisl. Aenean bibendum urna sed porta pretium',
		img: '/img/pop.png'
	},
	{
		name: 'domaine associatif',
		detail: 'BDE de l\'ecole 42 - Festi’Routils',
		img: '/img/assoc.png'
	},
];

var manue = new Manue(skills, parcours, work, hobbies);
manue.renderSkill();
manue.renderParcours();
manue.renderWork();
manue.renderHobbies();
manue.renderFooter();