<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta http-equiv="X-UA-Compatible" content="IE=edge">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>php ajax tutorial</title>
  <script type="text/javascript" src="auto_complete.js"></script>

</head>
<body>
 <h2>PHP MVC Frameworks - Search Engine</h2>
 <p><b>Type the first letter of the PHP MVC Frameworks</b></p>
 <form action="index.php" method="post">
  <input type="text" name="search" placeholder="Search..." onkeyup="showName(this.value)" id="txtHint">
  <input type="submit" value="Search">
 </form>
 <p>Matches: <span id="txtName"></span></p>
</body>
</html>