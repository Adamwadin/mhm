import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import styles from "./GoogleMaps.module.css";

const GoogleMaps = () => {
  const homeAddress = {
    lat: 36.49553111335986,
    lng: -4.7096000175423685,
  };

  const [selected, setSelected] = useState(null);

  const onSelect = useCallback((marker) => {
    setSelected(marker);
  }, []);

  const mapOptions = {
    styles: [],
  };

  return (
    <div className={styles.infoPage}>
      <section id="info"></section>
      <h1 className={styles.heading}>Apartment Information</h1>
      <div className={styles.description}>
        <p>
          <strong>3-room apartment</strong> with two bedrooms, a living room,
          kitchen, bathroom, hallway, and a large balcony with a sea view. The
          apartment is equipped with fiber-optic Wi-Fi. A pool and children's
          pool are available.
        </p>
        <h2>Bedrooms</h2>
        <p>
          <strong>Bedroom 1:</strong> Two separate beds measuring 90 x 200 cm,
          which can also be pushed together to form a double bed. The room has
          windows with a beautiful sea view. Excellent blackout shutters are
          available.
        </p>
        <p>
          <strong>Master Bedroom:</strong> A double bed measuring 180 x 200 cm
          (cannot be separated). The room features windows and access to a
          terrace/balcony with a fantastic view of the sea. Excellent blackout
          shutters are available.
        </p>
        <h2>Kitchen</h2>
        <p>
          Modern kitchen with a stove, oven, microwave, fridge/freezer, coffee
          maker, toaster, dishes, glasses, frying pan, and pots, among other
          things. Fully equipped kitchen!
        </p>
        <h2>Living Room</h2>
        <p>
          Includes a 3-seater sofa, TV, Apple TV, dining table, and access to a
          balcony with a wonderful view of the sea and pool area.
        </p>
        <h2>Bathroom</h2>
        <p>
          Bathroom with a bathtub and shower, toilet, sink, and washing machine.
          High standard.
        </p>
      </div>

      <div className={styles.mapContainer}>
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={homeAddress}
            zoom={12}
            options={mapOptions}
          >
            <Marker
              position={homeAddress}
              onClick={() => onSelect(homeAddress)}
            />

            {selected ? (
              <InfoWindow
                position={homeAddress}
                onCloseClick={() => setSelected(null)}
              >
                <div className={styles.infoWindow}>
                  <h3>My Home</h3>
                  <p>3-rumslägenhet med havsutsikt</p>
                </div>
              </InfoWindow>
            ) : null}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default GoogleMaps;
