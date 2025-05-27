import { Realm } from '@/lib/types';
import { Link } from 'wouter';

interface RealmCardProps {
  realm: Realm;
  className?: string;
}

export function RealmCard({ realm, className = '' }: RealmCardProps) {
  return (
    <div className={`realm-card bg-darkBg border border-secondary/20 rounded-lg overflow-hidden shadow-lg ${className}`}>
      <div className="relative h-48">
        <img 
          src={realm.imageUrl} 
          alt={realm.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-darkBg to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h3 className="text-xl font-cinzel font-bold text-secondary">{realm.name}</h3>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-lightText/80 text-sm mb-4">{realm.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Module {realm.moduleNumber}</span>
          
          {realm.isLocked ? (
            <button className="text-secondary/50 font-montserrat font-medium text-sm cursor-not-allowed">
              Locked <i className="fas fa-lock ml-1" />
            </button>
          ) : (
            <Link to={`/realm/${realm.id}`}>
              <button className="text-secondary hover:text-primary font-montserrat font-medium text-sm">
                Start <i className="fas fa-arrow-right ml-1" />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}