import { useState, useContext } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, MoreHorizontal, UserPlus, Check, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { MemberContext } from "@/context/MemberContext";

interface NewMember {
  name: string;
  email: string;
  phone: string;
  age: string;
  gender: "Male" | "Female" | "Other";
  status: "Active" | "Pending" | "Inactive";
  joinDate: string;
  department: string;
}

export function MembersTable() {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error("MembersTable must be used within a MemberProvider");
  }
  const { members, loading, addMember, approveMember, rejectMember } = context;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [isAdding, setIsAdding] = useState(false);
  const [newMember, setNewMember] = useState<NewMember>({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "Male",
    status: "Pending",
    joinDate: new Date().toISOString().split('T')[0],
    department: "",
  });

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === "all" ||
                       (selectedTab === "active" && member.status === "Active") ||
                       (selectedTab === "pending" && member.status === "Pending") ||
                       (selectedTab === "inactive" && member.status === "Inactive");
    return matchesSearch && matchesTab;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "Pending":
        return "secondary";
      case "Inactive":
        return "outline";
      default:
        return "outline";
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addMember({
        name: newMember.name,
        email: newMember.email,
        phone: newMember.phone,
        age: parseInt(newMember.age),
        gender: newMember.gender,
        status: newMember.status,
        joinDate: newMember.joinDate,
        department: newMember.department,
      });
      setIsAdding(false);
      setNewMember({
        name: "",
        email: "",
        phone: "",
        age: "",
        gender: "Male",
        status: "Pending",
        joinDate: new Date().toISOString().split('T')[0],
        department: "",
      });
    } catch (err) {
      // Error handled in MemberContext via toast
    }
  };

  return (
    <Card>
      <CardHeader>
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Members Management</CardTitle>
              <CardDescription>
                Manage church members and track their information
              </CardDescription>
            </div>
            <Dialog open={isAdding} onOpenChange={setIsAdding}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Member</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddMember} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Name"
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    />
                    <Input
                      placeholder="Email"
                      type="email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    />
                    <Input
                      placeholder="Phone"
                      value={newMember.phone}
                      onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                    />
                    <Input
                      placeholder="Age"
                      type="number"
                      value={newMember.age}
                      onChange={(e) => setNewMember({ ...newMember, age: e.target.value })}
                    />
                    <select
                      value={newMember.gender}
                      onChange={(e) => setNewMember({ ...newMember, gender: e.target.value as "Male" | "Female" | "Other" })}
                      className="border rounded p-2"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <Input
                      placeholder="Department"
                      value={newMember.department}
                      onChange={(e) => setNewMember({ ...newMember, department: e.target.value })}
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAdding(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Save Member</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </>
      </CardHeader>

      <CardContent>
        {loading && <p>Loading members...</p>}
        {!loading && !filteredMembers.length && <p>No members available.</p>}
        {!loading && filteredMembers.length > 0 && (
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({members.length})</TabsTrigger>
              <TabsTrigger value="active">
                Active ({members.filter(m => m.status === "Active").length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({members.filter(m => m.status === "Pending").length})
              </TabsTrigger>
              <TabsTrigger value="inactive">
                Inactive ({members.filter(m => m.status === "Inactive").length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="mt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{member.email}</div>
                            <div className="text-muted-foreground">{member.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{member.age}</TableCell>
                        <TableCell>{member.gender}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(member.status)}>
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{member.department || "-"}</TableCell>
                        <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          {member.status === "Pending" ? (
                            <div className="flex gap-2 justify-end">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => approveMember(member.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => rejectMember(member.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Deactivate</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}