/* eslint no-use-before-define: 0 */
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react";

export const WhatsAppExportGuide = () => {
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <Collapsible 
      open={isGuideOpen} 
      onOpenChange={setIsGuideOpen}
      className="bg-gray-50 rounded-lg text-left my-4"
    >
      <div className="p-4">
        <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium text-gray-600">
          <span>How to Export WhatsApp Chat</span>
          {isGuideOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </CollapsibleTrigger>
        
        <CollapsibleContent className="pt-4 space-y-4">
          <div className="flex items-start gap-3">
            <MessageSquare className="text-blue-600 mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="text-sm text-gray-700 mb-4">
                Follow these simple steps to export your WhatsApp chat:
              </p>
              
              <ol className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">1</span>
                  <span>Open WhatsApp on your phone</span>
                </li>
                
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">2</span>
                  <span>Go to the settings of WhatsApp (you can find it in the bottom menu)</span>
                </li>
                
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">3</span>
                  <span>Tap on "Chats"</span>
                </li>
                
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">4</span>
                  <span>Tap on "Chat history" then "Export chat"</span>
                </li>
                
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">5</span>
                  <span>Select the chat you want to export (the one with Spotify links)</span>
                </li>
                
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">6</span>
                  <span>Choose "Without Media" when asked (we only need the text)</span>
                </li>
                
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">7</span>
                  <span>Save the file to your device (select Files, Google Drive, or another option)</span>
                </li>
                
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">8</span>
                  <span>Find the saved ZIP file in your Files app (check Recent files section)</span>
                </li>
                
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">9</span>
                  <span>Tap on the ZIP file to extract it (unpack it)</span>
                </li>
                
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">10</span>
                  <span>You now have a .txt file that you can upload to our app!</span>
                </li>
              </ol>
              
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-md text-xs text-yellow-700">
                <p className="font-medium mb-1">Helpful Tip:</p>
                <p>If you have an iPhone, you might need to save the chat to Files. The steps are similar, but the menus might look slightly different.</p>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};