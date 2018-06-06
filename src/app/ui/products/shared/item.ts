export class Item {
  $key!: string;
  pid!: string;
  cat!: number;
  name!: string;
  quantity!: number;
  energy!: number;
  protein!: number;
  fat!: number;
  carb!: number;
  fiber!: number;
  photo!: string;
  photoUrl!: any;
  timestamp!: number;
}

export class Save {
  $key!: string;
  timestamp!: number;
}
