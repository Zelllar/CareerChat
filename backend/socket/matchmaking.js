const waitingUsers = [];

function handleSocket(io, socket) {

    socket.on("join_queue", (data) => {

        const user = {
            socket,
            socketId: socket.id,
            profession: data.profession,
            level: data.level,
            wantedProfession: data.wantedProfession,
            wantedLevel: data.wantedLevel
        };

        const partner = waitingUsers.shift();

        if (partner) {

            const roomId = "room_" + Date.now();

            socket.join(roomId);
            partner.socket.join(roomId);

            socket.emit("match_found", {
                roomId,
                partner: {
                    profession: partner.profession,
                    level: partner.level
                }
            });

            partner.socket.emit("match_found", {
                roomId,
                partner: {
                    profession: user.profession,
                    level: user.level
                }
            });

        } else {
            waitingUsers.push(user);
        }

    });

    socket.on("disconnecting", () => {

        const rooms = [...socket.rooms];
        const room = rooms.find(r => r !== socket.id);

        if (room) {
            socket.to(room).emit("partner_left");
        }

    });

    socket.on("disconnect", () => {

        const index = waitingUsers.findIndex(
            user => user.socketId === socket.id
        );

        if (index !== -1) {
            waitingUsers.splice(index, 1);
        }

    });

    socket.on("send_message", (data) => {

        const rooms = [...socket.rooms];
        const room = rooms.find(r => r !== socket.id);

        if (room) {
            socket.to(room).emit("receive_message", data.text);
        }

    });
    
    socket.on("leave_chat", () => {

        const rooms = [...socket.rooms];
        const room = rooms.find(r => r !== socket.id);

        if (room) {
            socket.to(room).emit("partner_left");
            socket.leave(room);
        }

    });

    socket.on("typing", () => {

        const rooms = [...socket.rooms];
        const room = rooms.find(r => r !== socket.id);

        if (room) {
            socket.to(room).emit("partner_typing");
        }

    });

    socket.on("stop_typing", () => {

        const rooms = [...socket.rooms];
        const room = rooms.find(r => r !== socket.id);

        if (room) {
            socket.to(room).emit("partner_stop_typing");
        }

    });

}

module.exports = handleSocket;