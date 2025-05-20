import "styled-components";
import { StringLiteral } from "typescript";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    accentColor: string;
    cardBgColor: string;
  }
}