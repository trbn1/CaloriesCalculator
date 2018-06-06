export class Item {
  $key!: string;
  category!: string;
  photo!: string;
  name!: string;
  quantity!: number;
  energy!: number;
  protein!: number;
  fat!: number;
  carb!: number;
  fiber!: number;
  timestamp!: number;
}

export class Save {
  $key!: string;
  timestamp!: number;
}
