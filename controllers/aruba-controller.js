const ArubaModel = require('../models/aruba-model')

exports.getData = async (req, res) => {

    if (req.session.cookie === undefined) {  // if not logged
        try {
            var json = await ArubaModel.arubaLoginAndReturnCookie()
            var string = JSON.stringify(json);
            var objectValue = JSON.parse(string);
            req.session.cookie = await objectValue['cookie'];
            var data = await ArubaModel.arubaGetPortData(req.params.adresip, req.params.gniazdko, await objectValue['cookie'])
            res.json(data);
        } catch (e) {
            console.log(e);
            await res.json({ message: 'Błąd połączenia z Aruba.' });
        }
    } else {
        try {
            var data = await ArubaModel.arubaGetPortData(req.params.adresip, req.params.gniazdko, req.session.cookie)
            res.json(data);
        } catch (e) {
            console.log(e);
            res.json({ message: 'Błąd połączenia z Aruba.' });
        }
    }
}

exports.getMacTable = async (req, res) => {
    if (req.session.cookie === undefined) {  // if not logged
        try {
            var json = await ArubaModel.arubaLoginAndReturnCookie()
            var string = JSON.stringify(json);
            var objectValue = JSON.parse(string);
            req.session.cookie = await objectValue['cookie'];
            var data = await ArubaModel.arubaGetMacTable(req.params.adresip, req.params.gniazdko, await objectValue['cookie'])
            res.json(data);
        } catch (e) {
            console.log(e);
            await res.json({ message: 'Błąd połączenia z Aruba.' });
        }
    } else {
        try {
            var data = await ArubaModel.arubaGetMacTable(req.params.adresip, req.params.gniazdko, req.session.cookie)
            res.json(data);
        } catch (e) {
            console.log(e);
            res.json({ message: 'Błąd połączenia z Aruba.' });
        }
    }

}