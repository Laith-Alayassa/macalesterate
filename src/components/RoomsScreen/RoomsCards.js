import Header from "./Header";
import Likes from "./Likes";

export default function RoomsCards(params) {
  const rooms = params.rooms;
  return (
    <>
      {rooms.map((room, i) => {
        return (
          <div style={{ marginLeft: 16, marginRight: 16 }}>
            <hr style={{ opacity: "30%" }} />

            <Header room={room} />

            <img
              src={room.url}
              style={{
                marginTop: 8,
                maxWidth: "100%",
                borderRadius: 8,
                boxShadow: "0 3px 10px 0 rgba(0,10,0,0.3)",
              }}
            />

            <Likes room={room} index={i} />

            {/* caption */}
            <p>
              <b>Shawerma</b> the room where I started my open source project
            </p>
          </div>
        );
      })}
    </>
  );
}
