<?php

if(isset($_POST) && ($_POST['Accion'] =="subirArchivo")){

	$imagenesCargadas = $_FILES;
	foreach ($imagenesCargadas as $imagen) {
		$ArchivoOrigen = $imagen['tmp_name'];
		move_uploaded_file($ArchivoOrigen, 'images/'.$imagen['name']);
	}

}

?>