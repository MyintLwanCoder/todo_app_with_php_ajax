function showCD(str) {
  if (str == '') {
    document.getElementById('txtHint')[removed] = '';
    return;
  }
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('txtHint').innerHTML = this.responseText;
    }
  };
  xmlhttp.open('GET', 'getcourse.php?q=' + str, true);
  xmlhttp.send();
}
