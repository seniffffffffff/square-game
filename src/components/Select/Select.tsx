import Select, { ActionMeta, SingleValue } from "react-select";
import "./Select.css";

type TProps = {
  options: {
    value: string;
    label: string;
  }[];
  onChange: (
    newValue: SingleValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => void;
  placeholder?: string;
};

export const SelectComp: React.FC<TProps> = ({
  onChange,
  options,
  placeholder,
}) => {
  return (
    <div className="select-div">
      <Select onChange={onChange} options={options} placeholder={placeholder} />
    </div>
  );
};
