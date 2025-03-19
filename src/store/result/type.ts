export interface IImageResult {
  id: number;
  url: string;
}

export interface IImageResultRoot {
  results: IImageResult[];
}
