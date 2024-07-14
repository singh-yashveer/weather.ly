import {
  BorderProps,
  ColorProps,
  FlexboxProps,
  GridColumnGapProps,
  GridRowGapProps,
  LayoutProps,
  PositionProps,
  ShadowProps,
  SpaceProps,
} from "styled-system";

export type BoxPropTypes = ColorProps &
  SpaceProps &
  LayoutProps &
  GridColumnGapProps &
  GridRowGapProps &
  FlexboxProps &
  BorderProps &
  ShadowProps &
  PositionProps;
