$.datosImagen;

function comprimirImagen(archivoImagen, porcentajeCalidad){
    //devuelve un archivo blob comprimido
    return new Promise((resolve, reject) => {
        const $canvas = document.createElement("canvas");
        const imagen = new Image();
        imagen.onload = () => {
            $canvas.width = imagen.width;
            $canvas.height = imagen.height;
            $canvas.getContext("2d").drawImage(imagen, 0, 0);
            $canvas.toBlob(
                (blob) => {
                    if (blob === null) {
                        return reject(blob);
                    } else {
                        resolve(blob);
                    }
                },
                "image/jpeg",
                porcentajeCalidad / 100
            );
        };
        imagen.src = URL.createObjectURL(archivoImagen);
    });
};

function convetirBlobFile(blobData, nombreImg) {
    //convierte un archivo blob a tipo file
    const formImg = new FormData();
    formImg.set('blobImg', blobData, nombreImg);
    return formImg.get('blobImg');
}

$("#imagen").on("change", async function(){

    let archivo = {};
    let tamanoArchivo = 0;
    let calidadImagen = 50;
    let imagenesCargadas = [];
    const archivos = this.files;

    if (archivos.length <= 0) {
        return;
    }

    for (let i = 0; i < archivos.length; i++) {
        archivo = archivos[i];
        tamanoArchivo = (archivo.size)/(1024*1024);

        if(tamanoArchivo < 10){

            let mbArchivo = Math.round(tamanoArchivo);

            if(tamanoArchivo > 2){
                reducir = confirm(`¿La imagen ${archivo.name} que ha cargado pesa alrededor de ${mbArchivo}MB desea reducirla?`);

                if(reducir){
                    if(mbArchivo == 9){
                        calidadImagen = 39;
                    }
                    if(mbArchivo == 8){
                        calidadImagen = 45;
                    }

                    const blob = await comprimirImagen(archivo, calidadImagen);
                    let ArchivoCargado = convetirBlobFile(blob, archivo.name)
                    imagenesCargadas[i] = ArchivoCargado;

                }else{
                    $("#imagen").val('');
                    return;
                }

            } else{
                imagenesCargadas[i] = archivo;
            }

        }else{
            $("#imagen").val('');
            alert(`la imagen ${archivo.name} es muy grande y no se puede cargar ni reducir su tamaño`);
        }

    }
    procesarArchivo(imagenesCargadas);

});


function procesarArchivo(imagenCargar){

    $.datosImagen = new FormData();
    $.datosImagen.append('Accion', 'subirArchivo');
    for (let i = 0; i < imagenCargar.length; i++) {
        $.datosImagen.append(`Archivo${i+1}`, imagenCargar[i]);
    }
    
}

function subirArchivo(){

    if($.datosImagen != undefined){
        $.ajax({
            url: 'subir.php',
            type: 'POST',
            data: $.datosImagen,
            contentType: false,
            processData: false,
            success : function(){
                alert('subido correctamente');
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                console.log('Error');
            }
        });
    }else{
        alert('no ha cargado ningun archivo');
    }   
}

