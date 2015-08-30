function renderSkPro(sk) {
    
    var options = {
        segmentStrokeWidth : 0,
        segmentStrokeColor : "rgba(0,0,0,0)",
        percentageInnerCutout : 60,
        animationEasing : "easeOutBounce",
        legendTemplate : "",
    };
    

    var data = [];
    for (i in sk) {
        var percent = Math.round((sk[i].level/800) * 100);
        var elem = $('#sk-pro');
        var elem_sk = $("<div class='sk-pro'></div>");
        elem_sk.append($('<canvas></canvas>').attr("id", sk[i].name).attr("width", 100));
        elem_sk.append($("<div class='sk-percent'></div>").html('<div class="sk-percent-align">' + percent.toString() + '%</div>'));
        elem_sk.append($('<p></p>').html(sk[i].name));
        
        elem.append(elem_sk);

        data = [
            {label: sk[i].name, value: sk[i].level, color: sk[i].color},
            {label: sk[i].name, value: 800 - sk[i].level, color: 'rgba(0,0,0,0)'},
            
        ];
        var ctx = document.getElementById(sk[i].name).getContext("2d");
        window.myDoughnut = new Chart(ctx).Doughnut(data, options);
    }
}

function renderSkPerso(sk) {
    var elem = $('#sk-perso');
    var cont_sk_perso = $('<div id="cont-sk-perso"></div>');
    var table = $('<table cellpadding=2 cellspacing=20></table>');

    for (i in sk) {
        var tr = $('<tr class="sk-perso"></tr>');
        tr.append($('<td class="sk-perso-name"></td>').html(sk[i].name));

        var stars = $('<td class="sk-perso-level"></td>');
        for (var j = 0; j < 5; j++) {
            if (j < sk[i].level)
                stars.append($('<img src="http://trevieres.eu/camping-municipal/wp-content/uploads/2012/11/etoile-20jaune-1-4c90dc.jpg" height="40px">'));   
            else
                stars.append($('<img class="img-bw" src="http://trevieres.eu/camping-municipal/wp-content/uploads/2012/11/etoile-20jaune-1-4c90dc.jpg" height="40px">'));
        }
        tr.append(stars);
        table.append(tr);
    };
    cont_sk_perso.append(table);
    elem.append(cont_sk_perso);

//    $('#sk-perso').append(elem_sk);
}

(function () {
    
    var skPro = [
        {name: 'programmation imperative', level: 666, color: '#daa420'},
        {name: 'algorithme & IA', level: 577, color: '#930e48'},
        {name: 'graphiques', level: 390, color: '#d04a2e'},
        {name: 'web', level: 295, color: '#88a725'},
        {name: 'programmation orienté object', level: 240, color: '#33203a'},
    ];
    
    var skPerso = [
        {name: 'créativité', level: 5},
        {name: 'adaption', level: 4},
        {name: 'rigueur', level: 5},
    ];
    
    renderSkPro(skPro);
    renderSkPerso(skPerso);

})();