import CaptainVehicleModel from "./models/CaptainModel/CaptainVehicleReg.js";
import { Server } from "socket.io";
let io;


const InitializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })
    io.on('connection', (socket) => {
        console.log(`Client connected ${socket.id}`)

        socket.on('join', (data) => {
            console.log("data recived from client ", data)
        })

        socket.on('disconnect', () => {
            console.log("Client disconnected", socket.id);
        });

        socket.on('admin_approve_vehicle', async (data) => {
            try {
                const { vehicleId } = data;

                const vehicle = await CaptainVehicleModel.findOneAndUpdate(
                    vehicleId,
                    { status: "approved" },
                    { new: true }
                );

                if (!vehicle) {
                    console.log("Vehicle not found in CaptainVehicleModel");
                    return;
                }

                io.emit('vehicle_status_updated', vehicle);
                console.log("vehicle approved")

            } catch (err) {
                console.error("Approve error:", err);
            }
        });


        socket.on('admin_reject_vehicle', async (data) => {
            const { vehicleId } = data
            if (!vehicleId) return;

            const vehicle = await CaptainVehicleModel.findByIdAndUpdate(vehicleId, {
                status: "rejected"
            }, { new: true });

            io.emit('vehicle_status_updated', vehicle);
        });
    });
}

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
}

export { InitializeSocket, getIO }