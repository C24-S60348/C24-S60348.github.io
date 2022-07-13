var qr;

(function(){
    qr = new QRious({
        element:document.getElementById('qr-code'),
        size:200,
    });

})();

function generateQRCode(){
    const qrtext = document.getElementById('qr-text').value;
    document.getElementById("qr-result").innerHTML = "QR Code for " + qrtext+" : ";
    qr.set({
        foreground:'black',
        size: 200,
        value: qrtext
    });
}