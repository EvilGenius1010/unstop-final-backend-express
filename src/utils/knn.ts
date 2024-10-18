interface Station {
  type: 'Feature';
  properties: {
    name: string;
  };
  geometry: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
}

