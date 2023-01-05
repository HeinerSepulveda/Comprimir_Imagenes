<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Comprimir multiples imagenes</title>
</head>

<body>
	<h1>Comprimir multiples imagenes</h1>
	<br>
	<label for="imagen">Seleccione las imagenes:</label>
	<br>
	<input type="file" id="imagen" multiple>
	<br>
	<br>
	<button id="btnComprimirBlob" onclick="subirArchivo()">Comprimir</button>
</body>
<script src="jquery-3.1.1.min.js"></script>
<script src="scriptComprimir.js"></script>
</html>