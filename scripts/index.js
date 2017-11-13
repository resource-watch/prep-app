
function getPartners() {
  var url = 'https://beta.prepdata.org/api/partners?featured=true';
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    var el = document.getElementById('partners');
    var partners = [];

    if (this.readyState == 4 && this.status == 200) {
      var partners = JSON.parse(this.responseText);
    }

    partners.forEach(function(p) {
      el.innerHTML += '<div class="logo-container"><a href="' + p.url + '" target="_blank" rel="noreferrer noopener"><img src="' + p.images.thumbnail + '" alt="' + p.name + '" /></a></div>';
    }.bind(this));
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

document.addEventListener('DOMContentLoaded', getPartners);
