import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  User, Settings, Book, Bookmark, Clock, Edit, Save, Trash2, 
  ArrowLeft, LogOut, ChevronRight, X
} from 'lucide-react';
import { getRealmTheme } from '@/lib/realm-themes';
import { useToast } from '@/hooks/use-toast';

const ProfilePage = () => {
  const { user, userProfile, updateProfile, backpack, removeFromBackpack, updateBackpackItem, currentRealm, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(userProfile?.bio || '');
  const [editedColor, setEditedColor] = useState(userProfile?.avatarColor || '#ffcc00');
  
  // Editing backpack items state
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editedNotes, setEditedNotes] = useState('');

  // Update local state when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setEditedBio(userProfile.bio || '');
      setEditedColor(userProfile.avatarColor || '#ffcc00');
    }
  }, [userProfile]);
  
  // Get current realm theme for styling
  const realmTheme = getRealmTheme(currentRealm);
  
  if (!user || !userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Not Logged In</CardTitle>
            <CardDescription>Please log in to view your profile</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => setLocation('/auth')}>Log In</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  const handleSaveProfile = () => {
    updateProfile({
      bio: editedBio,
      avatarColor: editedColor
    });
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  };
  
  const handleEditBackpackItem = (id: string) => {
    const item = backpack.find(item => item.id === id);
    if (item) {
      setEditingItemId(id);
      setEditedNotes(item.notes || '');
    }
  };
  
  const handleSaveBackpackItem = (id: string) => {
    updateBackpackItem(id, { notes: editedNotes });
    setEditingItemId(null);
    toast({
      title: "Note Saved",
      description: "Your notes have been updated.",
    });
  };
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const userInitial = userProfile.username.charAt(0).toUpperCase();
  
  return (
    <div className="min-h-screen bg-background pt-16 pb-24">
      <div className="container px-4 mx-auto max-w-4xl">
        {/* Back button */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4" 
          onClick={() => setLocation(`/realm/${currentRealm}`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Realm
        </Button>
        
        {/* Profile header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mr-4" 
                  style={{ backgroundColor: userProfile.avatarColor || '#ffcc00' }}
                >
                  {userInitial}
                </div>
                <div>
                  <CardTitle className="text-2xl">{userProfile.username}</CardTitle>
                  <CardDescription>
                    Joined {formatDate(userProfile.joinDate)}
                  </CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <Button onClick={handleSaveProfile} size="sm">
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                ) : (
                  <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                )}
                <Button variant="destructive" size="sm" onClick={() => {
                  logout();
                  setLocation('/auth');
                }}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Avatar Color</label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="color" 
                      value={editedColor} 
                      onChange={(e) => setEditedColor(e.target.value)} 
                      className="w-12 h-8 p-1"
                    />
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: editedColor }}
                    >
                      {userInitial}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <Textarea 
                    value={editedBio} 
                    onChange={(e) => setEditedBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    className="w-full"
                    rows={4}
                  />
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium mb-2">About</h3>
                <p className="text-muted-foreground mb-4">
                  {userProfile.bio || "No bio provided. Click 'Edit' to add one."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Backpack / Highlights */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Bookmark className="h-6 w-6 mr-2" style={{ color: realmTheme.colors.primary }} />
            <h2 className="text-xl font-bold">Your Backpack</h2>
          </div>
          
          {backpack.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <p className="text-center text-muted-foreground">
                  Your backpack is empty. Highlight important content during missions to save it here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {backpack.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div 
                    className="h-2" 
                    style={{ backgroundColor: item.color || '#ffcc00' }}
                  />
                  <CardHeader className="py-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <Book className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          Realm {item.realmId} • Mission {item.missionId}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {formatDate(item.timestamp)}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="py-2 px-3 rounded-md bg-muted/50 font-mono text-sm">
                      {item.text}
                    </div>
                    
                    {editingItemId === item.id ? (
                      <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">Your Notes</label>
                        <Textarea 
                          value={editedNotes} 
                          onChange={(e) => setEditedNotes(e.target.value)}
                          placeholder="Add your notes about this highlight..."
                          className="w-full"
                          rows={3}
                        />
                        <div className="flex justify-end mt-2 gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => setEditingItemId(null)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleSaveBackpackItem(item.id)}
                          >
                            <Save className="h-4 w-4 mr-1" />
                            Save Notes
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {item.notes && (
                          <div className="mt-3 p-3 border-l-2 border-primary/30 text-sm">
                            <p className="text-muted-foreground italic">{item.notes}</p>
                          </div>
                        )}
                      </>
                    )}
                  </CardContent>
                  <CardFooter className="py-2 px-6 bg-muted/20 flex justify-between">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setLocation(`/realm/${item.realmId}/mission/${item.missionId}`)}
                    >
                      Go to Source
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                    <div className="flex gap-2">
                      {editingItemId !== item.id && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditBackpackItem(item.id)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Add Note
                        </Button>
                      )}
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => removeFromBackpack(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;