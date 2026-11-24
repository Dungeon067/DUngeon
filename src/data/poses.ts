/** S27: cấu hình dáng tư thế và vũ khí ngoài trận (content/poses.yaml) đã kiểm tra schema. */
import posesRaw from "../../content/poses.yaml";
import { validatePoses } from "./poses-schema";

export const POSES = validatePoses(posesRaw);
