import { meters } from "../meters/meters";
import { Reading } from "./Reading";

export type Data = Partial<Record<meters, Reading[]>>;