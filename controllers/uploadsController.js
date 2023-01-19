const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");



const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const uploadProductImagesManually = async (req, res) => {
  const productImage = req.files.image;

  if (!req.files) {
    throw new BadRequestError("No file found");
  }
  // console.log(productImage);

  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequestError("Please upload an Image ");
  }

  const maxSize = 1024 * 1024;
  if (!productImage.size === maxSize) {
    throw new BadRequestError("Please upload an Image less than 1KB");
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

const uploadProductImages = async (req, res) => {
  console.log(req.files.image.tempFilePath)
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = uploadProductImages;
