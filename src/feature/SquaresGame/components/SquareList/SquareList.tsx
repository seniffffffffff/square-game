import { Square } from "../Square/Square";
import "./SquareList.css";
import { TField } from "../../types/types";

type TProps = {
  fields: TField[];
  addNewField: (field: TField) => void;
};

export const SquareList: React.FC<TProps> = ({ fields, addNewField }) => (
  <div className="square-list-div">
    {fields.map((i) => {
      return <Square key={i.value} field={i} addNewField={addNewField} />;
    })}
  </div>
);
