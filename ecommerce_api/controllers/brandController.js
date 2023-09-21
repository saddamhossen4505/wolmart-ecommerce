import asyncHandler from "express-async-handler";
import Brand from "../models/Brand.js";
import { createSlug } from "../helpers/createSlug.js";

/**
 * @desc GetAllBrand
 * @method GET
 * @route /api/v1/Brand
 * @access Public
 */
export const getAllBrand = asyncHandler(async (req, res) => {
  const brands = await Brand.find();

  if (brands.length === 0) {
    return res.status(404).json({ message: "Brand data not found" });
  }

  res.status(200).json(brands);
});

/**
 * @desc GetSingleBrand
 * @method GET
 * @route /api/v1/Brand/:id
 * @access Public
 */
export const getSingleBrand = asyncHandler(async (req, res) => {
  // Get id.
  const { id } = req.params;
  const brand = await Brand.findById(id);

  if (!brand) {
    return res.status(404).json({ message: "Brand not found." });
  }

  res.status(200).json(brand);
});

/**
 * @desc Create Brand.
 * @method POST
 * @route /api/v1/Brand
 * @access Public
 */
export const createBrand = asyncHandler(async (req, res) => {
  // Get Data.
  const { name } = req.body;

  // Validation.
  if (!name) {
    return res.status(400).json({ message: "Brand name is required." });
  }

  // If BrandAlreadyExits.
  const isBrand = await Brand.findOne({ name });
  if (isBrand) return res.status(400).json({ message: "Brand already exits." });

  const brand = await Brand.create({
    name,
    slug: createSlug(name),
  });
  res.status(200).json({ brand, message: "Brand created successful." });
});

/**
 * @desc DeleteBrand
 * @method DELETE
 * @route /api/v1/Brand/:id
 * @access Public
 */
export const deleteBrand = asyncHandler(async (req, res) => {
  // Get id.
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);

  if (!brand) {
    return res.status(404).json({ message: "Brand not found." });
  }

  res.status(200).json({ message: "Brand deleted successfull.", brand });
});

/**
 * @desc UpdateBrand
 * @method PUT/PATCH
 * @route /api/v1/Brand/:id
 * @access Public
 */
export const updateBrand = asyncHandler(async (req, res) => {
  // Get Data.
  const { name } = req.body;

  // Get id.
  const { id } = req.params;

  // updateUser.
  const brand = await Brand.findByIdAndUpdate(
    id,
    {
      name,
      slug: createSlug(name),
    },
    { new: true }
  );
  res.status(200).json({ brand, message: "Brand update successful." });
});

/**
 * @desc UpdateBrandStatus
 * @method PUT/PATCH
 * @route /api/v1/Brand/status:id
 * @access Public
 */
export const updateBrandStatus = asyncHandler(async (req, res) => {
  // Get id.
  const { id } = req.params;
  // Get Data.
  const { status } = req.body;
  // updateUser.
  const brandStatus = await Brand.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    { new: true }
  );
  res.status(200).json({ message: "Status update successful.", brandStatus });
});
