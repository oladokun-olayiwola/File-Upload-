const router = require('express').Router()
const {getAllProducts, createProduct} = require('../controllers/productController')
const uploadProductImages = require('../controllers/uploadsController')



router.route('/').get(getAllProducts).post(createProduct)
router.route('/uploads').post(uploadProductImages)

module.exports = router