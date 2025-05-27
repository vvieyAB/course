import { Switch, Route, useLocation } from "wouter";
import { Suspense, lazy, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "@/context/AuthContext"; 

// Lazy load pages
const HomePage = lazy(() => import("@/pages/HomePage"));
const MapPage = lazy(() => import("@/pages/MapPage"));
const NotFound = lazy(() => import("@/pages/not-found"));
const StoryIntroPage = lazy(() => import("@/pages/StoryIntroPage"));
const HomeIntroPage = lazy(() => import("@/pages/home-intro"));
const RealmPage = lazy(() => import("@/pages/RealmPage"));
const AuthPage = lazy(() => import("@/pages/auth-page"));
const AfricaMapPage = lazy(() => import("@/pages/AfricaMapPage"));
const BadgesPage = lazy(() => import("@/pages/BadgesPage"));
const JourneyPage = lazy(() => import("@/pages/JourneyPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));

// Lazy load Mission wrapper component
const MissionWrapper = lazy(() => import("@/components/mission-wrapper"));

// Lazy load Realm components
const Realm1Story = lazy(() => import("@/pages/realm1/story-intro"));
const Realm1Home = lazy(() => import("@/pages/realm1/home"));
const Realm2Story = lazy(() => import("@/pages/realm2/story-intro"));
const Realm2Home = lazy(() => import("@/pages/realm2/home"));
const Realm3Home = lazy(() => import("@/pages/realm3/home"));
const Realm4Home = lazy(() => import("@/pages/realm4/home"));
const Realm5Home = lazy(() => import("@/pages/realm5/home"));
const Realm6Home = lazy(() => import("@/pages/realm6/home"));
const Realm7Home = lazy(() => import("@/pages/realm7/home"));

// Router wrapper to handle navigation
function RouterListener() {
  const [location] = useLocation();
  useEffect(() => {
    console.log("Current location:", location);
  }, [location]);
  return null;
}

// Root route redirect component  
function RedirectToHome() {
  const [location, setLocation] = useLocation();
  
  useEffect(() => {
    // Add additional console logs to debug
    console.log('Current location:', location);
    console.log('RedirectToHome component mounted');
    
    // Redirect everyone to the home intro page first
    console.log('Redirecting to home intro page at:', '/home-intro');
    setLocation('/home-intro');
  }, [location, setLocation]);
  
  return <LoadingSpinner />;
}

// Loading spinner component for Suspense fallback
const LoadingSpinner = () => (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
    <p className="text-lg text-muted-foreground">Loading content...</p>
  </div>
);

function App() {
  return (
    <AuthProvider> {/* Wrap everything inside AuthProvider */}
      <RouterListener />
      <Suspense fallback={<LoadingSpinner />}>
        <Switch>
          {/* Root route is story intro first */}
          <Route path="/" component={StoryIntroPage} />
          
          {/* Alternative path for home-intro */}
          <Route path="/home-intro" component={HomeIntroPage} />
          
          {/* Auth page comes next */}
          <Route path="/auth" component={AuthPage} />
          
          {/* Story intro for users post-authentication */}
          <Route path="/intro" component={StoryIntroPage} />
          
          {/* Main navigation routes */}
          <Route path="/home" component={HomePage} />
          <Route path="/map" component={MapPage} />
          <Route path="/map/africa" component={AfricaMapPage} />
          <Route path="/badges" component={BadgesPage} />
          <Route path="/journey" component={JourneyPage} />
          <Route path="/profile" component={ProfilePage} />
          
          {/* Realm routes - Story first, then home */}
          <Route path="/realm/1/home" component={Realm1Home} />
          <Route path="/realm/1" component={Realm1Story} />
          <Route path="/realm1" component={Realm1Story} />
          
          <Route path="/realm/2/home" component={Realm2Home} />
          <Route path="/realm/2" component={Realm2Story} />
          <Route path="/realm2" component={Realm2Story} />
          
          <Route path="/realm/3/home" component={Realm3Home} />
          <Route path="/realm/3" component={() => import("@/pages/realm3/story-intro").then(m => m.default)} />
          <Route path="/realm3" component={() => import("@/pages/realm3/story-intro").then(m => m.default)} />
          
          <Route path="/realm/4/home" component={Realm4Home} />
          <Route path="/realm/4" component={() => import("@/pages/realm4/story-intro").then(m => m.default)} />
          <Route path="/realm4" component={() => import("@/pages/realm4/story-intro").then(m => m.default)} />
          
          <Route path="/realm/5/home" component={Realm5Home} />
          <Route path="/realm/5" component={() => import("@/pages/realm5/story-intro").then(m => m.default)} />
          <Route path="/realm5" component={() => import("@/pages/realm5/story-intro").then(m => m.default)} />
          
          <Route path="/realm/6/home" component={Realm6Home} />
          <Route path="/realm/6" component={() => import("@/pages/realm6/story-intro").then(m => m.default)} />
          <Route path="/realm6" component={() => import("@/pages/realm6/story-intro").then(m => m.default)} />
          
          <Route path="/realm/7/home" component={Realm7Home} />
          <Route path="/realm/7" component={() => import("@/pages/realm7/story-intro").then(m => m.default)} />
          <Route path="/realm7" component={() => import("@/pages/realm7/story-intro").then(m => m.default)} />
          
          {/* Universal realm routes */}
          <Route path="/realm/:id" component={RealmPage} />
          
          {/* Universal mission routes - these will use our dynamic mission wrapper */}
          <Route path="/realm/:realmId/mission/:missionId" component={MissionWrapper} />
          <Route path="/realm/:realmId/missions/:missionId" component={MissionWrapper} />
          
          {/* Special case for Realm 3 with numbered format */}
          <Route path="/realm/3/mission/:missionId" component={lazy(() => import("@/pages/realm3/mission-wrapper"))} />
          
          {/* Special case for Realm 7 with numbered format */}
          <Route path="/realm/7/mission/:missionId" component={lazy(() => import("@/pages/realm7/mission-wrapper"))} />
          
          {/* Alternative mission route patterns for backwards compatibility */}
          <Route path="/realm1/mission/:missionId" component={MissionWrapper} />
          <Route path="/realm2/mission/:missionId" component={MissionWrapper} />
          {/* Use custom wrapper for Realm 3 to fix loading issues */}
          <Route path="/realm3/mission/:missionId" component={lazy(() => import("@/pages/realm3/mission-wrapper"))} />
          {/* Use custom wrapper for Realm 4 because it has conflicting mission file structure */}
          <Route path="/realm4/mission/:missionId" component={lazy(() => import("@/pages/realm4/mission-wrapper"))} />
          <Route path="/realm5/mission/:missionId" component={MissionWrapper} />
          <Route path="/realm6/mission/:missionId" component={MissionWrapper} />
          {/* Use custom wrapper for Realm 7 because it has similar conflicting file structure */}
          <Route path="/realm7/mission/:missionId" component={lazy(() => import("@/pages/realm7/mission-wrapper"))} />
          
          {/* Missions index pages */}
          <Route path="/realm1/missions" component={lazy(() => import("@/pages/realm1/missions"))} />
          <Route path="/realm2/missions" component={lazy(() => import("@/pages/realm2/missions"))} />
          <Route path="/realm3/missions" component={lazy(() => import("@/pages/realm3/missions"))} />
          <Route path="/realm4/missions" component={lazy(() => import("@/pages/realm4/missions"))} />
          <Route path="/realm5/missions" component={lazy(() => import("@/pages/realm5/missions"))} />
          <Route path="/realm6/missions" component={lazy(() => import("@/pages/realm6/missions"))} />
          <Route path="/realm7/missions" component={lazy(() => import("@/pages/realm7/missions"))} />
          
          {/* Fall back to NotFound for any other route */}
          <Route component={NotFound} />
        </Switch>
      </Suspense>
      <Toaster />
    </AuthProvider>
  );
}


export default App;
