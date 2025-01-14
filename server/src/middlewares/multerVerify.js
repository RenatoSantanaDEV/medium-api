const { resolve } = require("path");
const fs = require("fs");

module.exports = {
  create(req, res, next) {
    try {
      const { img, filename } = req.body;

      const imgPrefix = img.split(",")[0];
      let originalname;

      if (imgPrefix.includes("jpeg")) {
        originalname = img.replace(/^data:image\/jpeg;base64,/, "");
      } else if (imgPrefix.includes("jpg")) {
        originalname = img.replace(/^data:image\/jpg;base64,/, "");
      } else if (imgPrefix.includes("png")) {
        originalname = img.replace(/^data:image\/png;base64,/, "");
      } else {
        return res
          .status(400)
          .json({ errors: ["Formato de imagem não suportado."] });
      }

      const filePath = resolve(
        __dirname,
        "..",
        "..",
        "..",
        "client",
        "public",
        "assets",
        "thumbnails",
        filename
      );

      fs.writeFileSync(filePath, originalname, "base64");

      req.body = { filename, originalname };
      next();
    } catch (error) {
      return res
        .status(500)
        .json({ errors: ["Erro ao processar a imagem.", error.message] });
    }
  },
};
