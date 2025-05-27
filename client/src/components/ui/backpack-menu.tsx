import { useRef, useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { Book, BookmarkIcon, Settings } from 'lucide-react';

interface BackpackMenuProps {
  className?: string;
}

export function BackpackMenu({ className = '' }: BackpackMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [, setLocation] = useLocation();
  const { backpack } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        buttonRef.current && 
        !menuRef.current.contains(event.target as Node) && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text: string, maxLength = 60) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className={`relative ${className}`}>
      <button 
        ref={buttonRef}
        className="p-2 text-secondary hover:text-primary transition-colors relative"
        onClick={toggleMenu}
        aria-label="Open backpack menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        {backpack.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-darkBg text-xs w-4 h-4 flex items-center justify-center rounded-full">
            {backpack.length}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div 
          ref={menuRef}
          className="backpack-menu absolute right-0 mt-2 w-80 bg-darkBg border border-secondary/20 rounded-md shadow-lg z-50 overflow-hidden"
        >
          <div className="p-3 border-b border-secondary/10 bg-darkBg/80 flex items-center justify-between">
            <h3 className="font-montserrat font-semibold text-secondary">Your Backpack</h3>
            <button 
              onClick={() => {
                setIsOpen(false);
                setLocation('/profile');
              }}
              className="text-xs text-primary hover:text-primary/80 transition-colors"
            >
              View All
            </button>
          </div>

          {backpack.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground text-sm">
              <BookmarkIcon className="w-6 h-6 mx-auto mb-2 text-secondary/30" />
              <p>Your backpack is empty. Highlight important content during missions to save it here.</p>
            </div>
          ) : (
            <ul className="max-h-[60vh] overflow-auto">
              {backpack.slice(0, 5).map((item) => (
                <li key={item.id} className="border-b border-secondary/5 last:border-0 hover:bg-secondary/5">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setLocation(`/realm/${item.realmId}/mission/${item.missionId}`);
                    }}
                    className="w-full text-left px-4 py-3 text-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-8 h-8 mt-0.5 flex-shrink-0 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${item.color}40` || 'rgba(255, 204, 0, 0.2)' }}
                      >
                        <Book className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-lightText">
                          <span className="font-medium">Realm {item.realmId}</span> • Mission {item.missionId}
                        </p>
                        <p className="mt-1 text-lightText/90 font-mono text-xs py-1 px-2 bg-darkBg/50 rounded-sm">
                          {truncateText(item.text)}
                        </p>
                        <p className="text-xs text-lightText/60 mt-1 flex justify-between">
                          <span>{formatDate(item.timestamp)}</span>
                          {item.notes && <span className="italic">Has notes</span>}
                        </p>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
              {backpack.length > 5 && (
                <li className="border-t border-secondary/10 bg-muted/10">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setLocation('/profile');
                    }}
                    className="w-full py-2 text-sm text-secondary hover:text-primary"
                  >
                    View all {backpack.length} items
                  </button>
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}