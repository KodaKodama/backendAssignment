import { Request, Response } from 'express';
const Product = require('../models/productModel');
import path from 'path';

export const createProductController = async (req: Request, res: Response) => {
    if (!req.body.name || !req.body.price || !req.body.description || !req.body.image) {
        return res
          .status(400)
          .json({ err: "All fields should be selected - name, price, description, imageUrl" });
      }
    
      if (isNaN(Number(req.body.price))) {
        return res.status(400).json({ err: "Price must be a number" });
      }
    
    
      let productDetails = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image, // Include imageUrl property
      };
    

        try {
            const createdProduct = await Product.create(productDetails);
            return res.status(201).json({ message: "Product created" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ err: "Error creating product" });
        }
    
};


export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching products' });
  }
};

