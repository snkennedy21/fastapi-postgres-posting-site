function Container(props) {
  return (
    <div className="flex justify-center">
      <div className="p-10 flex flex-col gap-4 w-[1100px]">
        {props.children}
      </div>
    </div>
  );
}

export default Container;
