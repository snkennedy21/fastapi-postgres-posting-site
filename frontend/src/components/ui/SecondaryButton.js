function SecondaryButton(props) {
  return (
    <button
      onClick={props.clickHandler}
      className="py-2 px-4 text-xl text-primary rounded-md border-solid border-2 border-primary text-textWhite hover:bg-primaryTint hover:border-primaryTint hover:text-textWhite active:scale-105 transition transition-color"
      type={props.type}
    >
      {props.children}
    </button>
  );
}

export default SecondaryButton;
