import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { GitCommitIcon, MessageSquareIcon } from "lucide-react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { PR } from "@/types/PR"

interface PRDetailsProps {
  pr: PR;
}

export function PRDetails({ pr }: PRDetailsProps) {
  return (
    <div className="bg-white border rounded-lg mb-4 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="w-10 h-10">
            <AvatarImage src={pr.user.avatar} alt={pr.user.name} />
            <AvatarFallback>{pr.user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{pr.user.name}</h2>
            <p className="text-sm text-gray-500">
              wants to merge {pr.commits} commit{pr.commits > 1 ? 's' : ''} into main
            </p>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">{pr.title}</h3>
        <div className="mb-2">
          {pr.labels.map((label, index) => (
            <Badge key={index} variant="outline" className="mr-2">{label}</Badge>
          ))}
        </div>
        <p className="mb-4">{pr.description}</p>
        <div className="mb-4 max-h-60 overflow-y-auto">
          <SyntaxHighlighter
            language="javascript"
            style={vscDarkPlus}
            showLineNumbers
            wrapLines
            customStyle={{
              margin: 0,
              borderRadius: '0.375rem',
            }}
          >
            {pr.code}
          </SyntaxHighlighter>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span className="flex items-center mr-4">
            <GitCommitIcon className="mr-1 h-4 w-4" /> {pr.commits} commit{pr.commits > 1 ? 's' : ''}
          </span>
          <span className="flex items-center">
            <MessageSquareIcon className="mr-1 h-4 w-4" /> {pr.comments} comment{pr.comments > 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  )
}
