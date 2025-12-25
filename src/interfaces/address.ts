export interface addressI {
  results?: number;
  status: string;
  message?: string;
  data: addressDetailsI[];
}

export interface specificAddressI {
  status: string
  data: addressDetailsI
}


export interface addressDetailsI {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}



