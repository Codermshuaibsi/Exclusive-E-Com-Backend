const Product = require("../Models/FeaturedProduct");
const cloudinary = require("cloudinary").v2;

// Cloudinary Config (make sure you have env variables set)
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// CREATE Product

exports.createProduct = async (req, res) => {
  try {
    const {
      title, OriginalPrice, DiscountedPrice, stock, description,
      category, subcategory, brand, badge, attributes
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images provided" });
    }

    // Upload images
    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });
        return { url: result.secure_url, public_id: result.public_id };
      })
    );

    const product = new Product({
      title,
      OriginalPrice,
      DiscountedPrice,
      stock,
      description,
      category,
      subcategory,
      brand,
      images: uploadedImages,
      attributes: attributes || [], 
      badge: badge || null
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};


// GET All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("subcategory")
      .populate("brand");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// GET Single Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate("subcategory")
      .populate("brand");

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// UPDATE Product
exports.updateProduct = async (req, res) => {
  try {
    const {
      title, OriginalPrice, DiscountedPrice, stock, description,
      category, subcategory, brand, badge, attributes
    } = req.body;

    let updatedData = {
      title, OriginalPrice, DiscountedPrice, stock, description,
      category, subcategory, brand, badge,
      attributes: attributes || [] 
    };

    // Handle new images if provided
    if (req.files && req.files.length > 0) {
      const oldProduct = await Product.findById(req.params.id);
      if (oldProduct) {
        for (let img of oldProduct.images) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }

      const uploadedImages = await Promise.all(
        req.files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "products",
          });
          return { url: result.secure_url, public_id: result.public_id };
        })
      );

      updatedData.images = uploadedImages;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

// DELETE Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete images from Cloudinary
    for (let img of product.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    await product.deleteOne();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

// GET Discounted Price of a Product
exports.getDiscountPrice = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id, "OriginalPrice DiscountedPrice badge title");

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      title: product.title,
      OriginalPrice: product.OriginalPrice,
      DiscountedPrice: product.DiscountedPrice,
      badge: product.badge
    });
  } catch (error) {
    console.error("Get Discount Price Error:", error);
    res.status(500).json({ error: "Failed to fetch discount price" });
  }
};

// CREATE / SET Discounted Price
exports.createDiscountPrice = async (req, res) => {
  try {
    const { discountedPrice } = req.body;

    if (discountedPrice == null || discountedPrice < 0) {
      return res.status(400).json({ error: "Invalid discounted price" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.DiscountedPrice = discountedPrice;

    // Set badge as "Sale" automatically
    if (discountedPrice < product.OriginalPrice) {
      product.badge = "Sale";
    }

    await product.save();
    res.status(200).json({ message: "Discount price created successfully", product });
  } catch (error) {
    console.error("Create Discount Error:", error);
    res.status(500).json({ error: "Failed to create discount price" });
  }
};

// UPDATE Discounted Price
exports.updateDiscountPrice = async (req, res) => {
  try {
    const { discountedPrice } = req.body;

    if (discountedPrice == null || discountedPrice < 0) {
      return res.status(400).json({ error: "Invalid discounted price" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.DiscountedPrice = discountedPrice;

    // Update badge automatically
    if (discountedPrice < product.OriginalPrice) {
      product.badge = "Sale";
    } else {
      product.badge = null;
    }

    await product.save();
    res.status(200).json({ message: "Discount price updated successfully", product });
  } catch (error) {
    console.error("Update Discount Error:", error);
    res.status(500).json({ error: "Failed to update discount price" });
  }
};

// DELETE / REMOVE Discount
exports.deleteDiscountPrice = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.DiscountedPrice = null;
    product.badge = null; // Remove sale badge
    await product.save();

    res.status(200).json({ message: "Discount removed successfully", product });
  } catch (error) {
    console.error("Delete Discount Error:", error);
    res.status(500).json({ error: "Failed to remove discount price" });
  }
};
