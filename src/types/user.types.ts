import { Tables } from "./supabase.types";

export type UserSizeType = {
  height: number;
  width: number;
  l_sleeve: number;
  s_sleeve: number;
};

export type UserPreprocessType = {
  cropped: string;
  pose_json: Pose;
  segment: string;
  "image-parse-v3": string;
  densepose: string;
};

interface Pose {
  version: number;
  people: Person[];
}

interface Person {
  pose_keypoints_2d: number[];
}

export type VtonType = Omit<Tables<"user_result">, "user_id">;
