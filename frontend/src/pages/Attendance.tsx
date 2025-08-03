import { useState, useEffect } from "react";
import { Calendar, Users, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

// Mock API data (replace with actual API calls in production)
const mockFetchAttendanceData = () =>
  Promise.resolve([
    { id: 1, memberName: "John Smith", event: "Sabbath Service", date: "2025-07-20", status: "Present", time: "09:00 AM" },
    { id: 2, memberName: "Mary Johnson", event: "Prayer Meeting", date: "2025-07-18", status: "Absent", time: "07:00 PM" },
    { id: 3, memberName: "David Brown", event: "Youth Meeting", date: "2025-07-17", status: "Present", time: "06:00 PM" },
    { id: 4, memberName: "Sarah Wilson", event: "Sabbath Service", date: "2025-07-20", status: "Present", time: "09:00 AM" },
  ]);

const mockFetchUpcomingEvents = () =>
  Promise.resolve([
    { id: 1, name: "Sabbath Service", date: "2025-08-03", time: "09:00 AM", expectedAttendees: 120 },
    { id: 2, name: "Prayer Meeting", date: "2025-08-01", time: "07:00 PM", expectedAttendees: 45 },
    { id: 3, name: "Youth Meeting", date: "2025-07-31", time: "06:00 PM", expectedAttendees: 30 },
  ]);

export default function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [searchMember, setSearchMember] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAttendance, setNewAttendance] = useState({
    memberName: "",
    event: "",
    date: "",
    status: "Present",
    time: "",
  });
  const { toast } = useToast();

  // Simulate API data fetching
  useEffect(() => {
    mockFetchAttendanceData()
      .then((data) => setAttendanceData(data))
      .catch(() => {
        toast({ variant: "destructive", title: "Error", description: "Failed to fetch attendance data." });
      });
    mockFetchUpcomingEvents()
      .then((data) => setUpcomingEvents(data))
      .catch(() => {
        toast({ variant: "destructive", title: "Error", description: "Failed to fetch upcoming events." });
      });
  }, [toast]);

  // Dynamic stats calculation
  const totalMembers = 120; // Replace with actual total from API
  const today = new Date().toISOString().split("T")[0];
  const presentToday = attendanceData.filter(
    (record) => record.date === today && record.status === "Present"
  ).length;
  const absentToday = totalMembers - presentToday;
  const attendanceRate = totalMembers > 0 ? ((presentToday / totalMembers) * 100).toFixed(0) + "%" : "0%";
  const regularAttendees = attendanceData.filter(
    (record) => record.status === "Present"
  ).length;

  // Filter attendance records
  const filteredAttendance = attendanceData.filter((record) => {
    return (
      (selectedEvent === "" || selectedEvent === "all" || record.event === selectedEvent) &&
      (!selectedDate || record.date === selectedDate) &&
      (!searchMember || record.memberName.toLowerCase().includes(searchMember.toLowerCase()))
    );
  });

  // Handle attendance submission
  const handleTakeAttendance = () => {
    if (!newAttendance.memberName || !newAttendance.event || !newAttendance.date || !newAttendance.time) {
      toast({ variant: "destructive", title: "Error", description: "Please fill in all required fields." });
      return;
    }
    const newRecord = {
      id: attendanceData.length + 1,
      ...newAttendance,
    };
    setAttendanceData([...attendanceData, newRecord]);
    setIsDialogOpen(false);
    setNewAttendance({ memberName: "", event: "", date: "", status: "Present", time: "" });
    toast({ title: "Success", description: "Attendance recorded successfully." });
    // Simulate API call
    console.log("New attendance recorded:", newRecord);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Attendance Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Take Attendance
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record Attendance</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Member Name"
                value={newAttendance.memberName}
                onChange={(e) => setNewAttendance({ ...newAttendance, memberName: e.target.value })}
              />
              <Select
                value={newAttendance.event}
                onValueChange={(value) => setNewAttendance({ ...newAttendance, event: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Event" />
                </SelectTrigger>
                <SelectContent>
                  {upcomingEvents.map((event) => (
                    <SelectItem key={event.id} value={event.name}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={newAttendance.date}
                onChange={(e) => setNewAttendance({ ...newAttendance, date: e.target.value })}
              />
              <Select
                value={newAttendance.status}
                onValueChange={(value) => setNewAttendance({ ...newAttendance, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Present">Present</SelectItem>
                  <SelectItem value="Absent">Absent</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="time"
                value={newAttendance.time}
                onChange={(e) => setNewAttendance({ ...newAttendance, time: e.target.value })}
              />
              <Button onClick={handleTakeAttendance}>Submit</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Average</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceRate}</div>
            <p className="text-xs text-muted-foreground">Based on today's events</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{presentToday}</div>
            <p className="text-xs text-muted-foreground">Out of {totalMembers} members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{absentToday}</div>
            <p className="text-xs text-muted-foreground">Follow-up needed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Regular Attendees</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{regularAttendees}</div>
            <p className="text-xs text-muted-foreground">Consistent attendees</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Records */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Attendance Records
              </CardTitle>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Input
                  placeholder="Search member..."
                  value={searchMember}
                  onChange={(e) => setSearchMember(e.target.value)}
                  className="max-w-sm"
                />
                <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Events" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    {[...new Set(attendanceData.map((record) => record.event))].map((event) => (
                      <SelectItem key={event} value={event}>
                        {event}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-48"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttendance.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No attendance records found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAttendance.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.memberName}</TableCell>
                        <TableCell>{record.event}</TableCell>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>{record.time}</TableCell>
                        <TableCell>
                          <Badge variant={record.status === "Present" ? "default" : "destructive"}>
                            {record.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-4 border rounded-lg">
                  <h3 className="font-medium">{event.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {event.date} at {event.time}
                  </p>
                  <p className="text-sm">Expected: {event.expectedAttendees} attendees</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="mt-2 w-full">
                        Take Attendance
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Record Attendance for {event.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          placeholder="Member Name"
                          value={newAttendance.memberName}
                          onChange={(e) =>
                            setNewAttendance({ ...newAttendance, memberName: e.target.value })
                          }
                        />
                        <Input
                          placeholder="Event Name"
                          value={event.name}
                          disabled
                        />
                        <Input
                          type="date"
                          value={event.date}
                          disabled
                        />
                        <Select
                          value={newAttendance.status}
                          onValueChange={(value) =>
                            setNewAttendance({ ...newAttendance, status: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Present">Present</SelectItem>
                            <SelectItem value="Absent">Absent</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          type="time"
                          value={event.time}
                          disabled
                        />
                        <Button onClick={handleTakeAttendance}>Submit</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}