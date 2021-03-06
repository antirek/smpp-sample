var smpp = require('smpp');

/*
var config = require('./config');

*/

//   внимание: параметры уточняйте в ЛК услуги
var config = {
    host: 'sms.tele2.ru',       //адрес smpp сервера
    port: 1111,                 //порт smpp сервера
    system_id: 'amXXXXXXX',     //id рассылки
    password: 'password'        //пароль рассылки
};

var session = new smpp.Session({host: config.host, port: config.port});

smpp.encodings.default = 'ASCII';

session.bind_transceiver({
    system_id: config.system_id,
    password: config.password
}, function (pdu) {
    console.log('pdu', pdu);
    if (pdu.command_status == 0) {
        // Successfully bound
        session.submit_sm({                
                source_addr_npi: 0,
                source_addr_ton: 5,      // ton & npi - это магические коды : )
                source_addr: 'Mobilon',  // из заранее одобренных имен отправителей
                dest_addr_ton: 1,
                dest_addr_npi: 1,
                destination_addr: '79135292926',
                short_message: 'Лопата'
        }, function (pdu) {
            if (pdu.command_status == 0) {
                // Message successfully sent
                console.log(pdu.message_id);
            } else {
                console.log('submit_sm != 0');
            }
        });
    } else {
        console.log('bind_transceiver != 0');
    }
});