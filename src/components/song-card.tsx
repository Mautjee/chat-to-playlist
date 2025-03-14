import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { type FC } from "react"

interface SongCardProps {
  id: string
  coverArt?: string
  artist: string
  title: string
  onDelete: (id: string) => void
}

export const SongCard: FC<SongCardProps> = ({ id, coverArt, artist, title, onDelete }) => {
  return (
    <Card className="w-full mb-4 overflow-hidden">
      <div className="flex items-center p-4">
        <Image
          src={coverArt ?? "/placeholder.svg?height=80&width=80"}
          alt={`${title} cover`}
          width={80}
          height={80}
          className="rounded-md object-cover mr-4"
        />
        <CardContent className="flex-grow p-0">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-gray-500">{artist}</p>
        </CardContent>
        <CardFooter className="p-0">
          <Button variant="ghost" size="icon" onClick={() => onDelete(id)}>
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete song</span>
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}
