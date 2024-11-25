import { Request, Response } from "express";
import Product from "../models/Product.module";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      // order: [["price", "DESC"]],
      // attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json({ data: products });
  } catch (error) {
    console.log(error);
  }
};
export const getProductsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(400).json({
        error: "Producto no encontrado",
      });
      return;
    }
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const editProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(400).json({
        error: "Producto no encontrado",
      });
      return;
    }

    // ? Actualizando

    console.log(req.body);

    // ?para actualizar manual
    // product.name = req.body.name;
    // product.price = req.body.price;
    // product.avaliablility = req.body.avaliablility;
    // ? Se lo dejamos al put
    await product.update(req.body);
    await product.save();
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const updteAvaliablility = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(400).json({
        error: "Producto no encontrado",
      });
      return;
    }
    product.avaliablility = !product.dataValues.avaliablility;
    await product.save();
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(400).json({
        error: "Producto no encontrado",
      });
      return;
    }
    await product.destroy();
    res.json({ data: "Producto eliminado" });
  } catch (error) {
    console.log(error);
  }
};
