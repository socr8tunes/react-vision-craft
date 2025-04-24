
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Lock, Bell, Shield, Globe, UserPlus, Trash, LogOut, Key, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const saveSettings = () => {
    toast({
      title: "Settings updated",
      description: "Your settings have been saved successfully."
    });
  };
  
  const requestDelete = () => {
    setShowDeleteConfirm(true);
  };
  
  const confirmDelete = () => {
    toast({
      title: "Account deletion requested",
      description: "We've sent an email with instructions to confirm account deletion.",
      variant: "destructive"
    });
    setShowDeleteConfirm(false);
  };
  
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background to-background/95">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-8">Account Settings</h1>
          
          <Tabs defaultValue="account" className="mb-8">
            <TabsList className="bg-secondary/50 border border-white/10 p-1">
              <TabsTrigger 
                value="account" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Account
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger 
                value="privacy" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Privacy
              </TabsTrigger>
              <TabsTrigger 
                value="connected" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Connected Accounts
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="account" className="mt-6 space-y-6">
              <div className="bg-secondary/50 border border-white/10 rounded-xl p-6">
                <h3 className="font-medium text-lg mb-6">Account Information</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground block mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value="alex.johnson@example.com"
                        disabled
                        className="w-full px-4 py-2 rounded-lg bg-secondary/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm text-muted-foreground block mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        value="alexjohnson"
                        className="w-full px-4 py-2 rounded-lg bg-secondary/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">
                      Time Zone
                    </label>
                    <select className="w-full px-4 py-2 rounded-lg bg-secondary/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="pst">Pacific Standard Time (UTC-08:00)</option>
                      <option value="est">Eastern Standard Time (UTC-05:00)</option>
                      <option value="gmt">Greenwich Mean Time (UTC+00:00)</option>
                      <option value="ist">India Standard Time (UTC+05:30)</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                      onClick={saveSettings}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-secondary/50 border border-white/10 rounded-xl p-6">
                <h3 className="font-medium text-lg mb-6">Password & Security</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground block mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2 rounded-lg bg-secondary/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground block mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2 rounded-lg bg-secondary/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm text-muted-foreground block mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2 rounded-lg bg-secondary/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-center">
                      <Key size={20} className="mr-3" />
                      <div>
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                    </div>
                    <button className="text-sm px-3 py-1.5 bg-primary/20 text-primary-foreground rounded-lg hover:bg-primary/30">
                      Enable
                    </button>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                      onClick={saveSettings}
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-secondary/50 border border-white/10 rounded-xl p-6">
                <h3 className="font-medium text-lg mb-4 text-red-500">Danger Zone</h3>
                
                <div className="border border-red-500/30 rounded-lg p-4 bg-red-500/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Delete Account</h4>
                      <p className="text-sm text-muted-foreground">
                        Once deleted, your account cannot be recovered
                      </p>
                    </div>
                    
                    {!showDeleteConfirm ? (
                      <button 
                        className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
                        onClick={requestDelete}
                      >
                        Delete Account
                      </button>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <button 
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                          onClick={confirmDelete}
                        >
                          Confirm
                        </button>
                        <button 
                          className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80"
                          onClick={cancelDelete}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-6">
              <div className="bg-secondary/50 border border-white/10 rounded-xl p-6">
                <h3 className="font-medium text-lg mb-6">Notification Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-4">Push Notifications</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                        <label>Course updates and announcements</label>
                        <Switch checked={true} />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                        <label>New messages</label>
                        <Switch checked={true} />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                        <label>Assignment deadlines</label>
                        <Switch checked={true} />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                        <label>Quiz reminders</label>
                        <Switch checked={false} />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-4">Email Notifications</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                        <label>Weekly digest</label>
                        <Switch checked={true} />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                        <label>Course completion certificates</label>
                        <Switch checked={true} />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                        <label>New course recommendations</label>
                        <Switch checked={false} />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                        <label>Marketing and promotions</label>
                        <Switch checked={false} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                      onClick={saveSettings}
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="privacy" className="mt-6">
              <div className="bg-secondary/50 border border-white/10 rounded-xl p-6">
                <h3 className="font-medium text-lg mb-6">Privacy Settings</h3>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Profile Visibility</h4>
                    
                    <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                      <div>
                        <label className="font-medium">Public Profile</label>
                        <p className="text-sm text-muted-foreground">Allow others to view your profile</p>
                      </div>
                      <Switch checked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                      <div>
                        <label className="font-medium">Show Learning Progress</label>
                        <p className="text-sm text-muted-foreground">Display your course progress to others</p>
                      </div>
                      <Switch checked={false} />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                      <div>
                        <label className="font-medium">Show Certificates</label>
                        <p className="text-sm text-muted-foreground">Make your certificates visible to others</p>
                      </div>
                      <Switch checked={true} />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Data & Privacy</h4>
                    
                    <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                      <div>
                        <label className="font-medium">Personalized Recommendations</label>
                        <p className="text-sm text-muted-foreground">Allow us to use your learning data for recommendations</p>
                      </div>
                      <Switch checked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                      <div>
                        <label className="font-medium">Analytics Cookies</label>
                        <p className="text-sm text-muted-foreground">Allow tracking cookies to improve platform usage</p>
                      </div>
                      <Switch checked={true} />
                    </div>
                    
                    <div className="p-3 bg-secondary/30 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <label className="font-medium">Download Your Data</label>
                          <p className="text-sm text-muted-foreground">Get a copy of your personal data</p>
                        </div>
                        <button className="px-3 py-1.5 bg-primary/20 text-primary-foreground rounded-lg hover:bg-primary/30 text-sm">
                          Request Data
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                      onClick={saveSettings}
                    >
                      Save Privacy Settings
                    </button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="connected" className="mt-6">
              <div className="bg-secondary/50 border border-white/10 rounded-xl p-6">
                <h3 className="font-medium text-lg mb-6">Connected Accounts</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#4267B2] flex items-center justify-center mr-4">
                        <span className="text-white font-bold">f</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Facebook</h4>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-primary/20 text-primary-foreground rounded-lg hover:bg-primary/30 text-sm">
                      Connect
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#1DA1F2] flex items-center justify-center mr-4">
                        <span className="text-white font-bold">t</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Twitter</h4>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-primary/20 text-primary-foreground rounded-lg hover:bg-primary/30 text-sm">
                      Connect
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center mr-4">
                        <span className="text-white font-bold">G</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Google</h4>
                        <p className="text-sm text-green-500">Connected as alex.johnson@gmail.com</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 text-sm">
                      Disconnect
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#0A66C2] flex items-center justify-center mr-4">
                        <span className="text-white font-bold">in</span>
                      </div>
                      <div>
                        <h4 className="font-medium">LinkedIn</h4>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-primary/20 text-primary-foreground rounded-lg hover:bg-primary/30 text-sm">
                      Connect
                    </button>
                  </div>
                  
                  <div className="border-t border-white/10 pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">API Access</h4>
                        <p className="text-sm text-muted-foreground">Manage API keys and access tokens</p>
                      </div>
                      <button className="px-3 py-1.5 bg-secondary text-white rounded-lg hover:bg-secondary/80 text-sm flex items-center">
                        <ExternalLink size={14} className="mr-2" />
                        Manage Keys
                      </button>
                    </div>
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
