import React, { PropsWithChildren } from "react";

import { Text } from "../../shared/uikit";
import Color, { ColorName } from "../../shared/uikit/Color";
import { TextPropTypes } from "../../shared/uikit/Text/types";
import { Font, fonts } from "../../shared/uikit/Text/typography";

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

export const GuruText: React.FC<GuruTextProps> = ({
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
