function showName(str) {
  if (str.length == 0) {
    document.getElementById('txtName').innerHTML = '';
    document.getElementById('txtName').style.border = '0px';
    return;
  }
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      document.getElementById('txtName').innerHTML = xmlhttp.responseText;
      document.getElementById('txtName').style.border = '1px solid #A5ACB2';
    }
  };
  xmlhttp.open('GET', 'frameworks.php?name=' + str, true);
  xmlhttp.send();
}
