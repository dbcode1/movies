import spinner from "../../assets/spinner.svg";
import "./Spinner.css";

export default function Spinner() {
  return (
    <div className="spinner-wrapper">
      <img src={spinner} alt="spinner icon" className="spinner" />;
    </div>
  );
}
