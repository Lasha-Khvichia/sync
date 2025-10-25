import styles from "./Buttons.module.scss";



type ButtonProps = {
  type: "button" | "submit" | "reset";
  title?:string;
  onClick?: () => void;
  className?: string;
};


export default function Buttons({ title, type, onClick, className }: ButtonProps) {


  const buttonClasses = [styles.container];

  if(className === "primary") {
    buttonClasses.push(styles.primary);
  }


  return (

    <div>
      <button className={buttonClasses.join(" ").trim()}>
        {title}
      </button>
    </div>
  );
}