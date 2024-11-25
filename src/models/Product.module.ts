import { col } from "sequelize";
import { Table, Column, Model, DataType, Default } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";

@Table({
  tableName: "productcs",
})
class Product extends Model {
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string;

  @Column({
    type: DataType.FLOAT(5, 2),
  })
  declare price: number;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare avaliablility: boolean;
}

export default Product;