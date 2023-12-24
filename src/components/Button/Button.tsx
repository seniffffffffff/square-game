import "./Button.css";

type TProps = {
  onClick?: () => void;
  buttonText: string;
};

const Button: React.FC<TProps> = ({ buttonText, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default Button;
