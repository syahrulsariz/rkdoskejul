const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot siap!');

    // Schedule setiap jam 23:00
    cron.schedule('0 23 * * *', async () => {
        console.log('Mulai kirim pesan...');

        const pesanList = [
            "approve bgr mem all",
            "approve bgr pt all",
            "approve bgr memkids all",
            "approve pml mem all",
            "approve pml pt all",
            "approve bint mem all",
            "approve bint pt all",
            "approve mbnt mem all",
            "approve mbnt pt all",
            "approve mbnt memkids all",
            "approve prj mem all",
            "approve prj pt all",
            "approve prj memkids all",
            "approve ssb mem all",
            "approve ssb pt all",
            "approve ssb memkids all"
        ];

        // Ganti nomor tujuan dengan format internasional
        const target = "628xxxxxxxxxx@c.us"; // nomor WA tujuan

        for (const pesan of pesanList) {
            await client.sendMessage(target, pesan);
            console.log(`Pesan terkirim: ${pesan}`);
            await new Promise(resolve => setTimeout(resolve, 3000)); // delay 3 detik biar aman
        }
    });
});

client.initialize();
