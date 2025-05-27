import { Link, useLocation } from 'wouter';
import { BackpackMenu } from './backpack-menu';
import { DEFAULT_AVATAR } from '@/lib/constants';
import { OutlineButton } from './theme';
import { useAuth } from '@/context/AuthContext';

interface NavBarProps {
  className?: string;
}

export function NavBar({ className = '' }: NavBarProps) {
  const [location, setLocation] = useLocation();
  const { user, userProfile, logout } = useAuth();
  
  const username = user?.username || "Guest";
  const userId = user?.userId || "";
  const userInitial = username.charAt(0).toUpperCase();
  
  const handleLogout = () => {
    logout();
    setLocation('/auth');
  };
  
  return (
    <header className={`bg-darkBg/90 backdrop-blur-sm border-b border-secondary/10 sticky top-0 z-50 ${className}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/">
          <div className="flex items-center gap-3">
            <img 
              src="/asha-icon.svg" 
              alt="Asha's Journey Logo" 
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-xl font-cinzel font-bold text-secondary hidden sm:block">Asha's Journey</h1>
          </div>
        </Link>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 mr-4">
            <Link to="/">
              <span className={`text-sm font-medium ${location === '/' ? 'text-primary' : 'text-secondary hover:text-primary'} transition-colors`}>
                Home
              </span>
            </Link>
            <Link to="/map">
              <span className={`text-sm font-medium ${location === '/map' ? 'text-primary' : 'text-secondary hover:text-primary'} transition-colors`}>
                Map
              </span>
            </Link>
            <Link to="/profile">
              <span className={`text-sm font-medium ${location === '/profile' ? 'text-primary' : 'text-secondary hover:text-primary'} transition-colors`}>
                Profile
              </span>
            </Link>
          </nav>
          
          <BackpackMenu />
          
          <div className="flex items-center gap-3">
            <Link to="/profile">
              <div 
                className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-secondary font-medium cursor-pointer hover:bg-primary/30 transition-colors"
                title={username}
                style={{
                  backgroundColor: userProfile?.avatarColor ? `${userProfile.avatarColor}40` : 'rgba(255, 204, 0, 0.2)'
                }}
              >
                {userInitial}
              </div>
            </Link>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm text-secondary">{username}</span>
              {userId && <span className="text-xs text-lightText/50">ID: {userId}</span>}
            </div>
            <button 
              onClick={handleLogout}
              className="ml-2 text-xs text-secondary/50 hover:text-secondary"
              title="Logout"
            >
              <span className="sr-only">Logout</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}