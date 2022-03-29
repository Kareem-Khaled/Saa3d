const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'dokcpejo1',
    api_key: '552265642886357',
    api_secret: 'wj2fK1s4ZFuHinFiNzLEbSO2XDo'
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Saa3d',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});

module.exports = {
    cloudinary,
    storage
}