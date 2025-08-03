// import { AttendanceModel, Attendance, AgeDistributionModel, AgeDistribution, MembershipModel, Membership, MemberModel, Member, EventModel, Event, RecentActivityModel, RecentActivity } from './models';

// export const initializeData = async () => {
//   try {
//     // Clear collections for fresh seeding
//     await AttendanceModel.deleteMany({});
//     await AgeDistributionModel.deleteMany({});
//     await MembershipModel.deleteMany({});
//     await MemberModel.deleteMany({});
//     await EventModel.deleteMany({});
//     await RecentActivityModel.deleteMany({});

//     // Seed attendance data
//     const attendanceData: Attendance[] = [
//       { month: 'Jan', attendance: 65 },
//       { month: 'Feb', attendance: 72 },
//       { month: 'Mar', attendance: 78 },
//       { month: 'Apr', attendance: 85 },
//       { month: 'May', attendance: 92 },
//       { month: 'Jun', attendance: 88 },
//     ];
//     await AttendanceModel.insertMany(attendanceData);
//     console.log('Attendance data seeded');

//     // Seed age distribution data
//     const ageData: AgeDistribution[] = [
//       { name: 'Children (0-12)', value: 25, color: '#007bff' },
//       { name: 'Youth (13-25)', value: 30, color: '#28a745' },
//       { name: 'Adults (26-50)', value: 35, color: '#dc3545' },
//       { name: 'Seniors (50+)', value: 10, color: '#6c757d' },
//     ];
//     await AgeDistributionModel.insertMany(ageData);
//     console.log('Age distribution data seeded');

//     // Seed membership data
//     const membershipData: Membership[] = [
//       { month: 'Jan', members: 320 },
//       { month: 'Feb', members: 335 },
//       { month: 'Mar', members: 342 },
//       { month: 'Apr', members: 350 },
//       { month: 'May', members: 365 },
//       { month: 'Jun', members: 372 },
//     ];
//     await MembershipModel.insertMany(membershipData);
//     console.log('Membership data seeded');

//     // Seed member data
//     const memberData: Member[] = [
//       {
//         name: 'Sarah Wilson',
//         email: 'sarah.wilson@example.com',
//         phone: '+1234567890',
//         age: 28,
//         gender: 'Female',
//         status: 'Pending',
//         joinDate: new Date('2025-07-30T10:00:00Z'),
//         department: 'Youth',
//       },
//       {
//         name: 'John Doe',
//         email: 'john.doe@example.com',
//         phone: '+1234567891',
//         age: 35,
//         gender: 'Male',
//         status: 'Pending',
//         joinDate: new Date('2025-07-29T15:00:00Z'),
//         department: 'Outreach',
//       },
//       {
//         name: 'Jane Smith',
//         email: 'jane.smith@example.com',
//         phone: '+1234567892',
//         age: 42,
//         gender: 'Female',
//         status: 'Pending',
//         joinDate: new Date('2025-07-29T12:00:00Z'),
//         department: 'Music',
//       },
//       {
//         name: 'Michael Brown',
//         email: 'michael.brown@example.com',
//         phone: '+1234567893',
//         age: 31,
//         gender: 'Male',
//         status: 'Pending',
//         joinDate: new Date('2025-07-28T09:00:00Z'),
//         department: 'Education',
//       },
//       {
//         name: 'Emily Davis',
//         email: 'emily.davis@example.com',
//         phone: '+1234567894',
//         age: 29,
//         gender: 'Female',
//         status: 'Pending',
//         joinDate: new Date('2025-07-28T08:00:00Z'),
//         department: 'Youth',
//       },
//       {
//         name: 'David Johnson',
//         email: 'david.johnson@example.com',
//         phone: '+1234567895',
//         age: 45,
//         gender: 'Male',
//         status: 'Active',
//         joinDate: new Date('2025-06-01T00:00:00Z'),
//         department: 'Music',
//       },
//     ];
//     await MemberModel.insertMany(memberData);
//     console.log('Member data seeded');

//     // Seed event data
//     const eventData: Event[] = [
//       {
//         title: 'Sabbath School',
//         description: 'Weekly Bible study for all age groups',
//         date: '2025-07-27',
//         time: '09:30 AM',
//         location: 'Main Sanctuary',
//         attendees: 150,
//         type: 'Regular',
//       },
//       {
//         title: 'Divine Worship Service',
//         description: 'Main Sabbath worship service',
//         date: '2025-07-27',
//         time: '11:00 AM',
//         location: 'Main Sanctuary',
//         attendees: 200,
//         type: 'Worship',
//       },
//       {
//         title: 'Youth Bible Study',
//         description: 'Bible study for young adults aged 18-35',
//         date: '2025-07-30',
//         time: '07:00 PM',
//         location: 'Youth Hall',
//         attendees: 45,
//         type: 'Study',
//       },
//       {
//         title: 'Prayer Meeting',
//         description: 'Midweek prayer and testimony service',
//         date: '2025-07-31',
//         time: '07:00 PM',
//         location: 'Fellowship Hall',
//         attendees: 80,
//         type: 'Prayer',
//       },
//     ];
//     await EventModel.insertMany(eventData);
//     console.log('Event data seeded');

//     // Seed recent activity data
//     const recentActivityData: RecentActivity[] = [
//       {
//         type: 'member',
//         description: 'Sarah Wilson joined 2 hours ago',
//         timestamp: new Date('2025-07-30T15:00:00Z'),
//       },
//       {
//         type: 'event',
//         description: 'Youth Bible Study scheduled',
//         timestamp: new Date('2025-07-30T12:00:00Z'),
//       },
//       {
//         type: 'attendance',
//         description: 'Sabbath service: 95 attendees',
//         timestamp: new Date('2025-07-29T10:00:00Z'),
//       },
//     ];
//     await RecentActivityModel.insertMany(recentActivityData);
//     console.log('Recent activity data seeded');
//   } catch (error) {
//     console.error('Seeding error:', error);
//   }
// };