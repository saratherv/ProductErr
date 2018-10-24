function some(y) {


    document.getElementById("myInput").value = y;
    document.getElementById('myul').style.display = "none";
}
function depcity() {
    var input, filter, ul, li, a, i;
    document.getElementById('cityenter').style.display = "block";
    input = document.getElementById("dateinp");
    filter = input.value.toUpperCase();
    div = document.getElementById("dropdown");
    a = div.getElementsByClassName('value');
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}
function addpop() {
    var ele = document.getElementById('popper');
    ele.classList.add('visible');
}

function choose(h, s) {
    console.log(h);
    document.getElementById('cityenter').style.display = "none";
    document.getElementById('dateinp').value = s;
    document.getElementById('myInput').value = h;
    PlotmMarker(s)

}

function pass(l, m) {
    if (document.getElementById(l).style.display == "none") {
        document.getElementById(l).style.display = "block";
    }
    else {
        document.getElementById(l).style.display = "none";
    }
    if (document.getElementById(m).style.display == "none") {
        document.getElementById(m).style.display = "block";
    }
    else {
        document.getElementById(m).style.display = "none";
    }
}
function add(a, b, p) {
    var x = ((Number)(document.getElementById(a).innerHTML)) + 1;

    document.getElementById(a).innerHTML = x;
    document.getElementById(b).innerHTML = x;
    document.getElementById(p).value = x;
}
function subs(a, b, p) {
    var x = 0;
    if (document.getElementById(a).innerHTML != 0)
        x = ((Number)(document.getElementById(a).innerHTML)) - 1;

    document.getElementById(a).innerHTML = x;
    document.getElementById(b).innerHTML = x;
    if (document.getElementById(p).value <= 0)
        document.getElementById(p).value = (Number)(document.getElementById(p).value) - 1;

}
function hide(r, s) {
    var l = r;
    var k = s;
    pass(l, k);
}

var map, geocoder;
function initMap() {
    console.log(document.getElementById('map'))
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: { lat: 25.276987, lng: 55.296249 },

    }
    );

    geocoder = new google.maps.Geocoder();
}
function PlotmMarker(h) {
    geocodeAddress(geocoder, map, h);

}
function geocodeAddress(geocoder, resultsMap, h) {

    geocoder.geocode({ 'address': h }, function (results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });


}
function unhide() {
    var element = document.getElementById('loginhid');
    element.classList.add('visible');
}

function unhidesig() {
    var element = document.getElementById('signhid');
    element.classList.add('visible');
}

    function changeflightcolor(flightselect) {
    var element = document.getElementById(flightselect);
    element.classList.add('rem-added');
}
function showmoreinfo(x, y) {

    var element = document.getElementById(x);
    if (element.classList.contains('fl-hide')) {
        element.classList.remove('fl-hide');
        var inner = document.getElementById(y);
        inner.innerHTML = "Close more information"
    }
    else {
        element.classList.add('fl-hide');
        var inner = document.getElementById(y);
        inner.innerHTML = "Show more information"
    }
    console.log(x);

}
function changesalutation(x, y,z) {
    document.getElementById('hidtag').value = x;
    document.getElementById(y).innerHTML = x;
    unhidesalutation(z)
}
function unhidesalutation(a) {
    console.log('ye chala 1')
    if (document.getElementById(a).style.display == "none") {
        document.getElementById(a).style.display = "block";

    }
    else {
        document.getElementById(a).style.display = "none";
        console.log('ye chala')
    }

}
function changecode(x, y) {
    document.getElementById('hidtag').value = x;
    document.getElementById(y).innerHTML = x;
}
function unhidecode(a) {
    console.log('ye chala 1')
    if (document.getElementById(a).style.display == "none") {
        document.getElementById(a).style.display = "block";

    }
    else {
        document.getElementById(a).style.display = "none";

        console.log('ye chala')
    }

}


function algoliaSearch(id, index) {
    console.log(index)
    var client = algoliasearch('U4A0FQ06MO', '685f378575aef70582205824c6437e00');
    var index = client.initIndex(index);
    console.log('index found', index)
    //initialize autocomplete on search input (ID selector must match)
    autocomplete('#' + id,
        { hint: false }, {
            source: autocomplete.sources.hits(index, { hitsPerPage: 5 }),
            displayKey: 'code',
            templates: {
                suggestion: function (suggestion) {
                    return '<div class="select-value-wrapper">' + '<div class="value-border"></div>' + '<div class="value">' +
                        suggestion._highlightResult.name.value + '</div>' + '</div>';
                    console.log( suggestion._highlightResult)
                }
            }
        });
}
function clickedi(id) {
    console.log("item selected" + document.getElementById(id).value);
}


function closelookpop(x){
    var element=document.getElementById(x);
    element.classList.remove('visible');
}

function checkLogin(){
    const cookies = document.cookie;
    if(document.cookie.split('=')[0] !=  "cookieName"){
        alert('please login!!')
        unhide();
    }
}
function signuprefhide(x){
if(document.getElementById(x).style.display=='block'){
    document.getElementById(x).style.display='none';
    console.log('none called')
}
else{    document.getElementById(x).style.display='block';
    console.log('block called')
}
}

function valueChange(w,x,y,z){
    document.getElementById(w).value=x;
    document.getElementById(y).innerHTML=x;
    signuprefhide(z)
}
function hidethisdiv(j){
    var x=[];
   x= document.getElementsByClassName('sh-box idefine');
   var n=x.length;
   for(var i=0;i<n;i++){
       x[i].style.display='block';
   }
   console.log('chala')
}