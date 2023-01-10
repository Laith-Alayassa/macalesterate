import Header from "./Header";
import Likes from "./Likes";

export default function RoomsCards(params) {
  const rooms = params.rooms;
  return (
    <>
      {rooms.map((room, i) => {
        return (
          <div style={{ marginLeft: 16, marginRight: 16 }}>
            <hr style={{ opacity: "30%", padding: 0, marginBottom: 16 }} />

            <Header room={room} />

            <img
              src={room.url}
              style={{
                marginTop: 16,
                maxWidth: "100%",
                borderRadius: 8,
                boxShadow: "0 3px 10px 0 rgba(0,10,0,0.3)",
              }}
            />
            <Likes room={room} index={i} />
            <p>
              <b>{room.name}</b> {room.caption}
            </p>

            {/* caption */}
          </div>
        );
      })}
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 8,
  },
  likeButton: {
    backgroundColor: "rgba(217, 217, 217, 0.47)",
    borderWidth: 0,
    borderRadius: 48,
    fontSize: 20,
    height: 40,
    width: "30%",
  },
};
