import { createContext, useState, useEffect, ReactNode } from "react";
import { toast } from "react-toastify";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  type: "Regular" | "Worship" | "Study" | "Prayer";
}

interface EventContextType {
  events: Event[];
  loading: boolean;
  addEvent: (event: Omit<Event, "id">) => Promise<void>;
}

export const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "http://localhost:3000";

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/events`);
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}: ${await response.text()}`);
        }
        const data = await response.json();
        console.log('Fetched events:', data);
        if (!Array.isArray(data)) {
          throw new Error('Expected array of events, got: ' + JSON.stringify(data));
        }
        setEvents(data.map((e: any) => ({
          id: e._id,
          title: e.title,
          description: e.description,
          date: new Date(e.date).toISOString().split('T')[0],
          time: e.time,
          location: e.location,
          attendees: e.attendees,
          type: e.type,
        })));
      } catch (err) {
        console.error('Fetch events error:', err);
        toast.error('Failed to load events. Please check if the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const addEvent = async (event: Omit<Event, "id">) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...event,
          date: new Date(event.date),
          attendees: parseInt(event.attendees as any),
        }),
      });
      if (!response.ok) {
        throw new Error(`Add event failed: ${await response.text()}`);
      }
      const addedEvent = await response.json();
      setEvents([...events, {
        id: addedEvent._id,
        title: addedEvent.title,
        description: addedEvent.description,
        date: new Date(addedEvent.date).toISOString().split('T')[0],
        time: addedEvent.time,
        location: addedEvent.location,
        attendees: addedEvent.attendees,
        type: addedEvent.type,
      }]);
      toast.success('Event added successfully!');
    } catch (err) {
      console.error('Add event error:', err);
      toast.error('Failed to add event.');
    }
  };

  return (
    <EventContext.Provider value={{ events, loading, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};