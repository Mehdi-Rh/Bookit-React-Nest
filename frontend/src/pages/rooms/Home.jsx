import RoomCard from '../../components/RoomCard';
import Heading from '../../components/Heading';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/data/api';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllRooms = async () => {
      setLoading(true);
      try {
        const { json } = await apiFetch(`/rooms/`);
        setRooms(json.rooms);
      } finally {
        setLoading(false);
      }
    };

    getAllRooms();
  }, []);

  return (
    <>
      <Heading title="Available Rooms" />

      {loading ? (
        <div className="flex items-center justify-center mt-32">
          <span className="text-lg font-semibold">Loading...</span>
        </div>
      ) : rooms.length > 0 ? (
        rooms.map((room) => <RoomCard room={room} key={room._id} />)
      ) : (
        <p>No rooms available at the moment</p>
      )}
    </>
  );
};

export default Home;
