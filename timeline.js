const dateSince = new Date('2011');
const dateUntil = new Date('2017');
var nbTotalYears = dateUntil.getFullYear() - dateSince.getFullYear();
var nbTotalDays = dateDiff(dateSince, dateUntil).day;
var nbTimeline = 0;

function dateDiff(date1, date2) {
  var diff = {}                           // Initialisation du retour
  var tmp = date2 - date1;

  tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
  diff.sec = tmp % 60;                    // Extraction du nombre de secondes

  tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
  diff.min = tmp % 60;                    // Extraction du nombre de minutes

  tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
  diff.hour = tmp % 24;                   // Extraction du nombre d'heures

  tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
  diff.day = tmp;

  return diff;
}

function setTimeyear() {
  var timelinesYears = $('.timelines-years');
  var dateLoop = new Date(dateSince);

  while (dateLoop < dateUntil) {
    timelinesYears.append($('<li>').html(dateLoop.getFullYear()));
    dateLoop.setFullYear(dateLoop.getFullYear() + 1);
  }

  timelinesYears.find('li').each(function() {
    $(this).css('width', (100 / nbTotalYears) + '%');
  });
}

function getPos(since) {
  var dSince = new Date(since);
  return ((100 / nbTotalDays) * (dateDiff(dateSince, dSince).day + 365 / 2));
}

function addTimeline(title, desc, since, until, color, labelBottom) {
  var dSince = new Date(since);
  var dUntil = new Date(until);

  var timelinesEvents = $('.timeline-events');
  var content = $('<li>')
  .addClass('content-event-years')
  .css('width', (100 / nbTotalDays * dateDiff(dSince, dUntil).day) + '%')
  .css('bottom', (nbTimeline * 16) + 'px')
  .css('left', getPos(dSince) + '%');

  var timelinesYears = $('<div>')
  .addClass('timeline-event-years')
  .css('background', color);

  var divDesc = $('<div>')
  .addClass('timeline-desc')
  .css('position', 'relative');

  divDesc.append($('<h1>').css('color', color).html(title));
  divDesc.append($('<h2>').html(desc));
	if (nbTimeline == 0) {
		divDesc.append($('<h3>').html(until.substr(0, 4)));
	} else if (dUntil < new Date()) {
		divDesc.append($('<h3>').html(since.substr(0, 4) + ' - ' + until.substr(0, 4)));
  } else {
		divDesc.append($('<h3>').html(since.substr(0, 4)));
  }
  if (labelBottom) {
    divDesc.css('top', '40px');
  } else {
    divDesc.css('bottom', '160px');
  }
  timelinesYears.append(divDesc);
  content.append(timelinesYears);
  timelinesEvents.append(content);
  nbTimeline++;
  // addDesc(title, desc, since.substr(0, 4) + ' - ' + until.substr(0, 4), color);
}

function fadeFirstAndLast() {
  var eventFirst = $('.timeline-event-years').first();
	var eventBLast = $('.timeline-event-years').eq(-2);
  var eventLast = $('.timeline-event-years').last();

  eventFirst.css('background', 'linear-gradient(to right, #262422, ' + eventFirst.css('background-color')  + ')');
	eventBLast.css('background', 'linear-gradient(to left, #262422, ' + eventBLast.css('background-color')  + ')');
  eventLast.css('background', 'linear-gradient(to left, #262422, ' + eventLast.css('background-color')  + ')');
}

function addDesc(title, desc, years, color) {
  var timelineDesc = $('.timeline-desc');

  var li = $('<li>').addClass('event-desc');

  li.append($('<h1>')
  .css('color', color)
  .html(title.toUpperCase()));
  li.append($('<h2>').html(desc));
  li.append($('<h3>').html(years));

  timelineDesc.append(li);
}

function adaptWidthDesc() {
  var timelineDesc = $('.timeline-desc');

  timelineDesc.find('li').each(function () {
    $(this).css('width', (100 / nbTimeline - 1) + '%');
  });
}

setTimeyear();

addTimeline('Bac S', 'Bac scientifique - Lycée porte de Normandie', '2010 sep', '2012 jul', '#88A725', false);
addTimeline('CDI étudiant', 'Grande surface', '2012 mar', '2014 sep', '#CF4024', true);
addTimeline('DUT TC', 'Techniques de commercialisation - IUT d\'Evreux', '2012 sep', '2014 jun', '#ED8C2B', false);
addTimeline('école 42', 'Paris 17ème', '2014 nov', '2016 nov', '#DAA420', true);
addTimeline('Stage - Parrot', 'Service qualité - Software', '2016 feb', '2016 nov', '#5EB6DD', false);

fadeFirstAndLast();
adaptWidthDesc();
