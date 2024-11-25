import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductsById,
  editProduct,
  updteAvaliablility,
  deleteProduct,
} from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();

router.get("/", getProducts);
router.get(
  "/:id",
  param("id").isInt().withMessage("Id no valido"),
  handleInputErrors,
  getProductsById
);

router.post(
  "/",
  body("name")
    .notEmpty()
    .withMessage("El nombre de Producto no puede ir vacio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),
  handleInputErrors,
  createProduct
);

router.put(
  "/:id",
  param("id").isInt().withMessage("Id no valido"),
  body("name")
    .notEmpty()
    .withMessage("El nombre de Producto no puede ir vacio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),
  body("avaliablility")
    .isBoolean()
    .withMessage("Valor para disponibilidad no valido"),
  handleInputErrors,
  editProduct
);

router.patch(
  "/:id",
  param("id").isInt().withMessage("Id no valido"),
  handleInputErrors,
  updteAvaliablility
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("Id no valido"),
  handleInputErrors,
  deleteProduct
);

export default router;
