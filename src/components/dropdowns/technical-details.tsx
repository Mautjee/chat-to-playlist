import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { ChevronDown, ChevronUp, Github } from "lucide-react";

export const TechnicalDetails = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  // The actual regex pattern used to extract Spotify track IDs
  const spotifyRegexPattern = "https:\\/\\/open\\.spotify\\.com\\/track\\/([a-zA-Z0-9]+)";
  return (
 <Collapsible 
                open={isDetailsOpen} 
                onOpenChange={setIsDetailsOpen}
                className="bg-gray-50 rounded-lg text-left"
              >
                <div className="p-4">
                  <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium text-gray-600">
                    <span>Technical Details</span>
                    {isDetailsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="pt-4 space-y-3">
                    <div>
                      <h5 className="text-xs font-medium text-gray-500 mb-1">REGEX PATTERN USED</h5>
                      <code className="block p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                        {spotifyRegexPattern}
                      </code>
                      <p className="text-xs text-gray-500 mt-1">
                        This pattern extracts Spotify track IDs from links in your chat.
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <span className="text-xs text-gray-500">Open source project</span>
                      <a 
                        href="https://github.com/Mautjee/chat-to-playlist" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900"
                      >
                        <Github size={14} />
                        <span>View on GitHub</span>
                      </a>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
  );
};