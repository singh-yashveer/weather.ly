import styled from "styled-components";
import { color, layout, space, typography } from "styled-system";

import { TextPropTypes } from "./types";

const Text = styled.p<TextPropTypes>(
  {
    margin: 0,
  },
  color,
  typography,
  layout,
  space
);

export default Text;
