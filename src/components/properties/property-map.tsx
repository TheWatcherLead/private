interface PropertyMapProps {
  location: string
  title: string
}

export function PropertyMap({ location, title }: PropertyMapProps) {
  const query = encodeURIComponent(`${title}, ${location}, Bangalore, India`)

  return (
    <div>
      <h2 className="font-serif text-2xl text-[#F5F0E8] mb-4">Location</h2>
      <div className="rounded-xl overflow-hidden border border-[#2E3447] aspect-video">
        <iframe
          title={`Map showing location of ${title}`}
          src={`https://maps.google.com/maps?q=${query}&output=embed&z=15`}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          aria-label={`Map showing ${location}`}
        />
      </div>
    </div>
  )
}
