import logoPng from "./assabahautisme.png";

type Props = {
  className?: string;
};

export default function Logo({ className }: Props) {
  return (
    <img
      src={logoPng}
      alt="Association Assabah"
      className={className ?? "h-10 w-10 object-contain"}
      draggable={false}
    />
  );
}

