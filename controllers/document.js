var utilities = require('./../utilities');

var docs = [];

exports.list = function(req, res) {
    res.status(200).jsonp(docs);
};

exports.create = function(req, res) {
    var doc = req.body.doc;
    doc.fecha = new Date();
    doc.documento_id = utilities.generateId(docs);
    var dets = new Array();
    var i = 1;

    var jsonData = JSON.parse(req.body.dets);
    for (var j = 0; j < jsonData.length; j++) {
        det = jsonData[j];
        det.documento_id = doc.documento_id;
        det.documento_detalle_id = i;
        dets.push(det);
        i++;
    }

    doc.details = dets;
    docs.push(doc);
    res.status(200).jsonp(docs);
};