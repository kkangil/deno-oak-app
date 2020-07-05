export interface Book {
  id: string;
  title: string;
  author: string;
}

export interface IContext<P = any> {
  request: any;
  response: any;
  params: P;
}
