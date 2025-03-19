export interface IInput {
  numberOfImages: number;
  prompt: string;
  referencePhoto: string | null;
  targetPhoto: string | null;
  isLoading: boolean;
}
