import { DriverLocation } from "types";
import { DriverModel } from "../models";
import { EventStack } from "../websocket";

const stack = new EventStack();

stack.push("ping", (socket, data) => {
  socket.emit("pong", data);
});

stack.push<DriverLocation>("save:driver:location", async (_, data, io) => {
  if (!data) return;
  try {
    const driver = await DriverModel.findById(data.id);
    if (!driver) return;
    driver.lat = data.lat;
    driver.lng = data.lng;
    await driver.save();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    io!.emit("update:driver", {
      id: driver._id,
      lat: driver.lat,
      lng: driver.lng,
    });
  } catch {
    return;
  }
});

export default stack;
