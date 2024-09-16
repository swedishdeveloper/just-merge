import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GitCommitIcon, MessageSquareIcon } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { PR } from "@/types/PR";

interface PRDetailsProps {
  pr: PR;
}

export function PRDetails({ pr }: PRDetailsProps) {
  return (
    <div className="bg-darkGreen border border-gray-700 rounded-lg p-4 flex min-h-0 flex-col">
      <div className="flex items-center gap-2 mb-2">
        <Avatar className="w-10 h-10">
          <AvatarImage src={pr.user.avatar} alt={pr.user.name} />
          <AvatarFallback>{pr.user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">{pr.user.name}</h2>
          <p className="text-sm text-gray-500">
            wants to merge {pr.commits} commit{pr.commits > 1 ? "s" : ""} into
            main
          </p>
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">{pr.title}</h3>
      <div className="mb-2">
        {pr.labels.map((label, index) => (
          <Badge key={index} variant="outline" className="mr-2">
            {label}
          </Badge>
        ))}
      </div>
      <p className="mb-4">{pr.description}</p>
      <div className="border border-gray-700 rounded-md flex-1 flex min-h-0 flex-col">
        <div className="flex items-center justify-between bg-darkMuted p-2 border-b border-gray-700">
          <span className="text-sm font-semibold">{pr.filename}</span>
          <span className="text-sm text-gray-600">
            +{pr.newCode.split("\n").length}
            {pr.oldCode && `-${pr.oldCode?.split("\n").length || 0}`}
          </span>
        </div>
        <div className="overflow-y-auto flex flex-1 flex-col min-h-0">
          {pr.oldCode && (
            <>
              <div className="flex bg-codeDeletion p-2 items-start text-left">
                <div className="text-red-600 select-none w-5">-</div>
                <SyntaxHighlighter
                  language="javascript"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    background: "transparent",
                    padding: 0,
                    width: "100%",
                    textAlign: "left",
                  }}
                  // Change line height to 1.5
                  showLineNumbers
                  startingLineNumber={pr.startingLineNumber}
                  lineProps={{
                    style: {
                      wordBreak: "break-all",
                      whiteSpace: "pre-wrap",
                    },
                  }}
                  wrapLines={true}
                >
                  {pr.oldCode}
                </SyntaxHighlighter>
              </div>
            </>
          )}
          <div className="flex bg-codeAddition p-2 items-start text-left">
            <div className="text-green-600 select-none w-5">+</div>
            <SyntaxHighlighter
              language="javascript"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                background: "transparent",
                padding: 0,
                wordBreak: "break-all",
                width: "100%",
                textAlign: "left",
              }}
              showLineNumbers
              startingLineNumber={pr.startingLineNumber}
              lineProps={{
                style: {
                  wordBreak: "break-all",
                  whiteSpace: "pre-wrap",
                },
              }}
              wrapLines={true}
            >
              {pr.newCode}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
      <div className="flex items-center text-sm text-gray-500 mt-2">
        <span className="flex items-center mr-4">
          <GitCommitIcon className="mr-1 h-4 w-4" /> {pr.commits} commit
          {pr.commits > 1 ? "s" : ""}
        </span>
        <span className="flex items-center">
          <MessageSquareIcon className="mr-1 h-4 w-4" /> {pr.comments} comment
          {pr.comments > 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
