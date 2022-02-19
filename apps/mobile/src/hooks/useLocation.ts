// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VIForegroundService from "@voximplant/react-native-foreground-service";
import Geolocation from "react-native-geolocation-service";
import { useCallback, useState } from "react";
import { setWatch } from "../redux/watch";
import { store } from "../redux";
import {
  Alert,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from "react-native";

const getLocationOptions: Geolocation.GeoOptions = {
  accuracy: {
    android: "high",
  },
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 10000,
  distanceFilter: 0,
  forceRequestLocation: true,
  forceLocationManager: true,
  showLocationDialog: true,
};

const hasLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === "android" && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show("Location permission denied by user.", ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      "Location permission revoked by user.",
      ToastAndroid.LONG,
    );
  }

  return false;
};

export const useLocation = (
  updateHandler: (...arg: any) => void,
  updateRate = 5000,
) => {
  const [location, setLocation] = useState<Geolocation.GeoPosition>();

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
      },
      (error) => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation(undefined);
      },
      getLocationOptions,
    );
  };

  const getLocationUpdates = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    await startForegroundService();

    const watchId = Geolocation.watchPosition(
      (position) => {
        setLocation(position);
        updateHandler({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          speed: position.coords.speed,
          tmp: position.timestamp,
        });
      },
      (error) => {
        setLocation(undefined);
        Alert.alert(`Code ${error.code}`, error.message);
      },
      {
        ...getLocationOptions,
        interval: updateRate,
        fastestInterval: Math.floor(updateRate) - Math.floor(updateRate * 0.4),
      },
    );
    store.dispatch(setWatch({ watchId }));
  };

  const stopForegroundService = useCallback(() => {
    VIForegroundService.stopService().catch((err: any) => err);
  }, []);

  const removeLocationUpdates = useCallback(() => {
    const { watchId } = store.getState().watchReducer.data;

    if (watchId !== null) {
      stopForegroundService();
      Geolocation.clearWatch(watchId);
      store.dispatch(setWatch({ watchId: null }));
    }
  }, [stopForegroundService]);

  const startForegroundService = async () => {
    if (Platform.Version >= 26) {
      await VIForegroundService.createNotificationChannel({
        id: "locationChannel",
        name: "Location Tracking Channel",
        description: "Tracks location of user",
        enableVibration: false,
      });
    }

    return VIForegroundService.startService({
      channelId: "locationChannel",
      id: 420,
      title: "app",
      text: "Tracking location updates",
      icon: "ic_launcher",
    });
  };

  return {
    getLocation,
    getLocationUpdates,
    removeLocationUpdates,
    states: {
      location,
    },
  };
};
