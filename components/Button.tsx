"use client";
import Link from "next/link";
// @ts-expect-error
import useSound from "use-sound";

type Props = {
  variant: "primary" | "secondary" | "secondary-darker" | "danger";
  className?: string;
  disabled?: boolean;
  href?: string;
  playSoundOnClick?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

export default ({
  variant,
  className: extraClassNames,
  disabled,
  href,
  playSoundOnClick = true,
  onClick,
  children,
}: Props) => {
  const [playHover] = useSound("/audio/buttonhover.mp3");
  const [playClick] = useSound("/audio/buttonclick.mp3");

  const className = {
    className: `select-none rounded p-3 text-lg font-semibold transition-colors duration-[40ms] disabled:bg-neutral-500 ${extraClassNames} ${
      variant === "primary" ? "bg-[#048b59] hover:bg-[#15b869]" : ""
    } ${variant === "secondary" ? "hover:bg-neutral-500/50" : ""} ${
      variant === "secondary-darker" ? "hover:bg-black/50" : ""
    } ${variant === "danger" ? "bg-red-500 hover:bg-red-500/50" : ""}`,
  };

  return href ? (
    <Link
      href={href}
      className={className.className}
      onMouseEnter={playHover}
      onClick={playClick}
    >
      {children}
    </Link>
  ) : (
    <button
      className={className.className}
      onMouseEnter={playHover}
      disabled={disabled}
      onClick={() => {
        if (typeof onClick === "function") onClick();
        if (playSoundOnClick) playClick();
      }}
    >
      {children}
    </button>
  );
};
