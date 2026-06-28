type HeadingProps = {
  title: string;
};

const Heading = ({ title }: HeadingProps) => {
  return <h1 className="text-3xl font-bold">{title}</h1>;
};

export default Heading;
