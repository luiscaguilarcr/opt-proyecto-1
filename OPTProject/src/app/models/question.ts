export interface question {
    _id: string;
    question: string;
    options: Option[]; // Nombre correcto de la propiedad que contiene las opciones
    weight: number;
  }
  
  export interface Option {
    value: number;
    weight: number;
  }
  