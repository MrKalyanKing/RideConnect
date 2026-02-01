import CaptainRegModel from "./models/CaptainModel/CaptainRegister.js";
import CaptainVehicleModel from "./models/CaptainModel/CaptainVehicleReg.js";
import { Server } from "socket.io";
import mongoose from "mongoose";
let io;


const InitializeSocket = (server) => {
    io = new Server(server);

    io.on('connection', (socket) => {
        console.log(`Socket is connected ${socket.id}`);

        socket.join((data) => {
            console.log(`Data is received ${data}`)
        })


        // admin approve the vehicle manually using sockets communication

        socket.on("admin_approve_vehicle", async (data) => {
            try {

                console.log("RAW DATA:", data);

                // Handle case where data is accidentally a string
                let vehicleId;

                if (typeof data === "string") {
                    const parsed = JSON.parse(data);
                    vehicleId = parsed.vehicleId;
                } else {
                    vehicleId = data.vehicleId;
                }
                // let vehicleId = data.vehicleId;

                if (!vehicleId) {
                    socket.emit("error_message", { message: "vehicleId missing" });
                    return;
                }

                const newVehicle = await CaptainVehicleModel.findByIdAndUpdate(
                    vehicleId,
                    { status: "approved" },
                    { new: true }
                );

                if (!newVehicle) {
                    socket.emit("error_message", { message: "Vehicle does not exist" });
                    return;
                }

                socket.emit("approve_success", {
                    message: "Vehicle approved successfully",
                    newVehicle
                });

            } catch (err) {
                console.log(err);
                socket.emit("error_message", {
                    message: "Vehicle status is not updated",
                    error: err.message
                });
            }
        });


        // if vehicle details were not matched admin can reject using socket api




    })
}

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
}

export { InitializeSocket, getIO }