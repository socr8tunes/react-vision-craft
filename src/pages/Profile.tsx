
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { User, Mail, MapPin, Award, Clock, Calendar, Edit2, Moon, Sun, Bell, Pencil, Check, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    location: "San Francisco, CA",
    bio: "Computer Science student passionate about web development and machine learning.",
    joinDate: "January 2025",
    interests: ["Programming", "Physics", "Mathematics", "Design"],
    language: "English"
  });
  
  const [formData, setFormData] = useState({ ...profile });
  
  const certificates = [
    { 
      id: 1, 
      course: "Economics", 
      date: "Apr 15, 2025", 
      instructor: "Dr. Emily Chang"
    }
  ];
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const saveProfile = () => {
    setProfile({ ...formData });
    setEditMode(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved."
    });
  };
  
  const cancelEdit = () => {
    setFormData({ ...profile });
    setEditMode(false);
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast({
      title: `${darkMode ? "Light" : "Dark"} mode enabled`,
      description: `Application theme has been updated to ${darkMode ? "light" : "dark"} mode.`
    });
  };
  
  const toggleNotifications = () => {
    setNotifications(!notifications);
    toast({
      title: `Notifications ${notifications ? "disabled" : "enabled"}`,
      description: `You will ${notifications ? "no longer" : "now"} receive notifications.`
    });
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background to-background/95">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-8">Your Profile</h1>
          
          <Tabs defaultValue="profile" className="mb-8">
            <TabsList className="bg-secondary/50 border border-white/10 p-1">
              <TabsTrigger 
                value="profile" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger 
                value="certificates" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Certificates
              </TabsTrigger>
              <TabsTrigger 
                value="preferences" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Preferences
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-6">
              <div className="bg-secondary/50 border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-medium text-lg">Personal Information</h3>
                  {!editMode ? (
                    <button 
                      className="flex items-center text-sm px-4 py-1.5 bg-secondary text-white rounded-lg hover:bg-secondary/80"
                      onClick={() => setEditMode(true)}
                    >
                      <Edit2 size={16} className="mr-2" />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button 
                        className="flex items-center text-sm px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        onClick={saveProfile}
                      >
                        <Check size={16} className="mr-2" />
                        Save
                      </button>
                      <button 
                        className="flex items-center text-sm px-4 py-1.5 bg-secondary text-white rounded-lg hover:bg-secondary/80"
                        onClick={cancelEdit}
                      >
                        <X size={16} className="mr-2" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3 flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full bg-secondary/80 overflow-hidden mb-4">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=faces"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {editMode && (
                      <button className="flex items-center text-sm mt-2 px-3 py-1.5 bg-secondary/80 text-white rounded-lg hover:bg-secondary/60">
                        <Pencil size={14} className="mr-2" />
                        Change Photo
                      </button>
                    )}
                    
                    <div className="text-center mt-4">
                      <div className="flex items-center justify-center text-sm mt-2 text-muted-foreground">
                        <Calendar size={14} className="mr-2" />
                        Joined {profile.joinDate}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    {!editMode ? (
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center mb-1">
                            <User size={16} className="mr-2 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Name</span>
                          </div>
                          <p className="text-lg">{profile.name}</p>
                        </div>
                        
                        <div>
                          <div className="flex items-center mb-1">
                            <Mail size={16} className="mr-2 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Email</span>
                          </div>
                          <p className="text-lg">{profile.email}</p>
                        </div>
                        
                        <div>
                          <div className="flex items-center mb-1">
                            <MapPin size={16} className="mr-2 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Location</span>
                          </div>
                          <p className="text-lg">{profile.location}</p>
                        </div>
                        
                        <div>
                          <div className="flex items-center mb-1">
                            <User size={16} className="mr-2 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Bio</span>
                          </div>
                          <p className="text-lg">{profile.bio}</p>
                        </div>
                        
                        <div>
                          <div className="flex items-center mb-2">
                            <Award size={16} className="mr-2 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Interests</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {profile.interests.map((interest, index) => (
                              <span 
                                key={index}
                                className="px-3 py-1 bg-primary/20 text-primary-foreground rounded-full text-sm"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <form className="space-y-4">
                        <div>
                          <label className="flex items-center mb-1">
                            <User size={16} className="mr-2 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Name</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 rounded-lg bg-secondary/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        
                        <div>
                          <label className="flex items-center mb-1">
                            <Mail size={16} className="mr-2 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Email</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 rounded-lg bg-secondary/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        
                        <div>
                          <label className="flex items-center mb-1">
                            <MapPin size={16} className="mr-2 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Location</span>
                          </label>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleFormChange}
                            className="w-full px-4 py-2 rounded-lg bg-secondary/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        
                        <div>
                          <label className="flex items-center mb-1">
                            <User size={16} className="mr-2 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Bio</span>
                          </label>
                          <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleFormChange}
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg bg-secondary/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        
                        <div>
                          <label className="flex items-center mb-1">
                            <Award size={16} className="mr-2 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Language</span>
                          </label>
                          <select 
                            name="language"
                            value={formData.language}
                            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg bg-secondary/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            <option value="German">German</option>
                          </select>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="certificates" className="mt-6">
              <div className="bg-secondary/50 border border-white/10 rounded-xl p-6">
                <h3 className="font-medium text-lg mb-6">Your Certificates</h3>
                
                {certificates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {certificates.map((cert) => (
                      <div key={cert.id} className="border border-white/10 rounded-lg overflow-hidden">
                        <div className="h-40 bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-6 flex flex-col justify-end">
                          <Award size={36} className="text-primary mb-3" />
                          <h4 className="text-xl font-semibold">{cert.course}</h4>
                          <p className="text-sm text-muted-foreground">Certificate of Completion</p>
                        </div>
                        <div className="p-4 bg-secondary/30">
                          <div className="flex justify-between">
                            <p className="text-sm text-muted-foreground">Issued on</p>
                            <p className="text-sm">{cert.date}</p>
                          </div>
                          <div className="flex justify-between mt-1">
                            <p className="text-sm text-muted-foreground">Instructor</p>
                            <p className="text-sm">{cert.instructor}</p>
                          </div>
                          <div className="flex space-x-2 mt-4">
                            <button className="flex-1 p-2 bg-primary/20 text-primary-foreground rounded-lg hover:bg-primary/30 transition-colors text-sm">
                              View
                            </button>
                            <button className="flex-1 p-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors text-sm">
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-secondary/30 rounded-lg">
                    <Award size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <h4 className="text-xl font-medium mb-2">No certificates yet</h4>
                    <p className="text-muted-foreground mb-6">Complete a course to earn your first certificate</p>
                    <button className="px-6 py-2 bg-primary/20 text-primary-foreground rounded-lg hover:bg-primary/30 transition-colors">
                      Browse Courses
                    </button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="preferences" className="mt-6">
              <div className="bg-secondary/50 border border-white/10 rounded-xl p-6">
                <h3 className="font-medium text-lg mb-6">Appearance & Preferences</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-center">
                      {darkMode ? <Moon size={20} className="mr-3" /> : <Sun size={20} className="mr-3" />}
                      <div>
                        <h4 className="font-medium">Dark Mode</h4>
                        <p className="text-sm text-muted-foreground">Toggle between light and dark themes</p>
                      </div>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-center">
                      <Bell size={20} className="mr-3" />
                      <div>
                        <h4 className="font-medium">Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive notifications about your courses</p>
                      </div>
                    </div>
                    <Switch checked={notifications} onCheckedChange={toggleNotifications} />
                  </div>
                  
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <h4 className="font-medium mb-3">Email Preferences</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Course updates</label>
                        <Switch checked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">New course announcements</label>
                        <Switch checked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Weekly digest</label>
                        <Switch checked={false} />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Promotional emails</label>
                        <Switch checked={false} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <h4 className="font-medium mb-3">Content Language</h4>
                    <select className="w-full px-4 py-2 rounded-lg bg-secondary/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
