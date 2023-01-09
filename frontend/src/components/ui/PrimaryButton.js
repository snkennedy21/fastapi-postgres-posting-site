function PrimaryButton(props) {
  return (
    <button
      onClick={props.clickHandler}
      className="py-2 px-4 text-xl bg-primary border-solid border-2 border-primary rounded-md text-textWhite hover:bg-primaryTint hover:border-primaryTint active:scale-105 transition-color"
      type={props.type}
    >
      {props.children}
    </button>
  );
}

export default PrimaryButton;
