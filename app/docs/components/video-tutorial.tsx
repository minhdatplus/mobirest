export function VideoTutorial({ title, videoId }: { title: string, videoId: string }) {
  return (
    <div className="my-8">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="relative pb-[56.25%] h-0">
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          allowFullScreen
        />
      </div>
    </div>
  )
} 