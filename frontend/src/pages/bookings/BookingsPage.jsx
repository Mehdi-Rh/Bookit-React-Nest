// import getMyBookings from "../actions/getMyBookings";
// import Heading from "../../components/Heading";
import BookedRoomCard from './BookedRoomCard';
import Heading from '../../components/Heading';
import { useAuthContext } from '@/hooks/auth/useAuthContext';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/data/api';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();

  useEffect(() => {
    const getMyBookings = async () => {
      setLoading(true);
      try {
        const { json } = await apiFetch(`/bookings/my-bookings?userId=${user._id}`);
        setBookings(json.bookings);
      } finally {
        setLoading(false);
      }
    };

    getMyBookings();
  }, []);

  return (
    <>
      <Heading title="My Bookings" />
      {loading ? (
        <div className="flex items-center justify-center mt-32">
          <span className="text-lg font-semibold">Loading...</span>
        </div>
      ) : bookings.length === 0 ? (
        <p className="text-gray-600 mt-4">You have no bookings</p>
      ) : (
        bookings.map((booking) => <BookedRoomCard key={booking._id} booking={booking} />)
      )}
    </>
  );
};

export default BookingsPage;
