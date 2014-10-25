
var app = {
    scanSeconds: 5,
    scanDelay: 2,
    devices: [],
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        log("Testing Bluetooth...");
    },
    onDeviceReady: function() {
      log("Scanning any BLE services for " + app.scanSeconds + " seconds");
      ble.scan([], app.scanSeconds, app.onScanSuccess, app.onScanFailure);

      setTimeout(function() {
        log("Keep waiting...");
      }, app.scanSeconds/2 * 1000);

      setTimeout(function() {
        log("Scan complete");
      }, (app.scanSeconds + app.scanDelay) * 2 * 1000);

      // generate a link to email div contents
      setTimeout(function() {
        var a = document.createElement('a');
        var link = "mailto:don.coleman@gmail.com?subject=BLE&body=" + outputDiv.innerHTML;
        a.innerHTML = "Email Results";
        a.setAttribute('href', link);
        linkDiv.appendChild(a);
      }, (((app.scanSeconds + app.scanDelay) * 2 ) + 2) * 1000 );
    },
    onScanSuccess: function(device) {
        log("Found  " + JSON.stringify(device));
        app.devices.push(device);

    },
    onScanFailure: function(reason) {
        alert("Scan failed " + reason);
    }
};

var log = function(data) {
    console.log(data);
    outputDiv.innerHTML = outputDiv.innerHTML + data + "<br/>";
    outputDiv.scrollTop = outputDiv.scrollHeight;  // scroll div
};
