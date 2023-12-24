import "./Square.css";
import { TField } from "../../types/types";

type TProps = {
  addNewField: (field: TField) => void;
  field: TField;
};

export const Square: React.FC<TProps> = ({ addNewField, field }) => (
  <div
    className={`square ${field.isHovered ? "hovered" : ""}`}
    onMouseEnter={() => addNewField(field)}
  />
);
