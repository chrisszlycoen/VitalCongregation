import { createContext, useState, useEffect, ReactNode } from "react";
import { toast } from "react-toastify";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  status: "Active" | "Pending" | "Inactive";
  joinDate: string;
  department?: string;
}

interface MemberContextType {
  members: Member[];
  loading: boolean;
  addMember: (member: Omit<Member, "id">) => Promise<void>;
  approveMember: (memberId: string) => Promise<void>;
  rejectMember: (memberId: string) => Promise<void>;
}

export const MemberContext = createContext<MemberContextType | undefined>(undefined);

export const MemberProvider = ({ children }: { children: ReactNode }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "http://localhost:3000";

  // Fetch members from backend
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/members`);
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}: ${await response.text()}`);
        }
        const data = await response.json();
        console.log('Fetched members:', data);
        if (!Array.isArray(data)) {
          throw new Error('Expected array of members, got: ' + JSON.stringify(data));
        }
        setMembers(data.map((m: any) => ({
          id: m._id,
          name: m.name,
          email: m.email,
          phone: m.phone,
          age: m.age,
          gender: m.gender,
          status: m.status,
          joinDate: new Date(m.joinDate).toISOString().split('T')[0],
          department: m.department,
        })));
      } catch (err) {
        console.error('Fetch members error:', err);
        toast.error('Failed to load members. Please check if the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const addMember = async (member: Omit<Member, "id">) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...member,
          age: parseInt(member.age as any),
          joinDate: new Date(member.joinDate),
        }),
      });
      if (!response.ok) {
        throw new Error(`Add member failed: ${await response.text()}`);
      }
      const addedMember = await response.json();
      setMembers([...members, {
        id: addedMember._id,
        name: addedMember.name,
        email: addedMember.email,
        phone: addedMember.phone,
        age: addedMember.age,
        gender: addedMember.gender,
        status: addedMember.status,
        joinDate: new Date(addedMember.joinDate).toISOString().split('T')[0],
        department: addedMember.department,
      }]);
      toast.success('Member added successfully!');
    } catch (err) {
      console.error('Add member error:', err);
      toast.error('Failed to add member.');
    }
  };

  const approveMember = async (memberId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/members/${memberId}/approve`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        throw new Error(`Approve failed: ${await response.text()}`);
      }
      setMembers(members.map(m => m.id === memberId ? { ...m, status: "Active" } : m));
    } catch (err) {
      console.error('Approve member error:', err);
      toast.error('Failed to approve member.');
    }
  };

  const rejectMember = async (memberId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/members/${memberId}/reject`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        throw new Error(`Reject failed: ${await response.text()}`);
      }
      setMembers(members.map(m => m.id === memberId ? { ...m, status: "Inactive" } : m));
    } catch (err) {
      console.error('Reject member error:', err);
      toast.error('Failed to reject member.');
    }
  };

  return (
    <MemberContext.Provider value={{ members, loading, addMember, approveMember, rejectMember }}>
      {children}
    </MemberContext.Provider>
  );
};