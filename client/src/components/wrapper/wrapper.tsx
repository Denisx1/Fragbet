import headerStyles from "../../components/layout/header/header.module.css";
import React from "react";
import classNames from "classnames";

interface WrapperProps {
  baseStyle?: string;
  modifiers?: string[]; // например ['global', 'with-bg']
  className?: string; // дополнительные классы, если нужно
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({
  baseStyle = "",
  modifiers = [],
  className = "",
  children,
}) => {
  const classes = classNames(
    baseStyle && headerStyles[baseStyle],
    ...modifiers
      .map((mod) => `${baseStyle}--${mod}`)
      .map((fullMod) => headerStyles[fullMod])
      .filter(Boolean),
    className
  );

  return <div className={classes}>{children}</div>;
};

export default Wrapper;
