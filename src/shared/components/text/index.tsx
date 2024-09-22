import React, { PropsWithChildren } from "react";

import { Text } from "../../uikit";
import Color, { ColorName } from "../../uikit/Color";
import type { TextPropTypes } from "../../uikit/Text/types";
import { Font, fonts } from "../../uikit/Text/typography";

type GuruTextProps = PropsWithChildren<
  {
    type?: Font;
    color?: ColorName;
  } & Partial<TextPropTypes>
>;

type FontObj = {
  fontWeight?: number;
  fontSize?: number;
  lineHeight?: number | string;
};

export const TextLy: React.FC<GuruTextProps> = ({
  children,
  type,
  color,
  ...rest
}) => {
  const font: FontObj = type ? fonts[type] || {} : {};

  return (
    <Text
      fontSize={font.fontSize}
      fontWeight={font.fontWeight}
      lineHeight={font.lineHeight || "130%"}
      color={Color[(color as ColorName) || "black"]}
      marginBottom={1}
      {...rest}
    >
      {children}
    </Text>
  );
};
