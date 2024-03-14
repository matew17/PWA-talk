const defaultValues = {
  latitude: "6.1448792",
  longitude: "-75.3947176",
};

export const buildCoordinates = (
  geoInformation: GeolocationPosition | null
) => {
  let latitude;
  let longitude;

  // If offline get last saved location so api cache works
  if (navigator.onLine) {
    latitude = geoInformation?.coords?.latitude?.toString();
    longitude = geoInformation?.coords?.longitude?.toString();
  } else {
    latitude = localStorage.getItem("lastLatitude");
    longitude = localStorage.getItem("lastLongitude");
  }

  return {
    latitude: latitude ?? defaultValues.latitude,
    longitude: longitude ?? defaultValues.longitude,
  };
};
