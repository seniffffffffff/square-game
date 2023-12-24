import { TField } from "../../types/types";
import "./InfoRows.css";

type TProps = {
  field: TField;
};

export const InfoRows: React.FC<TProps> = ({ field }) => {
  const numberRow = (value: number) => {
    return Math.floor(value / 5) + 1;
  };

  const numberCol = (value: number) => {
    return (value % 5) + 1;
  };

  return (
    <div className="info-rows">
      Row {numberRow(field.value)} col {numberCol(field.value)}
    </div>
  );
};

