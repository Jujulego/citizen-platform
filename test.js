const sendmail = require("sendmail");

sendmail()({
    from: 'no-reply@csp.net',
    to: 'louise.denis@edu.ece.fr',
    subject: 'test',
    html: 'r,bijonblkr,klbjnetziob,eztkl,vkleztjnbiokezt;v,erockcr gj,ioerjlgietigj;boetz'
}, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
})