
import React from 'react';
import { Repository } from '../types';

interface RepoCardProps {
  repo: Repository;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  return (
    <a 
      href={repo.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="glass p-6 rounded-2xl block group transition-all duration-300 hover:border-neutral-600 hover:bg-white/[0.05]"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors">
          {repo.name}
        </h3>
        <div className="flex items-center gap-1.5 text-neutral-400 text-sm">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
          </svg>
          <span>{repo.stars}</span>
        </div>
      </div>
      <p className="text-neutral-400 text-sm leading-relaxed mb-6">
        {repo.description}
      </p>
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.color }}></span>
        <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">{repo.language}</span>
      </div>
    </a>
  );
};

export default RepoCard;
