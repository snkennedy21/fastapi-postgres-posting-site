function Container(props) {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[600px] border-x-solid border-x-border border-x">
        {props.children}
      </div>
    </div>
  );
}

export default Container;
