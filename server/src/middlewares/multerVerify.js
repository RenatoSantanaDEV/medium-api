const { extname, resolve } = require("path");
const multer = require("multer");
const fs = require("fs");
const multerConfig = require("../config/multerConfig");

const upload = multer(multerConfig).single("img");

module.exports = {
  create(req, res, next) {
    return upload(req, res, async (err) => {
      const { img, thumbnailName } = req.body;

      let imagemReq = thumbnailName;

      if (img.substring(11, 14) === "jpeg") {
        imagemReq = img.replace(/^data:image\/jpg;base64,/, "");
      }

      if (img.substring(11, 14) === "jpg") {
        imagemReq = img.replace(/^data:image\/jpeg;base64,/, "");
      }

      if (img.substring(11, 14) === "png") {
        imagemReq = img.replace(/^data:image\/png;base64,/, "");
      }

      const filename = thumbnailName;

      const filePath = resolve(__dirname, '..', '..', '..', 'client', 'public','assets', 'thumbnails', `${filename}`);

      req.body = { thumbnailName, thumbnailName };

      fs.writeFileSync(filePath, imagemReq, "base64", (error) => {
        if (error) {
          return res.json(error);
        }
        return "";
      });

      if (err) {
        return res.status(400).json({ errors: [err] });
      }

      return next();
    });
  },
};
