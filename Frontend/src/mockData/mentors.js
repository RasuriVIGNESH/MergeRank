export const mentors = [
    {
        id: 'm1',
        name: 'Alan Turing',
        email: 'alan.t@college.edu',
        department: 'Computer Science',
        designation: 'Associate Professor',
    },
    {
        id: 'm2',
        name: 'Grace Hopper',
        email: 'grace.h@college.edu',
        department: 'Computer Science',
        designation: 'Professor',
    },
];

export const batches = [
    {
        id: 'b1',
        name: '2025-CS-A',
        mentorId: 'm1',
        year: 2025,
        department: 'CSE',
        section: 'A',
        totalStudents: 4,
    },
    {
        id: 'b2',
        name: '2025-CS-B',
        mentorId: 'm1',
        year: 2025,
        department: 'CSE',
        section: 'B',
        totalStudents: 1,
    },
    {
        id: 'b3',
        name: '2025-CS-C',
        mentorId: 'm2',
        year: 2025,
        department: 'CSE',
        section: 'C',
        totalStudents: 0,
    },
];

export const mentorNotes = [
    {
        id: 'n1',
        mentorId: 'm1',
        studentId: 's4',
        note: 'Ananya needs extra guidance on data structures. Scheduled a 1:1 session for next week.',
        createdAt: '2025-01-10T09:00:00.000Z',
    },
    {
        id: 'n2',
        mentorId: 'm1',
        studentId: 's3',
        note: 'Rahul is improving steadily. Encouraged him to participate in the next Codeforces round.',
        createdAt: '2025-01-15T11:30:00.000Z',
    },
];
