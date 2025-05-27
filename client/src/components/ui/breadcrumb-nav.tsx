import React from 'react';
import { useLocation } from 'wouter';
import { ChevronRight } from 'lucide-react';
import { RealmData } from '@/lib/realm-data';
import { getRealmName } from '@/lib/realm-utils';

interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

interface BreadcrumbNavProps {
  items?: BreadcrumbItem[];
  realmId?: number;
  missionId?: number;
  missionTitle?: string;
  className?: string;
  textColor?: string;
  separatorColor?: string;
}

export function BreadcrumbNav({
  items,
  realmId,
  missionId,
  missionTitle,
  className = '',
  textColor = 'text-amber-200',
  separatorColor = 'text-amber-400/50'
}: BreadcrumbNavProps) {
  const [, setLocation] = useLocation();
  
  // If items are provided directly, use those
  // Otherwise, build breadcrumbs from realm and mission
  const breadcrumbs: BreadcrumbItem[] = items || [];
  
  if (!items && realmId) {
    // Get the realm info
    const realmInfo = RealmData.find(r => r.id === realmId);
    
    // Start with Home
    breadcrumbs.push({
      label: 'Home',
      path: '/home'
    });
    
    // Add Map
    breadcrumbs.push({
      label: 'Journey Map',
      path: '/map'
    });
    
    // Add realm
    breadcrumbs.push({
      label: realmInfo?.name || getRealmName(realmId),
      path: `/realm/${realmId}`
    });
    
    // Add mission if applicable
    if (missionId) {
      breadcrumbs.push({
        label: missionTitle || `Mission ${missionId}`,
        path: `/realm/${realmId}/mission/${missionId}`,
        isActive: true
      });
    } else {
      // Make realm the active item if no mission
      breadcrumbs[breadcrumbs.length - 1].isActive = true;
    }
  }
  
  const handleClick = (path: string, isActive?: boolean) => {
    if (!isActive) {
      setLocation(path);
    }
  };
  
  return (
    <nav aria-label="Breadcrumb" className={`${className}`}>
      <ol className="flex flex-wrap items-center space-x-1">
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={`${item.path}-${index}`}>
            <li>
              <button
                onClick={() => handleClick(item.path, item.isActive)}
                className={`
                  text-sm font-medium hover:underline 
                  ${item.isActive ? `${textColor} cursor-default` : `${textColor}/80 hover:${textColor}`}
                  transition-colors
                `}
                aria-current={item.isActive ? 'page' : undefined}
              >
                {item.label}
              </button>
            </li>
            
            {/* Add separator except after last item */}
            {index < breadcrumbs.length - 1 && (
              <li className={separatorColor}>
                <ChevronRight className="h-4 w-4" />
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}